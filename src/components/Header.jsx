import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, Menu, X, User, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useApp } from '../context/AppContext';
import ShoppingCartSheet from './ShoppingCartSheet';
import FavoritesSheet from './FavoritesSheet';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  
  const { 
    searchTerm, 
    setSearchTerm, 
    getCartItemsCount, 
    favorites 
  } = useApp();

  const navigationItems = [
    { name: 'Início', href: '#home', icon: Home },
    { name: 'Premier League', href: '#premier' },
    { name: 'Série A', href: '#italy' },
    { name: 'Primeira Liga', href: '#portugal' },
    { name: 'Seleções', href: '#selections' },
    { name: 'Ofertas', href: '#offers' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="hidden font-bold sm:inline-block">
                SportStyle Store
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-sm mx-6">
              <div className="relative w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar camisas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Search Button - Mobile */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Search className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="h-20">
                  <div className="flex items-center space-x-2 pt-4">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar camisas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Favorites */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavoritesOpen(true)}
                className="relative"
              >
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {favorites.length}
                  </Badge>
                )}
              </Button>

              {/* Shopping Cart */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {getCartItemsCount() > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {getCartItemsCount()}
                  </Badge>
                )}
              </Button>

              {/* User Account */}
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-4 mt-8">
                    <div className="flex items-center space-x-2 pb-4 border-b">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <Home className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <span className="font-bold">SportStyle Store</span>
                    </div>
                    
                    {navigationItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center space-x-3 text-sm font-medium transition-colors hover:text-primary py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Shopping Cart Sheet */}
      <ShoppingCartSheet 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      {/* Favorites Sheet */}
      <FavoritesSheet 
        isOpen={isFavoritesOpen} 
        onClose={() => setIsFavoritesOpen(false)} 
      />
    </>
  );
};

export default Header;
