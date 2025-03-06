
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, LayoutGrid, ListFilter } from "lucide-react";
import { categories } from "@/data/categories";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Browse Products</h2>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            className="hidden md:flex items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ListFilter className="mr-2 h-4 w-4" /> 
            Filter
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex space-x-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectCategory(null)}
            className="rounded-full whitespace-nowrap"
          >
            All Products
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectCategory(category.id)}
              className="rounded-full whitespace-nowrap"
            >
              {category.name}
              <span className="ml-1 text-xs font-normal opacity-70">({category.count})</span>
            </Button>
          ))}
        </div>
      </div>
      
      {isOpen && (
        <div className="mt-4 p-4 border rounded-lg bg-white/50 backdrop-blur-sm animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input id="price-1" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <label htmlFor="price-1" className="ml-2 text-sm text-gray-600">Under $50</label>
                </div>
                <div className="flex items-center">
                  <input id="price-2" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <label htmlFor="price-2" className="ml-2 text-sm text-gray-600">$50 - $100</label>
                </div>
                <div className="flex items-center">
                  <input id="price-3" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <label htmlFor="price-3" className="ml-2 text-sm text-gray-600">$100 - $200</label>
                </div>
                <div className="flex items-center">
                  <input id="price-4" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <label htmlFor="price-4" className="ml-2 text-sm text-gray-600">$200+</label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Brand</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input id="brand-1" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <label htmlFor="brand-1" className="ml-2 text-sm text-gray-600">SoundWave</label>
                </div>
                <div className="flex items-center">
                  <input id="brand-2" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <label htmlFor="brand-2" className="ml-2 text-sm text-gray-600">TechNova</label>
                </div>
                <div className="flex items-center">
                  <input id="brand-3" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <label htmlFor="brand-3" className="ml-2 text-sm text-gray-600">SecurityPlus</label>
                </div>
                <div className="flex items-center">
                  <input id="brand-4" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <label htmlFor="brand-4" className="ml-2 text-sm text-gray-600">GreenLife</label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Rating</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input id="rating-1" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <label htmlFor="rating-1" className="ml-2 text-sm text-gray-600">4★ & above</label>
                </div>
                <div className="flex items-center">
                  <input id="rating-2" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <label htmlFor="rating-2" className="ml-2 text-sm text-gray-600">3★ & above</label>
                </div>
                <div className="flex items-center">
                  <input id="rating-3" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <label htmlFor="rating-3" className="ml-2 text-sm text-gray-600">2★ & above</label>
                </div>
                <div className="flex items-center">
                  <input id="rating-4" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                  <label htmlFor="rating-4" className="ml-2 text-sm text-gray-600">1★ & above</label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" size="sm">Reset</Button>
            <Button size="sm">Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
