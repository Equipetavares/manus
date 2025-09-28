# 🚀 Deploy do SportStyle Store

## 📋 Instruções de Deploy

### 1. **Clone do Repositório**
```bash
git clone https://github.com/Equipetavares/manus.git
cd manus/sportstyle-store
```

### 2. **Instalação de Dependências**
```bash
# Usando pnpm (recomendado)
pnpm install

# Ou usando npm
npm install

# Ou usando yarn
yarn install
```

### 3. **Desenvolvimento Local**
```bash
# Iniciar servidor de desenvolvimento
pnpm run dev

# Acessar em: http://localhost:5173
```

### 4. **Build para Produção**
```bash
# Gerar build otimizado
pnpm run build

# Arquivos gerados em: dist/
```

### 5. **Deploy em Serviços**

#### **Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### **Netlify**
```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### **GitHub Pages**
```bash
# Adicionar ao package.json
"homepage": "https://equipetavares.github.io/manus/sportstyle-store"

# Build e deploy
pnpm run build
npx gh-pages -d dist
```

## 🌐 **URLs do Projeto**

- **Repositório**: https://github.com/Equipetavares/manus
- **Pasta do Projeto**: `/sportstyle-store`
- **Demo Local**: http://localhost:5173

## ✅ **Checklist de Deploy**

- [x] Código no GitHub
- [x] Dependências instaladas
- [x] Build funcionando
- [x] Arquivos otimizados
- [x] .gitignore configurado
- [x] README documentado
- [x] Estrutura modular
- [x] Componentes testados

## 🛠️ **Tecnologias**

- React 18
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React

## 📱 **Funcionalidades**

- 200+ produtos organizados
- 9 seções de camisas
- Carrinho de compras
- Sistema de favoritos
- Busca em tempo real
- Filtros avançados
- Modal de produtos
- Integração WhatsApp
- Design responsivo
- Performance otimizada

## 🎯 **Pronto para Produção!**

O SportStyle Store está 100% funcional e pronto para deploy em qualquer plataforma de hospedagem moderna.
