import { useState, useEffect } from 'react';
import api from '../api/axios';
import SEO from '../components/SEO';
import ProductCard from '../components/product/ProductCard';
import { Search, Loader2, X, ChevronDown, ChevronUp, SlidersHorizontal, Leaf } from 'lucide-react';
import bannerImg from '../assets/login background.png'; // Using this as it matches the reference banner

const SORT_OPTIONS = [
  { value: 'popular', label: 'Popularity' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [search, setSearch] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [sort, setSort] = useState('popular');
  const [priceRange, setPriceRange] = useState(500);
  
  // UI States
  const [filtersOpen, setFiltersOpen] = useState(false); // Mobile filter toggle
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  const [priceExpanded, setPriceExpanded] = useState(true);
  const [sortExpanded, setSortExpanded] = useState(true);

  useEffect(() => {
    api.get('/products/flavors/list').then(({ data }) => {
      if (data.success) setFlavors(data.flavors);
    });
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    // Include priceRange in API call if your backend supports it, otherwise filtering happens here
    api
      .get('/products', { params: { search, flavor: selectedFlavor, sort } })
      .then(({ data }) => {
        if (data.success) {
          // Client-side price filtering (assuming variants[0].price is the baseline)
          const filtered = data.products.filter(p => {
            const minPrice = p.variants?.length ? Math.min(...p.variants.map(v => v.price)) : 0;
            return minPrice <= priceRange;
          });
          setProducts(filtered);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 280);
    return () => clearTimeout(timer);
  }, [search, selectedFlavor, sort, priceRange]);

  const handleClearFilters = () => {
    setSearch('');
    setSelectedFlavor('');
    setSort('popular');
    setPriceRange(500);
  };

  const activeCategoryName = selectedFlavor === '' ? 'All Products' : selectedFlavor;

  return (
    <div className="w-full bg-[#fdfbf7] min-h-screen pb-16 font-inter">
      <SEO
        title="Shop Premium Banana Chips"
        description="Browse our collection of authentic Kerala banana chips — Classic Salted, Pepper, Masala, Chilli & more."
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-8">
        
        {/* HERO BANNER */}
        <div className="relative w-full h-[200px] md:h-[280px] rounded-3xl overflow-hidden mb-8 md:mb-12 shadow-sm border border-gray-100 flex items-center bg-white">
          <div className="absolute inset-0 z-0">
            <img 
              src={bannerImg} 
              alt="Our Delicious Collection" 
              className="w-full h-full object-cover object-[center_30%]"
            />
            {/* Gradient to make text readable on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fdfbf7] via-[#fdfbf7]/90 md:via-[#fdfbf7]/70 to-transparent w-[90%] md:w-2/3"></div>
          </div>
          
          <div className="relative z-10 px-6 md:px-12 max-w-lg lg:max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold text-chip-green font-poppins mb-3 tracking-tight">
              Our Delicious Collection
            </h1>
            <div className="flex items-center gap-2 mb-4 opacity-70">
              <div className="h-px w-8 bg-chip-gold"></div>
              <Leaf size={14} className="text-chip-gold" />
              <div className="h-px w-24 bg-chip-gold"></div>
            </div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
              Authentic Kerala banana chips made with real ingredients and a whole lot of love.
            </p>
          </div>
        </div>

        {/* MOBILE SEARCH (Visible only on small screens) */}
        <div className="md:hidden relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-10 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-chip-green focus:ring-1 focus:ring-chip-green transition shadow-sm"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <X size={16} />
            </button>
          )}
        </div>

        {/* MOBILE CONTROLS (Filter Toggle & Sort Dropdown) */}
        <div className="md:hidden flex items-center justify-between gap-3 mb-6">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex-1 h-11 bg-white border border-gray-200 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 shadow-sm"
          >
            <SlidersHorizontal size={16} /> Filter
          </button>
          
          <div className="relative flex-1">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full h-11 pl-4 pr-10 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 appearance-none shadow-sm focus:outline-none focus:border-chip-green"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* MAIN LAYOUT: SIDEBAR + GRID */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* LEFT SIDEBAR (Filters) */}
          <aside className={`w-full md:w-64 shrink-0 bg-[#fdfbf7] md:bg-transparent rounded-2xl md:rounded-none p-5 md:p-0 border border-gray-100 md:border-none shadow-sm md:shadow-none mb-6 md:mb-0 transition-all ${filtersOpen ? 'block' : 'hidden md:block'}`}>
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-chip-green font-poppins">Filter</h2>
              <button onClick={handleClearFilters} className="text-xs font-semibold text-gray-500 hover:text-chip-green">
                Clear
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6 border-b border-gray-200/60 pb-6">
              <button 
                onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                className="flex items-center justify-between w-full text-left mb-4 focus:outline-none"
              >
                <h3 className="font-semibold text-chip-green text-sm">Category</h3>
                {categoriesExpanded ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
              </button>
              
              {categoriesExpanded && (
                <div className="space-y-1">
                  <button 
                    onClick={() => setSelectedFlavor('')}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${selectedFlavor === '' ? 'bg-chip-green/5 text-chip-green font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    All Products
                  </button>
                  {flavors.map((flavor) => (
                    <button 
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors capitalize ${selectedFlavor === flavor ? 'bg-chip-green/5 text-chip-green font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price Filter */}
            <div className="mb-6 border-b border-gray-200/60 pb-6">
              <button 
                onClick={() => setPriceExpanded(!priceExpanded)}
                className="flex items-center justify-between w-full text-left mb-6 focus:outline-none"
              >
                <h3 className="font-semibold text-chip-green text-sm">Price</h3>
                {priceExpanded ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
              </button>
              
              {priceExpanded && (
                <div className="px-2">
                  <input 
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-chip-green"
                  />
                  <div className="flex items-center justify-between mt-4 text-xs font-semibold text-gray-600">
                    <span>₹0</span>
                    <span>₹{priceRange}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Sort Filter */}
            <div className="hidden md:block mb-8">
              <button 
                onClick={() => setSortExpanded(!sortExpanded)}
                className="flex items-center justify-between w-full text-left mb-4 focus:outline-none"
              >
                <h3 className="font-semibold text-chip-green text-sm">Sort By</h3>
                {sortExpanded ? <ChevronUp size={16} className="text-gray-400"/> : <ChevronDown size={16} className="text-gray-400"/>}
              </button>
              
              {sortExpanded && (
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 appearance-none focus:outline-none focus:border-chip-green cursor-pointer"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              )}
            </div>

            <button 
              onClick={fetchProducts}
              className="w-full bg-chip-green hover:bg-[#092a17] text-white font-bold text-sm py-3.5 rounded-xl transition-colors shadow-sm"
            >
              Apply Filters
            </button>
          </aside>

          {/* RIGHT MAIN CONTENT */}
          <div className="flex-1 min-w-0">
            
            {/* Desktop Top Bar */}
            <div className="hidden md:flex items-end justify-between mb-8 pb-4 border-b border-gray-200/60">
              <div>
                <p className="text-xs text-gray-500 mb-2">Home / Shop</p>
                <h2 className="text-3xl font-bold text-chip-green font-poppins capitalize mb-1">
                  {activeCategoryName}
                </h2>
                <p className="text-sm text-gray-500 font-medium">
                  {loading ? '...' : `${products.length} Products`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative w-64">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-11 pl-10 pr-10 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-chip-green focus:ring-1 focus:ring-chip-green transition shadow-sm"
                  />
                  {search && (
                    <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-chip-green">
                      <X size={14} />
                    </button>
                  )}
                </div>
                
                {/* Sort (Redundant visually, but requested in design to be at top right) */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 font-medium">Sort by:</span>
                  <div className="relative">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="h-11 pl-4 pr-10 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 appearance-none focus:outline-none focus:border-chip-green cursor-pointer shadow-sm min-w-[140px]"
                    >
                      {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Title (Since desktop title is hidden) */}
            <div className="md:hidden mb-6">
              <h2 className="text-2xl font-bold text-chip-green font-poppins capitalize mb-1">
                {activeCategoryName}
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                {loading ? 'Loading...' : `${products.length} Products`}
              </p>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 size={36} className="animate-spin text-chip-gold" />
                <p className="text-gray-500 text-sm font-medium">Finding the freshest chips...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center gap-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl border border-gray-100">
                  🍌
                </div>
                <div>
                  <h3 className="text-xl font-bold text-chip-green mb-1">No products found</h3>
                  <p className="text-gray-500 text-sm">Try adjusting your filters or search term.</p>
                </div>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 h-11 px-8 bg-chip-green text-white rounded-xl text-sm font-bold hover:bg-[#092a17] transition-all shadow-sm"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;