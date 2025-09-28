import React from 'react';
import { Search, TrendingUp, Award, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useApp } from '../context/AppContext';

const HeroSection = () => {
  const { searchTerm, setSearchTerm } = useApp();

  const stats = [
    { icon: Award, label: 'Produtos Premium', value: '200+' },
    { icon: Users, label: 'Clientes Satisfeitos', value: '10k+' },
    { icon: TrendingUp, label: 'Vendas Mensais', value: '500+' },
  ];

  const featuredCategories = [
    { name: 'Premier League', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', href: '#premier' },
    { name: 'Série A', emoji: '🇮🇹', href: '#italy' },
    { name: 'Primeira Liga', emoji: '🇵🇹', href: '#portugal' },
    { name: 'Seleções', emoji: '🌍', href: '#selections' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                🏆 Loja Oficial de Camisas Esportivas
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                SportStyle
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  Store
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-lg">
                As melhores camisas esportivas do mundo em um só lugar. 
                Qualidade premium, preços imbatíveis.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por time, país ou campeonato..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
              />
            </div>

            {/* Featured Categories */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-primary-foreground/80">
                Categorias em Destaque:
              </p>
              <div className="flex flex-wrap gap-3">
                {featuredCategories.map((category) => (
                  <Button
                    key={category.name}
                    variant="secondary"
                    size="sm"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                    asChild
                  >
                    <a href={category.href}>
                      <span className="mr-2">{category.emoji}</span>
                      {category.name}
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <a href="#products">
                  Explorar Produtos
                </a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <a href="#offers">
                  Ver Ofertas
                </a>
              </Button>
            </div>
          </div>

          {/* Hero Image/Stats */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Featured Product Preview */}
            <div className="relative">
              <div className="aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 p-8">
                <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">⚽</div>
                    <p className="text-lg font-semibold">Camisas Oficiais</p>
                    <p className="text-sm text-primary-foreground/80">Premium Quality</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Badges */}
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white">
                Frete Grátis
              </Badge>
              <Badge className="absolute -bottom-2 -left-2 bg-orange-500 text-white">
                Até 12x
              </Badge>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
