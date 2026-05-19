import { useState, useEffect } from 'react';
import api from '../api/axios';
import SEO from '../components/SEO';
import ProductCard from '../components/product/ProductCard';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [search, setSearch] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [sort, setSort] = useState('newest');

  // Fetch Flavors for Filter
  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        const { data } = await api.get('/products/flavors/list');
        if (data.success) setFlavors(data.flavors);
      } catch (err) {
        console.error("Failed to fetch flavors", err);
      }
    };
    fetchFlavors();
  }, []);

  // Fetch Products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/products', {
          params: { search, flavor: selectedFlavor, sort }
        });
        if (data.success) setProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search slightly
    const delay = setTimeout(() => fetchProducts(), 300);
    return () => clearTimeout(delay);
  }, [search, selectedFlavor, sort]);

  return (
    <div className="min-h-screen bg-cream py-8">
      <SEO 
        title="Shop Premium Banana Chips" 
        description="Browse our wide selection of freshly made Kerala banana chips. Available in classic salted, pepper, spicy masala, and more."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-matte-black mb-4">Our Collections</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover the crunch that everyone is talking about. Prepared with love, shipped with care.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <SlidersHorizontal size={20} className="text-warm-yellow-dark" />
                <h2 className="font-bold text-lg">Filters</h2>
              </div>

              {/* Search */}
              <div className="mb-6 relative">
                <input 
                  type="text" 
                  placeholder="Search chips..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-warm-yellow"
                />
                <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
              </div>

              {/* Flavors Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Flavors</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setSelectedFlavor('')}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${selectedFlavor === '' ? 'bg-matte-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    All Flavors
                  </button>
                  {flavors.map((flavor) => (
                    <button 
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${selectedFlavor === flavor ? 'bg-matte-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:w-3/4">
            {/* Top Bar (Sorting) */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 font-medium">{products.length} Products Found</p>
              <select 
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-matte-black text-sm rounded-lg focus:ring-warm-yellow focus:border-warm-yellow block p-2.5 outline-none"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-warm-yellow" size={40} />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <h3 className="text-xl font-bold text-matte-black mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;