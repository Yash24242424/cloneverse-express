
import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products, Product } from '@/data/products';
import { categories } from '@/data/categories';
import { useToast } from '@/hooks/use-toast';

const Products = () => {
  const { toast } = useToast();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setAllProducts([...products]);
      setDisplayedProducts([...products]);
      setIsLoading(false);
    }, 800);
  }, []);
  
  useEffect(() => {
    let filtered = [...allProducts];
    
    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term)
      );
    }
    
    setDisplayedProducts(filtered);
  }, [searchTerm, selectedCategory, allProducts]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value === 'all' ? null : e.target.value);
  };
  
  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would call an API to delete the product
    const updatedProducts = allProducts.filter(p => p.id !== productId);
    setAllProducts(updatedProducts);
    
    toast({
      title: 'Product deleted',
      description: 'The product has been deleted successfully.',
    });
  };
  
  const handleAddProduct = () => {
    // In a real app, this would open a form to add a product
    toast({
      title: 'Add Product',
      description: 'Add product functionality would open a form here.',
    });
  };
  
  const handleEditProduct = (productId: string) => {
    // In a real app, this would open a form to edit the product
    toast({
      title: 'Edit Product',
      description: `Editing product ${productId}`,
    });
  };
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-5 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="w-full md:w-64">
            <div className="relative">
              <select
                className="w-full h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory || 'all'}
                onChange={handleCategoryChange}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        
        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedProducts.length > 0 ? (
                displayedProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.brand}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {categories.find(c => c.id === product.category)?.name || product.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.salePrice ? (
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            ${product.salePrice.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-900">
                          ${product.price.toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.isNew
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {product.isNew ? 'New' : 'Regular'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
