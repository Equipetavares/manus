import React from 'react';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Badge } from './ui/badge';
import { useApp } from '../context/AppContext';

const FavoritesSheet = ({ isOpen, onClose }) => {
  const { 
    favorites, 
    removeFromFavorites, 
    clearFavorites,
    addToCart 
  } = useApp();

  const handleAddToCart = (product) => {
    addToCart(product);
    // Opcional: remover dos favoritos após adicionar ao carrinho
    // removeFromFavorites(product.id);
  };

  if (favorites.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Favoritos
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum favorito ainda</h3>
            <p className="text-muted-foreground mb-6">
              Adicione produtos aos favoritos para vê-los aqui!
            </p>
            <Button onClick={onClose}>
              Explorar Produtos
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Favoritos
            </div>
            <Badge variant="secondary">
              {favorites.length} {favorites.length === 1 ? 'item' : 'itens'}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        {/* Favorites Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {favorites.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    R$ {item.price.toFixed(2)}
                  </p>
                  
                  {item.team && (
                    <p className="text-xs text-muted-foreground">
                      Time: {item.team}
                    </p>
                  )}
                  
                  {item.country && (
                    <p className="text-xs text-muted-foreground">
                      País: {item.country}
                    </p>
                  )}
                  
                  {item.championship && (
                    <p className="text-xs text-muted-foreground">
                      Campeonato: {item.championship}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(item)}
                    className="w-full"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromFavorites(item.id)}
                    className="text-destructive hover:text-destructive w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remover
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="border-t pt-4 space-y-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onClose}
          >
            Continuar Navegando
          </Button>
          
          <Button 
            variant="outline" 
            onClick={clearFavorites}
            className="w-full text-destructive hover:text-destructive"
          >
            Limpar Favoritos
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FavoritesSheet;
