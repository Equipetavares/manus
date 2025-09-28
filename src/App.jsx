import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Search, X, ChevronLeft, ChevronRight, MoreHorizontal, RefreshCw, ImageOff, AlertTriangle, Home } from 'lucide-react';
import './App.css';

// =================================================================================
// ||  DADOS E CONFIGURAÇÕES - SITE SPORTSTYLE STORE COMPLETO                    ||
// =================================================================================

const SHIRT_DATA = {
  // Seleções Africanas
  africaShirts: [
    { name: "Argélia Away", img: "https://i.ibb.co/ccX6wJcF/Alg-ria-Away.jpg" },
    { name: "Argélia Black", img: "https://i.ibb.co/F4smtqPy/Algeria-Black.jpg" },
    { name: "Argélia Home", img: "https://i.ibb.co/GQDmRrVq/Algeria-Home.jpg" },
    { name: "Argélia White", img: "https://i.ibb.co/sdJhnGjM/Algeria-White.jpg" },
    { name: "Marrocos Home", img: "https://i.ibb.co/20Qrwmw5/Marrocos-Home.jpg" },
    { name: "Nigéria Away", img: "https://i.ibb.co/Sw8m6gYS/Nig-ria-1.jpg" },
    { name: "Nigéria Home", img: "https://i.ibb.co/KzGwR6rK/Nig-ria-2.jpg" },
    { name: "Nigéria Concept", img: "https://i.ibb.co/3ybm0yXP/Nigeria.jpg" },
    { name: "Nigéria Third", img: "https://i.ibb.co/xqLZfHrJ/Nig-ria.jpg" },
  ],

  // Seleções das Américas
  americaShirts: [
    { name: "Argentina Ed. Especial", img: "https://i.ibb.co/7xyKPqPJ/2025052817162713.jpg", country: 'AR' },
    { name: "Argentina Adidas", img: "https://i.ibb.co/R19yL55/Argentina-Adidas.jpg", country: 'AR' },
    { name: "Argentina Away", img: "https://i.ibb.co/PzfB8sY1/Argentina-Away.jpg", country: 'AR' },
    { name: "Argentina Black Long", img: "https://i.ibb.co/fYSc3rpM/Argentina-Black-Long.jpg", country: 'AR' },
    { name: "Argentina Black", img: "https://i.ibb.co/s95xyHV1/Argentina-Black.jpg", country: 'AR' },
    { name: "Brasil Retrô 1", img: "https://i.ibb.co/8DvfkffP/5.jpg", country: 'BR' },
    { name: "Brasil Concept 1", img: "https://i.ibb.co/dwfjFCkF/202504111319476-2.jpg", country: 'BR' },
    { name: "Brasil Treino 1", img: "https://i.ibb.co/WN21sCc6/202505121717535-1.jpg", country: 'BR' },
    { name: "Brasil Home Oficial", img: "https://i.ibb.co/vxvvgP8Z/Brasil-Home.jpg", country: 'BR' },
    { name: "Brasil Away Oficial", img: "https://i.ibb.co/PsJYsZhb/Brasil-Away.jpg", country: 'BR' },
    { name: "Chile Home 1", img: "https://i.ibb.co/RpwL6dv3/Chile-I-1.jpg", country: 'CL' },
    { name: "Chile Home 2", img: "https://i.ibb.co/bjdDDdwW/Chile-I.jpg", country: 'CL' },
    { name: "Colômbia Home 1", img: "https://i.ibb.co/hRFFVhMn/Col-mbia-I-1.jpg", country: 'CO' },
    { name: "Colômbia Home 2", img: "https://i.ibb.co/gbffsHHf/Col-mbia-I.jpg", country: 'CO' },
    { name: "Estados Unidos Home 1", img: "https://i.ibb.co/mVWw3TvK/Estados-Unidos-I-1.jpg", country: 'US' },
    { name: "Estados Unidos Home 2", img: "https://i.ibb.co/VchNRhkg/Estados-Unidos-I.jpg", country: 'US' },
    { name: "México Especial 1", img: "https://i.ibb.co/3mZhJLxC/Mexico-1.jpg", country: 'MX' },
    { name: "México Especial 2", img: "https://i.ibb.co/PsNS0r94/M-xico-1.jpg", country: 'MX' },
    { name: "Uruguai Home 1", img: "https://i.ibb.co/6RtGShgR/Uruguai-I-1.jpg", country: 'UY' },
    { name: "Uruguai Home 2", img: "https://i.ibb.co/Ld5ftKWB/Uruguai-I.jpg", country: 'UY' },
  ],

  // Seleções Asiáticas
  asiaShirts: [
    { name: "Arábia Saudita Away 2022", team: 'ARABIA_SAUDITA', img: "https://i.ibb.co/jBVRnKZ/Saudi-Arabia-2022-World-Cup-Away-Jersey-47614.jpg" },
    { name: "Austrália I", team: 'AUSTRALIA', img: "https://i.ibb.co/pBr3zkrx/Austr-lia-I-1.jpg" },
    { name: "Coreia do Sul I", team: 'COREIA_DO_SUL', img: "https://i.ibb.co/bRFT5Mtg/Coreia-do-Sul-I.jpg" },
    { name: "Japão 1", team: 'JAPAO', img: "https://i.ibb.co/PvNg00ts/Jap-o-1.jpg" },
    { name: "Japão 2", team: 'JAPAO', img: "https://i.ibb.co/qF1BRX1v/Jap-o-3.jpg" },
    { name: "Japão 3", team: 'JAPAO', img: "https://i.ibb.co/fGYg3zv6/Jap-o-4.jpg" },
  ],

  // Bundesliga
  bundesligaShirts: [
    { name: "Bayern München Home", team: 'BAYERN', img: "https://via.placeholder.com/300x400/FF0000/FFFFFF?text=Bayern+Home" },
    { name: "Bayern München Away", team: 'BAYERN', img: "https://via.placeholder.com/300x400/FFFFFF/FF0000?text=Bayern+Away" },
    { name: "Borussia Dortmund Home", team: 'DORTMUND', img: "https://via.placeholder.com/300x400/FFFF00/000000?text=Dortmund+Home" },
    { name: "Borussia Dortmund Away", team: 'DORTMUND', img: "https://via.placeholder.com/300x400/000000/FFFF00?text=Dortmund+Away" },
  ],

  // Brasileirão
  brasileiroShirts: [
    { name: "Flamengo Home", team: 'FLAMENGO', img: "https://via.placeholder.com/300x400/FF0000/000000?text=Flamengo+Home" },
    { name: "Flamengo Away", team: 'FLAMENGO', img: "https://via.placeholder.com/300x400/FFFFFF/FF0000?text=Flamengo+Away" },
    { name: "Palmeiras Home", team: 'PALMEIRAS', img: "https://via.placeholder.com/300x400/008000/FFFFFF?text=Palmeiras+Home" },
    { name: "Palmeiras Away", team: 'PALMEIRAS', img: "https://via.placeholder.com/300x400/FFFFFF/008000?text=Palmeiras+Away" },
    { name: "Corinthians Home", team: 'CORINTHIANS', img: "https://via.placeholder.com/300x400/FFFFFF/000000?text=Corinthians+Home" },
    { name: "Corinthians Away", team: 'CORINTHIANS', img: "https://via.placeholder.com/300x400/000000/FFFFFF?text=Corinthians+Away" },
  ],

  // Premier League
  premierLeagueShirts: [
    // Arsenal
    { name: "Arsenal Home 1", team: 'ARSENAL', img: "https://i.ibb.co/fgRbjBR/Arsenal-Home.jpg" },
    { name: "Arsenal Home 2", team: 'ARSENAL', img: "https://i.ibb.co/S4zpzx7m/Arsenal-Home.jpg" },
    { name: "Arsenal Away 1", team: 'ARSENAL', img: "https://i.ibb.co/pjq4Fv1R/Arsenal-Away-1.jpg" },
    { name: "Arsenal Away 2", team: 'ARSENAL', img: "https://i.ibb.co/XfTzxbCZ/Arsenal-Away.jpg" },
    { name: "Arsenal Third 1", team: 'ARSENAL', img: "https://i.ibb.co/qMn84VRJ/Arsenal-Third.jpg" },
    { name: "Arsenal Third 2", team: 'ARSENAL', img: "https://i.ibb.co/FbBq5y2N/Arsenal-Third.jpg" },
    
    // Chelsea
    { name: "Chelsea 1", team: 'CHELSEA', img: "https://i.ibb.co/mC1brXZC/Chelsea-1.jpg" },
    { name: "Chelsea 2", team: 'CHELSEA', img: "https://i.ibb.co/Pv4vHPKp/Chelsea-2.jpg" },
    { name: "Chelsea 3", team: 'CHELSEA', img: "https://i.ibb.co/Zpkj4kLd/Chelsea-3.jpg" },
    { name: "Chelsea 4", team: 'CHELSEA', img: "https://i.ibb.co/zWKc78FS/Chelsea-4.jpg" },
    { name: "Chelsea 5", team: 'CHELSEA', img: "https://i.ibb.co/LzgMKpSP/Chelsea-5.jpg" },
    
    // Liverpool
    { name: "Liverpool 1", team: 'LIVERPOOL', img: "https://i.ibb.co/bjG2GW9X/Liverpool-1.jpg" },
    { name: "Liverpool 2", team: 'LIVERPOOL', img: "https://i.ibb.co/pvPrfgZ2/Liverpool-2.jpg" },
    { name: "Liverpool 3", team: 'LIVERPOOL', img: "https://i.ibb.co/g1W1tLW/Liverpool-3.jpg" },
    { name: "Liverpool 4", team: 'LIVERPOOL', img: "https://i.ibb.co/nNR17sLM/Liverpool-4.jpg" },
    { name: "Liverpool 5", team: 'LIVERPOOL', img: "https://i.ibb.co/jvTVjSrm/Liverpool-5.jpg" },
    
    // Manchester City
    { name: "Manchester City 1", team: 'MANCHESTER_CITY', img: "https://i.ibb.co/8n0zgh40/Manchester-1.jpg" },
    { name: "Manchester City 2", team: 'MANCHESTER_CITY', img: "https://i.ibb.co/ymcT7hZy/Manchester-2.jpg" },
    { name: "Manchester City 3", team: 'MANCHESTER_CITY', img: "https://i.ibb.co/gLcqpyPV/Manchester-3.jpg" },
    { name: "Manchester City 4", team: 'MANCHESTER_CITY', img: "https://i.ibb.co/5XbvDGYR/Manchester-4.jpg" },
    { name: "Manchester City 5", team: 'MANCHESTER_CITY', img: "https://i.ibb.co/HLd3DTqR/Manchester-5.jpg" },
    
    // Manchester United
    { name: "Manchester United 1", team: 'MANCHESTER_UNITED', img: "https://i.ibb.co/XBk6BnF/Manchester-United-1.jpg" },
    { name: "Manchester United 2", team: 'MANCHESTER_UNITED', img: "https://i.ibb.co/bRDZTZr8/Manchester-United-2.jpg" },
    { name: "Manchester United 3", team: 'MANCHESTER_UNITED', img: "https://i.ibb.co/fzDRhQ7H/Manchester-United-3.jpg" },
    { name: "Manchester United 4", team: 'MANCHESTER_UNITED', img: "https://i.ibb.co/4nJRL5m1/Manchester-United-4.jpg" },
    { name: "Manchester United 5", team: 'MANCHESTER_UNITED', img: "https://i.ibb.co/HDfWJwnW/Manchester-United-5.jpg" },
    
    // Tottenham
    { name: "Tottenham 1", team: 'TOTTENHAM', img: "https://i.ibb.co/5X8SDT0m/Tottenham-1.jpg" },
    { name: "Tottenham 2", team: 'TOTTENHAM', img: "https://i.ibb.co/Gf0h1nZw/Tottenham-2.jpg" },
    { name: "Tottenham 3", team: 'TOTTENHAM', img: "https://i.ibb.co/BVfZ5ZLJ/Tottenham-3.jpg" },
    { name: "Tottenham 4", team: 'TOTTENHAM', img: "https://i.ibb.co/6QbfGYr/Tottenham-4.jpg" },
    { name: "Tottenham 5", team: 'TOTTENHAM', img: "https://i.ibb.co/Y4gPS6rk/Tottenham-5.jpg" },
  ],

  // Primeira Liga Portugal
  primeiraLigaShirts: [
    // Benfica
    { name: "Benfica 1", team: 'BENFICA', img: "https://i.ibb.co/r23St5Kf/benfinca-1.jpg" },
    { name: "Benfica 2", team: 'BENFICA', img: "https://i.ibb.co/9HJx6BzW/benfinca-2.jpg" },
    { name: "Benfica 3", team: 'BENFICA', img: "https://i.ibb.co/d0fzMH5S/benfinca-3.jpg" },
    { name: "Benfica 4", team: 'BENFICA', img: "https://i.ibb.co/4RM9m8Sg/benfinca-4.jpg" },
    { name: "Benfica 5", team: 'BENFICA', img: "https://i.ibb.co/8LZdCLbT/benfinca-5.jpg" },
    
    // Porto
    { name: "Porto 1", team: 'PORTO', img: "https://i.ibb.co/TDkLhCp4/porto-1.jpg" },
    { name: "Porto 2", team: 'PORTO', img: "https://i.ibb.co/TxBXrt9s/porto-2.jpg" },
    { name: "Porto 3", team: 'PORTO', img: "https://i.ibb.co/NgccSt8g/porto-3.jpg" },
    { name: "Porto 4", team: 'PORTO', img: "https://i.ibb.co/FbdSqdD2/porto-4.jpg" },
    { name: "Porto 5", team: 'PORTO', img: "https://i.ibb.co/v65fJ2J7/porto-5.jpg" },
    
    // Sporting
    { name: "Sporting 1", team: 'SPORTING', img: "https://i.ibb.co/Y4wrG7qd/sporting-1.jpg" },
    { name: "Sporting 2", team: 'SPORTING', img: "https://i.ibb.co/JwXy178J/sporting-2.jpg" },
    { name: "Sporting 3", team: 'SPORTING', img: "https://i.ibb.co/LdRbk2M1/sporting-3.jpg" },
    { name: "Sporting 4", team: 'SPORTING', img: "https://i.ibb.co/r2NDnKRV/sporting-4.jpg" },
    { name: "Sporting 5", team: 'SPORTING', img: "https://i.ibb.co/8n3vf1Gy/sporting-5.jpg" },
    
    // Braga
    { name: "Braga Away 1", team: 'BRAGA', img: "https://i.ibb.co/HDcSzB6m/Braga-Away1-1.jpg" },
    { name: "Braga Away 2", team: 'BRAGA', img: "https://i.ibb.co/HTF6CLfm/Braga-Away1-2.jpg" },
    { name: "Braga Away 3", team: 'BRAGA', img: "https://i.ibb.co/S4KY6HjN/Braga-Away1-3.jpg" },
  ],

  // Série A da Itália
  serieAShirts: [
    // AC Milan
    { name: "AC Milan Home 1", team: 'AC_MILAN', img: "https://i.ibb.co/PvZRWFM5/Ac-Milan-I-24-25-1.jpg" },
    { name: "AC Milan Home 2", team: 'AC_MILAN', img: "https://i.ibb.co/MkMQ9hw8/Ac-Milan-I-24-25.jpg" },
    { name: "AC Milan Away 1", team: 'AC_MILAN', img: "https://i.ibb.co/NMb6VL2/Ac-Milan-II-24-25-1.jpg" },
    { name: "AC Milan Away 2", team: 'AC_MILAN', img: "https://i.ibb.co/sdjTTnR4/Ac-Milan-II-24-25.jpg" },
    { name: "AC Milan Third 1", team: 'AC_MILAN', img: "https://i.ibb.co/CDwPgwB/AC-Milan-Third-1.jpg" },
    { name: "AC Milan Third 2", team: 'AC_MILAN', img: "https://i.ibb.co/HLy79dKQ/AC-Milan-Third-2.jpg" },
    { name: "AC Milan Gucci", team: 'AC_MILAN', img: "https://i.ibb.co/q3cf1qwr/AC-Milan-Gucci-1.jpg" },
    
    // Inter de Milão
    { name: "Inter de Milão Home 1", team: 'INTER_MILAN', img: "https://i.ibb.co/x8gSnGyj/Inter-de-Mil-o-Home-24.jpg" },
    { name: "Inter de Milão Home 2", team: 'INTER_MILAN', img: "https://i.ibb.co/gMBSQXKz/Inter-de-Mil-o-Home-24.jpg" },
    { name: "Inter de Milão Away", team: 'INTER_MILAN', img: "https://i.ibb.co/gZWXt877/Inter-de-Mil-o-Branca-24-25-1.jpg" },
    { name: "Inter de Milão Especial 1", team: 'INTER_MILAN', img: "https://i.ibb.co/fYFvVdvT/Inter-de-Mil-o-Edi-o-Especial-1.jpg" },
    { name: "Inter de Milão Especial 2", team: 'INTER_MILAN', img: "https://i.ibb.co/pBcMhm3D/Inter-de-Mil-o-Edi-o-Especial-2.jpg" },
    
    // Juventus
    { name: "Juventus Home 1", team: 'JUVENTUS', img: "https://i.ibb.co/0jGGQtHy/Juventus-24-1.jpg" },
    { name: "Juventus Home 2", team: 'JUVENTUS', img: "https://i.ibb.co/cX2NDLyy/Juventus-24-2.jpg" },
    { name: "Juventus Away 1", team: 'JUVENTUS', img: "https://i.ibb.co/TZK1124/Juventus-Fora-23-1.jpg" },
    { name: "Juventus Away 2", team: 'JUVENTUS', img: "https://i.ibb.co/s94rh2fm/Juventus-Fora-23.jpg" },
    { name: "Juventus Third", team: 'JUVENTUS', img: "https://i.ibb.co/jZJnWZKG/Juventus-Third.jpg" },
    
    // Napoli
    { name: "Napoli Home 1", team: 'NAPOLI', img: "https://i.ibb.co/HT1x5LPJ/Napoli-Home.jpg" },
    { name: "Napoli Home 2", team: 'NAPOLI', img: "https://i.ibb.co/KcDqJvxM/Napoli-Home.jpg" },
    { name: "Napoli Away 1", team: 'NAPOLI', img: "https://i.ibb.co/NngmzVTL/Napoli-Fora.jpg" },
    { name: "Napoli Away 2", team: 'NAPOLI', img: "https://i.ibb.co/2YyLSQFP/Napoli-Fora.jpg" },
    { name: "Napoli Third 1", team: 'NAPOLI', img: "https://i.ibb.co/jPP6Y6Kd/Napoli-Third.jpg" },
    { name: "Napoli Third 2", team: 'NAPOLI', img: "https://i.ibb.co/RGq4hhwk/Napoli-Third-1.jpg" },
    
    // Roma
    { name: "Roma Home 1", team: 'ROMA', img: "https://i.ibb.co/fdYz1NQX/Roma-Home.jpg" },
    { name: "Roma Home 2", team: 'ROMA', img: "https://i.ibb.co/j9yKwKQ1/Roma-Home.jpg" },
    { name: "Roma Away", team: 'ROMA', img: "https://i.ibb.co/jvBRFRnP/Roma-Away-1.jpg" },
    { name: "Roma Third 1", team: 'ROMA', img: "https://i.ibb.co/4Rvsy3MW/Roma-Third-1.jpg" },
    { name: "Roma Third 2", team: 'ROMA', img: "https://i.ibb.co/MxYP3P0T/Roma-Third-2.jpg" },
    
    // Lazio
    { name: "Lazio Home", team: 'LAZIO', img: "https://i.ibb.co/bjbsbJcQ/Lazio-I-24-25-1.jpg" },
    { name: "Lazio Away", team: 'LAZIO', img: "https://i.ibb.co/s9dCvB7S/Lazio-II-23-24-1.jpg" },
    { name: "Lazio Especial", team: 'LAZIO', img: "https://i.ibb.co/9k0Fn2hC/Lazio-23-24-Especial.jpg" },
    
    // Atalanta
    { name: "Atalanta Home 1", team: 'ATALANTA', img: "https://i.ibb.co/mFDDQVCZ/Atalanta-Home-1.jpg" },
    { name: "Atalanta Home 2", team: 'ATALANTA', img: "https://i.ibb.co/HsTDrM7/Atalanta-Home.jpg" },
    
    // Fiorentina
    { name: "Fiorentina Home 1", team: 'FIORENTINA', img: "https://i.ibb.co/W4rtf2pN/Fiorentina-I-23-24-1.jpg" },
    { name: "Fiorentina Home 2", team: 'FIORENTINA', img: "https://i.ibb.co/wZQP5Ssz/Fiorentina-I-24-25-1.jpg" },
  ],

  // Campeonatos Internacionais
  internationalShirts: [
    // MLS
    { name: "Inter Miami I 24-25", championship: 'MLS', img: "https://i.ibb.co/yBKdQhwC/Inter-Miami-I-24-25.jpg" },
    { name: "Inter Miami Pink", championship: 'MLS', img: "https://i.ibb.co/d0xsGSS8/Inter-Miami-Edi-o-Pink.jpg" },
    { name: "LA Galaxy I 24-25", championship: 'MLS', img: "https://i.ibb.co/B213fdfs/Galaxy-Los-Angeles-I-24-25-1.jpg" },
    { name: "Atlanta United I 23-24", championship: 'MLS', img: "https://i.ibb.co/RVWh8Jp/Atlanta-I-23-24.jpg" },
    
    // Liga Árabe
    { name: "Al-Hilal I 23-24", championship: 'ARABE', img: "https://i.ibb.co/LDd4w1J9/Al-Hilal-I-23-24-1.jpg" },
    { name: "Al-Nassr I 24-25", championship: 'ARABE', img: "https://i.ibb.co/fVG4bDQs/Al-Nassr-I-24-25-1.jpg" },
    { name: "Al-Nassr II 24-25", championship: 'ARABE', img: "https://i.ibb.co/wZZ0nb33/Al-Nassr-II-24-25-1.jpg" },
    
    // Liga Argentina
    { name: "Boca Juniors I 24-25", championship: 'ARGENTINO', img: "https://i.ibb.co/1YBWLKmr/Boca-Jr-I-24-25-1.jpg" },
    { name: "River Plate I", championship: 'ARGENTINO', img: "https://i.ibb.co/hx576Jsp/River-Plate-I.jpg" },
    { name: "River Plate Especial", championship: 'ARGENTINO', img: "https://i.ibb.co/DPcwDYq3/River-Plate-Especial-1.jpg" },
    
    // Eredivisie
    { name: "Ajax II 24-25", championship: 'HOLANDES', img: "https://i.ibb.co/k2n20BkS/Ajax-II-24-25-1.jpg" },
    { name: "PSV Home", championship: 'HOLANDES', img: "https://i.ibb.co/zTVQgRdf/PSV-Home.jpg" },
    { name: "Feyenoord Home", championship: 'HOLANDES', img: "https://i.ibb.co/35c5tBrW/Feyenoord-Home.jpg" },
    
    // Liga MX
    { name: "América 24-25", championship: 'MEXICANO', img: "https://i.ibb.co/9kmQTPWC/America-24-25-1.jpg" },
    { name: "Cruz Azul I 24-25", championship: 'MEXICANO', img: "https://i.ibb.co/qYj8SBg7/Cruz-Azul-I-24-25-1.jpg" },
    
    // Primera División Chile
    { name: "Colo-Colo I 24-25", championship: 'CHILENO', img: "https://i.ibb.co/bS0XkR6/Colo-Colo-I-24-25.jpg" },
    { name: "Universidad de Chile Away", championship: 'CHILENO', img: "https://i.ibb.co/whqsdqjt/Universidad-de-Chile-Away.jpg" },
  ]
};

// Filtros e opções
const FILTER_OPTIONS = {
  america: [
    { value: 'ALL', label: 'Todos' },
    { value: 'AR', label: 'Argentina (AR)' },
    { value: 'BR', label: 'Brasil (BR)' },
    { value: 'CL', label: 'Chile (CL)' },
    { value: 'CO', label: 'Colômbia (CO)' },
    { value: 'US', label: 'Estados Unidos (US)' },
    { value: 'MX', label: 'México (MX)' },
    { value: 'UY', label: 'Uruguai (UY)' }
  ],
  asia: [
    { value: 'ALL', label: 'Todos' },
    { value: 'ARABIA_SAUDITA', label: 'Arábia Saudita' },
    { value: 'AUSTRALIA', label: 'Austrália' },
    { value: 'COREIA_DO_SUL', label: 'Coreia do Sul' },
    { value: 'JAPAO', label: 'Japão' }
  ],
  bundesliga: [
    { value: 'ALL', label: 'Todos' },
    { value: 'BAYERN', label: 'Bayern München' },
    { value: 'DORTMUND', label: 'Borussia Dortmund' }
  ],
  brasileirao: [
    { value: 'ALL', label: 'Todos' },
    { value: 'FLAMENGO', label: 'Flamengo' },
    { value: 'PALMEIRAS', label: 'Palmeiras' },
    { value: 'CORINTHIANS', label: 'Corinthians' }
  ],
  premierLeague: [
    { value: 'ALL', label: 'Todos' },
    { value: 'ARSENAL', label: 'Arsenal' },
    { value: 'CHELSEA', label: 'Chelsea' },
    { value: 'LIVERPOOL', label: 'Liverpool' },
    { value: 'MANCHESTER_CITY', label: 'Manchester City' },
    { value: 'MANCHESTER_UNITED', label: 'Manchester United' },
    { value: 'TOTTENHAM', label: 'Tottenham' }
  ],
  primeiraLiga: [
    { value: 'ALL', label: 'Todos' },
    { value: 'BENFICA', label: 'Benfica' },
    { value: 'PORTO', label: 'Porto' },
    { value: 'SPORTING', label: 'Sporting' },
    { value: 'BRAGA', label: 'Braga' }
  ],
  serieA: [
    { value: 'ALL', label: 'Todos' },
    { value: 'AC_MILAN', label: 'AC Milan' },
    { value: 'INTER_MILAN', label: 'Inter de Milão' },
    { value: 'JUVENTUS', label: 'Juventus' },
    { value: 'NAPOLI', label: 'Napoli' },
    { value: 'ROMA', label: 'Roma' },
    { value: 'LAZIO', label: 'Lazio' },
    { value: 'ATALANTA', label: 'Atalanta' },
    { value: 'FIORENTINA', label: 'Fiorentina' }
  ],
  international: [
    { value: 'ALL', label: 'Todos' },
    { value: 'MLS', label: 'MLS (EUA)' },
    { value: 'ARABE', label: 'Liga Árabe' },
    { value: 'ARGENTINO', label: 'Liga Argentina' },
    { value: 'HOLANDES', label: 'Eredivisie' },
    { value: 'MEXICANO', label: 'Liga MX' },
    { value: 'CHILENO', label: 'Primera División Chile' }
  ]
};

// =================================================================================
// ||  2. HOOKS CUSTOMIZADOS                                                      ||
// =================================================================================

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useImageLoader = (src) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      setError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    const img = new Image();
    
    img.onload = () => {
      setLoading(false);
      setError(false);
    };
    
    img.onerror = () => {
      setLoading(false);
      setError(true);
    };
    
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loading, error };
};

// =================================================================================
// ||  3. COMPONENTES UI REUTILIZÁVEIS                                            ||
// =================================================================================

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-500',
    ghost: 'hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error) => {
      console.error('Error caught by boundary:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  if (hasError) {
    return fallback || (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Algo deu errado</h2>
        <p className="text-gray-600 mb-4">Ocorreu um erro inesperado. Tente recarregar a página.</p>
        <Button onClick={() => window.location.reload()}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Recarregar Página
        </Button>
      </div>
    );
  }

  return children;
};

const OptimizedImage = ({ src, alt, className = '', onError, ...props }) => {
  const { loading, error } = useImageLoader(src);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`} {...props}>
        <div className="text-center p-4">
          <ImageOff className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Imagem não disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
        onError={onError}
        {...props}
      />
    </div>
  );
};

const ProductSearch = ({ searchTerm, onSearchChange, placeholder = "Buscar produtos..." }) => {
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems }) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
      <div className="text-sm text-gray-700">
        Mostrando <span className="font-medium">{startItem}</span> a{' '}
        <span className="font-medium">{endItem}</span> de{' '}
        <span className="font-medium">{totalItems}</span> produtos
      </div>
      
      <div className="flex items-center space-x-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-1 text-gray-500">
                <MoreHorizontal className="w-4 h-4" />
              </span>
            ) : (
              <Button
                variant={currentPage === page ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onPageChange(page)}
                className="min-w-[2.5rem]"
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// =================================================================================
// ||  4. COMPONENTE DE SEÇÃO DE PRODUTOS                                         ||
// =================================================================================

const ProductSection = ({ 
  title, 
  products, 
  filterOptions, 
  filterKey, 
  searchTerm,
  icon: Icon 
}) => {
  const [filter, setFilter] = useLocalStorage(`filter_${filterKey}`, 'ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Aplicar filtro de categoria
    if (filter !== 'ALL') {
      filtered = filtered.filter(product => {
        if (filterKey === 'america') return product.country === filter;
        if (filterKey === 'asia') return product.team === filter;
        if (filterKey === 'bundesliga') return product.team === filter;
        if (filterKey === 'brasileirao') return product.team === filter;
        if (filterKey === 'premierLeague') return product.team === filter;
        if (filterKey === 'primeiraLiga') return product.team === filter;
        if (filterKey === 'serieA') return product.team === filter;
        if (filterKey === 'international') return product.championship === filter;
        return true;
      });
    }

    // Aplicar busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [products, filter, searchTerm, filterKey]);

  // Paginação
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset página quando filtro muda
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchTerm]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleWhatsAppOrder = (product) => {
    const message = `Olá! Gostaria de fazer um pedido da camisa: ${product.name}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            {Icon && <Icon className="w-8 h-8 text-blue-600 mr-3" />}
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          </div>
          
          {/* Filtro */}
          {filterOptions && (
            <div className="max-w-xs mx-auto">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Resultados da busca */}
        {searchTerm && (
          <div className="text-center mb-8">
            <p className="text-lg text-blue-600 font-medium">
              {filteredProducts.length} resultado(s) encontrado(s) em {title}
            </p>
          </div>
        )}

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((product, index) => (
            <div
              key={`${filterKey}-${index}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-w-3 aspect-h-4">
                <OptimizedImage
                  src={product.img}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                {product.country && (
                  <p className="text-sm text-gray-600 mb-3">País: {product.country}</p>
                )}
                {product.team && (
                  <p className="text-sm text-gray-600 mb-3">Time: {product.team}</p>
                )}
                {product.championship && (
                  <p className="text-sm text-gray-600 mb-3">Campeonato: {product.championship}</p>
                )}
                <Button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full"
                >
                  Pedir Agora
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Paginação */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredProducts.length}
        />

        {/* Modal do produto */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <OptimizedImage
                  src={selectedProduct.img}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                  aria-label="Fechar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {selectedProduct.name}
                </h3>
                <div className="space-y-2 mb-6">
                  {selectedProduct.country && (
                    <p className="text-gray-600">
                      <span className="font-medium">País:</span> {selectedProduct.country}
                    </p>
                  )}
                  {selectedProduct.team && (
                    <p className="text-gray-600">
                      <span className="font-medium">Time:</span> {selectedProduct.team}
                    </p>
                  )}
                  {selectedProduct.championship && (
                    <p className="text-gray-600">
                      <span className="font-medium">Campeonato:</span> {selectedProduct.championship}
                    </p>
                  )}
                </div>
                <Button
                  onClick={() => handleWhatsAppOrder(selectedProduct)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Pedir via WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// =================================================================================
// ||  5. COMPONENTE PRINCIPAL DA APLICAÇÃO                                       ||
// =================================================================================

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Home className="w-8 h-8 text-blue-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900">SportStyle Store</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              SportStyle Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              As melhores camisas esportivas do mundo em um só lugar
            </p>
            
            {/* Busca Global */}
            <ProductSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Buscar camisas por nome, time ou país..."
            />
          </div>
        </section>

        {/* Seções de Produtos */}
        <ProductSection
          title="Seleções Africanas 🌍"
          products={SHIRT_DATA.africaShirts}
          searchTerm={debouncedSearchTerm}
          filterKey="africa"
        />

        <ProductSection
          title="Seleções das Américas 🌎"
          products={SHIRT_DATA.americaShirts}
          filterOptions={FILTER_OPTIONS.america}
          searchTerm={debouncedSearchTerm}
          filterKey="america"
        />

        <ProductSection
          title="Seleções Asiáticas 🌏"
          products={SHIRT_DATA.asiaShirts}
          filterOptions={FILTER_OPTIONS.asia}
          searchTerm={debouncedSearchTerm}
          filterKey="asia"
        />

        <ProductSection
          title="Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿"
          products={SHIRT_DATA.premierLeagueShirts}
          filterOptions={FILTER_OPTIONS.premierLeague}
          searchTerm={debouncedSearchTerm}
          filterKey="premierLeague"
        />

        <ProductSection
          title="Primeira Liga Portugal 🇵🇹"
          products={SHIRT_DATA.primeiraLigaShirts}
          filterOptions={FILTER_OPTIONS.primeiraLiga}
          searchTerm={debouncedSearchTerm}
          filterKey="primeiraLiga"
        />

        <ProductSection
          title="Série A da Itália 🇮🇹"
          products={SHIRT_DATA.serieAShirts}
          filterOptions={FILTER_OPTIONS.serieA}
          searchTerm={debouncedSearchTerm}
          filterKey="serieA"
        />

        <ProductSection
          title="Bundesliga 🇩🇪"
          products={SHIRT_DATA.bundesligaShirts}
          filterOptions={FILTER_OPTIONS.bundesliga}
          searchTerm={debouncedSearchTerm}
          filterKey="bundesliga"
        />

        <ProductSection
          title="Brasileirão 🇧🇷"
          products={SHIRT_DATA.brasileiroShirts}
          filterOptions={FILTER_OPTIONS.brasileirao}
          searchTerm={debouncedSearchTerm}
          filterKey="brasileirao"
        />

        <ProductSection
          title="Campeonatos Internacionais 🌐"
          products={SHIRT_DATA.internationalShirts}
          filterOptions={FILTER_OPTIONS.international}
          searchTerm={debouncedSearchTerm}
          filterKey="international"
        />

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold">SportStyle Store</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Sua loja especializada em camisas esportivas de todo o mundo
              </p>
              <div className="border-t border-gray-800 pt-6">
                <p className="text-gray-500">
                  © 2024 SportStyle Store. Todos os direitos reservados.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
