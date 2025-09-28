import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useApp } from '../context/AppContext';
import ProductModal from './ProductModal';

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  const { 
    addToCart, 
    toggleFavorite, 
    isFavorite,
    showSuccessMessage 
  } = useApp();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    showSuccessMessage(`${product.name} adicionado ao carrinho!`);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
    const message = isFavorite(product.id) 
      ? `${product.name} removido dos favoritos!`
      : `${product.name} adicionado aos favoritos!`;
    showSuccessMessage(message);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const getCategoryBadge = () => {
    const categoryColors = {
      'premier': 'bg-purple-100 text-purple-800',
      'italy': 'bg-green-100 text-green-800',
      'portugal': 'bg-red-100 text-red-800',
      'germany': 'bg-yellow-100 text-yellow-800',
      'brazil': 'bg-blue-100 text-blue-800',
      'america': 'bg-orange-100 text-orange-800',
      'africa': 'bg-amber-100 text-amber-800',
      'asia': 'bg-pink-100 text-pink-800',
      'international': 'bg-indigo-100 text-indigo-800',
    };

    return categoryColors[product.category] || 'bg-gray-100 text-gray-800';
  };

  const getPriceColor = () => {
    if (product.price >= 120) return 'text-red-600 font-bold';
    if (product.price >= 100) return 'text-orange-600 font-semibold';
    return 'text-green-600 font-semibold';
  };

  return (
    <>
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden">
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            
            {imageError ? (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Eye className="w-8 h-8" />
                  </div>
                  <p className="text-sm">Imagem não disponível</p>
                </div>
              </div>
            ) : (
              <img
                src={product.img}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            )}

            {/* Category Badge */}
            <Badge 
              className={`absolute top-2 left-2 ${getCategoryBadge()}`}
              variant="secondary"
            >
              {product.category.toUpperCase()}
            </Badge>

            {/* Favorite Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
                isFavorite(product.id) ? 'text-red-500' : 'text-gray-600'
              }`}
              onClick={handleToggleFavorite}
            >
              <Heart 
                className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} 
              />
            </Button>

            {/* Quick Actions Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsModalOpen(true);
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver Detalhes
                </Button>
                
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <div className="mb-2">
              <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                {product.name}
              </h3>
              
              {/* Product Details */}
              <div className="text-xs text-muted-foreground space-y-1">
                {product.team && (
                  <p>Time: {product.team}</p>
                )}
                {product.country && (
                  <p>País: {product.country}</p>
                )}
                {product.championship && (
                  <p>Campeonato: {product.championship}</p>
                )}
              </div>
            </div>

            {/* Price and Rating */}
            <div className="flex items-center justify-between mb-3">
              <div className={`text-lg font-bold ${getPriceColor()}`}>
                R$ {product.price.toFixed(2)}
              </div>
              
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">4.8</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
              >
                <Eye className="h-4 w-4 mr-1" />
                Detalhes
              </Button>
              
              <Button
                size="sm"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Comprar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Modal */}
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProductCard;
