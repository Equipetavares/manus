import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, SortAsc, SortDesc } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useApp } from '../context/AppContext';
import { getProductsByCategory, FILTER_OPTIONS } from '../data/shirts';
import ProductCard from './ProductCard';
import CustomPagination from './CustomPagination';

const ProductSection = ({ 
  title, 
  category, 
  icon: Icon,
  description 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [localFilter, setLocalFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const { searchTerm } = useApp();
  const itemsPerPage = 12;

  // Get products for this category
  const categoryProducts = getProductsByCategory(category);
  const filterOptions = FILTER_OPTIONS[category] || [];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = categoryProducts;

    // Apply category filter
    if (localFilter !== 'ALL') {
      filtered = filtered.filter(product => {
        if (category === 'america') return product.country === localFilter;
        if (category === 'asia') return product.team === localFilter;
        if (['premier', 'portugal', 'italy', 'germany', 'brazil'].includes(category)) {
          return product.team === localFilter;
        }
        if (category === 'international') return product.championship === localFilter;
        return true;
      });
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.team && product.team.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.country && product.country.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.championship && product.championship.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

    return filtered;
  }, [categoryProducts, localFilter, searchTerm, priceRange, sortBy, category]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [localFilter, searchTerm, priceRange, sortBy]);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      {filterOptions.length > 0 && (
        <div>
          <Label className="text-sm font-medium mb-3 block">Filtrar por:</Label>
          <Select value={localFilter} onValueChange={setLocalFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          Faixa de Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={200}
          min={0}
          step={10}
          className="w-full"
        />
      </div>

      {/* Sort Options */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Ordenar por:</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nome (A-Z)</SelectItem>
            <SelectItem value="price-low">Menor Preço</SelectItem>
            <SelectItem value="price-high">Maior Preço</SelectItem>
            <SelectItem value="newest">Mais Recentes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setLocalFilter('ALL');
          setPriceRange([0, 200]);
          setSortBy('name');
        }}
      >
        Limpar Filtros
      </Button>
    </div>
  );

  return (
    <section id={category} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            {Icon && <Icon className="w-8 h-8 text-primary mr-3" />}
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="sm:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary">
                  Busca: {searchTerm}
                </Badge>
              )}
              {localFilter !== 'ALL' && (
                <Badge variant="secondary">
                  {filterOptions.find(opt => opt.value === localFilter)?.label}
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 200) && (
                <Badge variant="secondary">
                  R$ {priceRange[0]} - R$ {priceRange[1]}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Desktop Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nome (A-Z)</SelectItem>
                <SelectItem value="price-low">Menor Preço</SelectItem>
                <SelectItem value="price-high">Maior Preço</SelectItem>
                <SelectItem value="newest">Mais Recentes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6 p-6 border rounded-lg bg-card">
              <h3 className="font-semibold">Filtros</h3>
              <Separator />
              <FilterContent />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground mb-6">
                  Tente ajustar os filtros ou fazer uma nova busca.
                </p>
                <Button 
                  onClick={() => {
                    setLocalFilter('ALL');
                    setPriceRange([0, 200]);
                    setSortBy('name');
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {paginatedProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <CustomPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
