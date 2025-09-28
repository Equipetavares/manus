import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useApp } from '../context/AppContext';

const ShoppingCartSheet = ({ isOpen, onClose }) => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal,
    getCartItemsCount 
  } = useApp();

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const orderDetails = cart.map(item => 
      `${item.name} - Qtd: ${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const total = getCartTotal().toFixed(2);
    const message = `🛒 *Pedido SportStyle Store*\n\n${orderDetails}\n\n💰 *Total: R$ ${total}*\n\nGostaria de finalizar este pedido!`;
    
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Limpar carrinho após envio
    clearCart();
    onClose();
  };

  if (cart.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Carrinho de Compras
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Seu carrinho está vazio</h3>
            <p className="text-muted-foreground mb-6">
              Adicione alguns produtos incríveis para começar suas compras!
            </p>
            <Button onClick={onClose}>
              Continuar Comprando
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
              <ShoppingBag className="h-5 w-5" />
              Carrinho de Compras
            </div>
            <Badge variant="secondary">
              {getCartItemsCount()} {getCartItemsCount() === 1 ? 'item' : 'itens'}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {cart.map((item) => (
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
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    
                    <span className="text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <p className="text-sm font-semibold">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="border-t pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium">Total:</span>
            <span className="text-lg font-bold">
              R$ {getCartTotal().toFixed(2)}
            </span>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleWhatsAppCheckout}
            >
              Finalizar via WhatsApp
            </Button>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={onClose}
              >
                Continuar Comprando
              </Button>
              
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                Limpar Carrinho
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartSheet;
