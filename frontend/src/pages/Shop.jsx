import { useState, useEffect } from 'react';
import api from '../api/axios';
import SEO from '../components/SEO';
import ProductCard from '../components/product/ProductCard';
import { Search, SlidersHorizontal, Loader2, X, ChevronDown } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'popular', label: 'Most Popular' },
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [sort, setSort] = useState('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    api.get('/products/flavors/list').then(({ data }) => {
      if (data.success) setFlavors(data.flavors);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      api
        .get('/products', { params: { search, flavor: selectedFlavor, sort } })
        .then(({ data }) => {
          if (data.success) setProducts(data.products);
        })
        .finally(() => setLoading(false));
    }, 280);
    return () => clearTimeout(timer);
  }, [search, selectedFlavor, sort]);

  return (
    <div className="w-full">
      <SEO
        title="Shop Premium Banana Chips"
        description="Browse our collection of authentic Kerala banana chips — Classic Salted, Pepper, Masala, Chilli & more. Free delivery above ₹500."
        keywords="buy banana chips online, Kerala chips, premium snacks India"
      />

      {/* Hero Header */}
      <div className="bg-chip-green py-16 px-4 rounded-b-[2rem] shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-chip-gold text-xs font-bold tracking-[3px] uppercase mb-3">Our Collection</p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Every Chip, a Masterpiece
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Handcrafted in small batches. Sealed fresh within hours. Never compromised.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Controls bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-chip-green/40" />
            <input
              type="text"
              placeholder="Search flavours, names…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-10 bg-white border border-chip-black/10 rounded-xl text-sm text-chip-green placeholder:text-chip-green/40 focus:outline-none focus:border-chip-green/30 focus:ring-2 focus:ring-chip-green/10 transition"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-chip-green/40 hover:text-chip-green"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="sm:hidden h-11 px-4 bg-white border border-chip-black/10 rounded-xl text-sm font-semibold text-chip-green flex items-center justify-center gap-2"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>

          {/* Desktop Flavours */}
          <div className="hidden sm:flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedFlavor('')}
              className={`h-9 px-4 rounded-full text-xs font-bold transition-all ${
                selectedFlavor === ''
                  ? 'bg-chip-green text-white shadow-sm'
                  : 'bg-white border border-chip-black/10 text-chip-green/70 hover:border-chip-green/30'
              }`}
            >
              All
            </button>
            {flavors.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFlavor(selectedFlavor === f ? '' : f)}
                className={`h-9 px-4 rounded-full text-xs font-bold transition-all ${
                  selectedFlavor === f
                    ? 'bg-chip-green text-white shadow-sm'
                    : 'bg-white border border-chip-black/10 text-chip-green/70 hover:border-chip-green/30'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative ml-auto w-full sm:w-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full h-11 pl-4 pr-10 bg-white border border-chip-black/10 rounded-xl text-sm font-semibold text-chip-green focus:outline-none focus:border-chip-green/30 cursor-pointer appearance-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-chip-green/50 pointer-events-none" />
          </div>
        </div>

        {/* Mobile Filters Drawer */}
        {filtersOpen && (
          <div className="sm:hidden mb-6 p-4 bg-white rounded-2xl border border-chip-black/5 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedFlavor('')}
              className={`h-9 px-4 rounded-full text-xs font-bold transition-all ${
                selectedFlavor === '' ? 'bg-chip-green text-white' : 'bg-chip-cream text-chip-green/70'
              }`}
            >
              All
            </button>
            {flavors.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFlavor(selectedFlavor === f ? '' : f)}
                className={`h-9 px-4 rounded-full text-xs font-bold transition-all ${
                  selectedFlavor === f ? 'bg-chip-green text-white' : 'bg-chip-cream text-chip-green/70'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-chip-green/50 font-medium">
            {loading ? 'Loading…' : `${products.length} product${products.length !== 1 ? 's' : ''} found`}
          </p>
          {(search || selectedFlavor) && (
            <button
              onClick={() => { setSearch(''); setSelectedFlavor(''); }}
              className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 size={36} className="animate-spin text-chip-gold" />
            <p className="text-chip-green/50 text-sm font-medium">Finding the freshest chips…</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center gap-4">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-chip-black/5">
              🍌
            </div>
            <h3 className="text-xl font-black text-chip-green">No chips found</h3>
            <p className="text-chip-green/50 text-sm">Try a different search or clear your filters.</p>
            <button
              onClick={() => { setSearch(''); setSelectedFlavor(''); }}
              className="mt-2 h-10 px-6 bg-chip-green text-white rounded-xl text-sm font-bold hover:bg-chip-green-dark transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;