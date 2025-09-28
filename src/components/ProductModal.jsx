import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Minus, Plus, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useApp } from '../context/AppContext';

const ProductModal = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  
  const { 
    addToCart, 
    toggleFavorite, 
    isFavorite,
    showSuccessMessage 
  } = useApp();

  if (!product) return null;

  const sizes = ['P', 'M', 'G', 'GG', 'XG'];
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    showSuccessMessage(`${quantity}x ${product.name} adicionado ao carrinho!`);
    onClose();
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    const message = isFavorite(product.id) 
      ? `${product.name} removido dos favoritos!`
      : `${product.name} adicionado aos favoritos!`;
    showSuccessMessage(message);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Confira esta camisa incrível: ${product.name}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback para navegadores que não suportam Web Share API
      navigator.clipboard.writeText(window.location.href);
      showSuccessMessage('Link copiado para a área de transferência!');
    }
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <Badge 
                className={`absolute top-4 left-4 ${getCategoryBadge()}`}
                variant="secondary"
              >
                {product.category.toUpperCase()}
              </Badge>
            </div>
            
            {/* Thumbnail Gallery (placeholder) */}
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-xs text-gray-500">+{i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header Info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-bold text-primary">
                  R$ {product.price.toFixed(2)}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">4.8</span>
                  <span className="text-sm text-muted-foreground">(127 avaliações)</span>
                </div>
              </div>

              {/* Product Meta */}
              <div className="space-y-2 text-sm text-muted-foreground">
                {product.team && (
                  <p><span className="font-medium">Time:</span> {product.team}</p>
                )}
                {product.country && (
                  <p><span className="font-medium">País:</span> {product.country}</p>
                )}
                {product.championship && (
                  <p><span className="font-medium">Campeonato:</span> {product.championship}</p>
                )}
              </div>
            </div>

            <Separator />

            {/* Size Selection */}
            <div>
              <h4 className="font-medium mb-3">Tamanho</h4>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="w-12 h-12"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h4 className="font-medium mb-3">Quantidade</h4>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full h-12 text-lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Adicionar ao Carrinho - R$ {(product.price * quantity).toFixed(2)}
              </Button>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleToggleFavorite}
                >
                  <Heart 
                    className={`h-4 w-4 mr-2 ${isFavorite(product.id) ? 'fill-current text-red-500' : ''}`} 
                  />
                  {isFavorite(product.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="h-5 w-5 text-green-600" />
                <span>Frete grátis para compras acima de R$ 150</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Produto 100% original e licenciado</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <RotateCcw className="h-5 w-5 text-orange-600" />
                <span>30 dias para troca e devolução</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <Separator className="my-6" />
        
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="specifications">Especificações</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-4">
            <div className="prose prose-sm max-w-none">
              <p>
                Camisa oficial de alta qualidade, confeccionada com materiais premium e tecnologia 
                Dri-FIT para máximo conforto e performance. Design autêntico com todos os detalhes 
                oficiais do time.
              </p>
              <ul>
                <li>Material: 100% Poliéster com tecnologia Dri-FIT</li>
                <li>Corte: Slim fit para melhor caimento</li>
                <li>Gola: Gola careca com acabamento reforçado</li>
                <li>Estampa: Sublimação de alta qualidade</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Material:</span>
                <p className="text-muted-foreground">100% Poliéster</p>
              </div>
              <div>
                <span className="font-medium">Tecnologia:</span>
                <p className="text-muted-foreground">Dri-FIT</p>
              </div>
              <div>
                <span className="font-medium">Corte:</span>
                <p className="text-muted-foreground">Slim Fit</p>
              </div>
              <div>
                <span className="font-medium">Origem:</span>
                <p className="text-muted-foreground">Produto Oficial</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="text-3xl font-bold">4.8</div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">127 avaliações</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="border-l-4 border-primary pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">João Silva</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="h-3 w-3 fill-yellow-400 text-yellow-400" 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Excelente qualidade! Material muito bom e caimento perfeito."
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
