import React from 'react';
import { Crown, Globe, Trophy, Flag, MapPin, Star, Zap, Award } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductSection from './components/ProductSection';
import './App.css';

function App() {
  const sections = [
    {
      id: 'premier',
      title: 'Premier League',
      category: 'premier',
      icon: Crown,
      description: 'As melhores camisas da liga mais competitiva do mundo. Arsenal, Chelsea, Liverpool, Manchester City, Manchester United e Tottenham.'
    },
    {
      id: 'italy',
      title: 'Série A da Itália',
      category: 'italy',
      icon: Trophy,
      description: 'Tradição e elegância italiana. AC Milan, Inter, Juventus, Napoli, Roma, Lazio e muito mais.'
    },
    {
      id: 'portugal',
      title: 'Primeira Liga Portugal',
      category: 'portugal',
      icon: Flag,
      description: 'O melhor do futebol português. Benfica, Porto, Sporting e Braga com designs únicos.'
    },
    {
      id: 'africa',
      title: 'Seleções Africanas',
      category: 'africa',
      icon: Globe,
      description: 'Orgulho africano em cada camisa. Argélia, Marrocos, Nigéria e outras seleções do continente.'
    },
    {
      id: 'america',
      title: 'Seleções das Américas',
      category: 'america',
      icon: MapPin,
      description: 'Das Américas para o mundo. Argentina, Brasil, Chile, Colômbia, Estados Unidos, México e Uruguai.'
    },
    {
      id: 'asia',
      title: 'Seleções Asiáticas',
      category: 'asia',
      icon: Star,
      description: 'Força e determinação asiática. Arábia Saudita, Austrália, Coreia do Sul e Japão.'
    },
    {
      id: 'germany',
      title: 'Bundesliga',
      category: 'germany',
      icon: Zap,
      description: 'Eficiência alemã em campo. Bayern München e Borussia Dortmund com qualidade premium.'
    },
    {
      id: 'brazil',
      title: 'Brasileirão',
      category: 'brazil',
      icon: Award,
      description: 'Paixão brasileira em cada thread. Flamengo, Palmeiras e Corinthians com designs autênticos.'
    },
    {
      id: 'international',
      title: 'Campeonatos Internacionais',
      category: 'international',
      icon: Globe,
      description: 'O melhor do futebol mundial. MLS, Liga Árabe, Liga Argentina, Eredivisie, Liga MX e Primera División Chile.'
    }
  ];

  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <HeroSection />
          
          <div id="products">
            {sections.map((section) => (
              <ProductSection
                key={section.id}
                title={section.title}
                category={section.category}
                icon={section.icon}
                description={section.description}
              />
            ))}
          </div>
        </main>

        <footer className="bg-muted py-16 mt-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-lg">SportStyle Store</h3>
                <p className="text-muted-foreground">
                  A melhor loja de camisas esportivas do Brasil. 
                  Qualidade premium, preços imbatíveis.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Categorias</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#premier" className="hover:text-primary">Premier League</a></li>
                  <li><a href="#italy" className="hover:text-primary">Série A</a></li>
                  <li><a href="#portugal" className="hover:text-primary">Primeira Liga</a></li>
                  <li><a href="#selections" className="hover:text-primary">Seleções</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Atendimento</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>WhatsApp: (11) 99999-9999</li>
                  <li>Email: contato@sportstyle.com</li>
                  <li>Seg-Sex: 9h às 18h</li>
                  <li>Sáb: 9h às 14h</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Informações</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Frete grátis acima de R$ 150</li>
                  <li>Parcelamento em até 12x</li>
                  <li>30 dias para troca</li>
                  <li>Produtos originais</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 SportStyle Store. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;
