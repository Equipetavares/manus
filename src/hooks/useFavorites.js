import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Carregar favoritos do localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('sportstyle-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Salvar favoritos no localStorage
  useEffect(() => {
    localStorage.setItem('sportstyle-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.find(item => item.id === product.id)) {
        return prevFavorites; // Já está nos favoritos
      }
      return [...prevFavorites, product];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(item => item.id !== productId)
    );
  };

  const toggleFavorite = (product) => {
    const isFavorite = favorites.find(item => item.id === product.id);
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites
  };
};
