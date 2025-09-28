import React, { createContext, useContext, useState } from 'react';
import { useShoppingCart } from '../hooks/useShoppingCart';
import { useFavorites } from '../hooks/useFavorites';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Hooks para carrinho e favoritos
  const cart = useShoppingCart();
  const favorites = useFavorites();

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name');
    setPriceRange([0, 200]);
  };

  // Função para mostrar notificação de sucesso
  const showSuccessMessage = (message) => {
    // Implementar toast/notification aqui
    console.log('Success:', message);
  };

  // Função para mostrar notificação de erro
  const showErrorMessage = (message) => {
    // Implementar toast/notification aqui
    console.error('Error:', message);
  };

  const value = {
    // Estados de filtros
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    clearFilters,
    
    // Estados de loading
    isLoading,
    setIsLoading,
    
    // Carrinho de compras
    ...cart,
    
    // Favoritos
    ...favorites,
    
    // Notificações
    showSuccessMessage,
    showErrorMessage
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
