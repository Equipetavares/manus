import React, { useState, useEffect, useRef, useMemo } from 'react';

// =================================================================================
// ||  1. FONTES DE DADOS BRUTOS (RAW DATA SOURCES)                               ||
// ||  -------------------------------------------------------------------------  ||
// ||  Cada array contém apenas os dados puros das camisas para cada categoria.   ||
// ||  Isto isola os dados, tornando a sua gestão e expansão mais seguras.         ||
// =================================================================================

const rawData = {
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
    americaShirts: [
        { name: "Argentina Ed. Especial", img: "https://i.ibb.co/7xyKPqPJ/2025052817162713.jpg", country: 'AR' },
        { name: "Argentina Adidas", img: "https://i.ibb.co/R19yL55/Argentina-Adidas.jpg", country: 'AR' },
        { name: "Argentina Away", img: "https://i.ibb.co/PzfB8sY1/Argentina-Away.jpg", country: 'AR' },
        { name: "Argentina Black Long", img: "https://i.ibb.co/fYSc3rpM/Argentina-Black-Long.jpg", country: 'AR' },
        { name: "Argentina Black", img: "https://i.ibb.co/s95xyHV1/Argentina-Black.jpg", country: 'AR' },
        { name: "Argentina Feminina", img: "https://i.ibb.co/HL1d7JG1/Argentina-Feminina-1.jpg", country: 'AR' },
        { name: "Argentina Goleiro", img: "https://i.ibb.co/d0N8x1bT/Argentina-Goleiro.jpg", country: 'AR' },
        { name: "Argentina Home Long", img: "https://i.ibb.co/0RM41fbj/Argentina-Home-Long.jpg", country: 'AR' },
        { name: "Argentina Home", img: "https://i.ibb.co/5g5f6X8K/Argentina-Home.jpg", country: 'AR' },
        { name: "Argentina Treino", img: "https://i.ibb.co/SD3mPGFG/Argentina-Treino.jpg", country: 'AR' },
        { name: "Brasil Retrô 1", img: "https://i.ibb.co/8DvfkffP/5.jpg", country: 'BR' },
        { name: "Brasil Concept 1", img: "https://i.ibb.co/dwfjFCkF/202504111319476-2.jpg", country: 'BR' },
        { name: "Brasil Treino 1", img: "https://i.ibb.co/WN21sCc6/202505121717535-1.jpg", country: 'BR' },
        { name: "Brasil Concept 2", img: "https://i.ibb.co/m5Nq5CBV/2025032017023420-3.jpg", country: 'BR' },
        { name: "Brasil Ed. Especial 1", img: "https://i.ibb.co/9k72B3wL/2025033013445879-4.jpg", country: 'BR' },
        { name: "Brasil Concept 3", img: "https://i.ibb.co/spNYhsXP/2025041113195952-1.jpg", country: 'BR' },
        { name: "Brasil Treino 2", img: "https://i.ibb.co/wNGVjf88/2025051217174462-1.jpg", country: 'BR' },
        { name: "Brasil Concept 4", img: "https://i.ibb.co/fdFCMxmm/2025051719082940.jpg", country: 'BR' },
        { name: "Brasil Home 1", img: "https://i.ibb.co/qL45wFNL/2025053008591826.jpg", country: 'BR' },
        { name: "Brasil Home 2", img: "https://i.ibb.co/ZpcNHGTK/2025053008592639.jpg", country: 'BR' },
        { name: "Brasil Away 1", img: "https://i.ibb.co/5g4rTCsY/2025053008593333.jpg", country: 'BR' },
        { name: "Brasil Ed. Especial 2", img: "https://i.ibb.co/S4MNzKqk/2025053008594321.jpg", country: 'BR' },
        { name: "Brasil Home 3", img: "https://i.ibb.co/qF5dxRV6/2025053009101932.jpg", country: 'BR' },
        { name: "Brasil Away 2", img: "https://i.ibb.co/wZ68jnst/2025053009102989.jpg", country: 'BR' },
        { name: "Brasil Third", img: "https://i.ibb.co/3YzwxCc4/2025053009103811.jpg", country: 'BR' },
        { name: "Brasil Goleiro", img: "https://i.ibb.co/4ZpNcLf1/2025053009104831.jpg", country: 'BR' },
        { name: "Brasil Treino 3", img: "https://i.ibb.co/vvH9z8K7/2025053009105793.jpg", country: 'BR' },
        { name: "Brasil Concept 5", img: "https://i.ibb.co/Jw6NTLqk/2025071213190675.jpg", country: 'BR' },
        { name: "Brasil Away Oficial", img: "https://i.ibb.co/PsJYsZhb/Brasil-Away.jpg", country: 'BR' },
        { name: "Brasil Especial Preta", img: "https://i.ibb.co/mLfcBpn/Brasil-Edi-o-Especial-1.jpg", country: 'BR' },
        { name: "Brasil Especial Grafite", img: "https://i.ibb.co/GQ077Nh8/Brasil-Edi-o-Especial-2.jpg", country: 'BR' },
        { name: "Brasil Especial Branca", img: "https://i.ibb.co/H3x14Nm/Brasil-Edi-o-Especial-3.jpg", country: 'BR' },
        { name: "Brasil Especial Azul", img: "https://i.ibb.co/VcwLhZfC/Brasil-Edi-o-Especial-4.jpg", country: 'BR' },
        { name: "Brasil Especial Amarela", img: "https://i.ibb.co/Swtf1nhk/Brasil-Edi-o-Especial-5.jpg", country: 'BR' },
        { name: "Brasil Especial Verde", img: "https://i.ibb.co/HfVTG9nP/Brasil-Edi-o-Especial-6.jpg", country: 'BR' },
        { name: "Brasil Especial Roxo", img: "https://i.ibb.co/hJzh082T/Brasil-Edi-o-Especial-7.jpg", country: 'BR' },
        { name: "Brasil Especial 8", img: "https://i.ibb.co/C3Nqc94q/Brasil-Edi-o-Especial-8.jpg", country: 'BR' },
        { name: "Brasil Especial Dourada", img: "https://i.ibb.co/gbCz4S6q/Brasil-Edi-o-Especial.jpg", country: 'BR' },
        { name: "Brasil Home 25/26", img: "https://i.ibb.co/TBm6jcky/Brasil-Home-25-26-1.jpg", country: 'BR' },
        { name: "Brasil Home 25/26 B", img: "https://i.ibb.co/HTQXKNM7/Brasil-Home-25-26.jpg", country: 'BR' },
        { name: "Brasil Home Oficial", img: "https://i.ibb.co/vxvvgP8Z/Brasil-Home.jpg", country: 'BR' },
        { name: "Brasil Concept CBF", img: "https://i.ibb.co/v6Vgk8vx/Brasil.jpg", country: 'BR' },
        { name: "Brasil Concept 2022", img: "https://i.ibb.co/mFV1B5Sx/Brazil-2022-Concept-Jersey-42678.jpg", country: 'BR' },
        { name: "Brasil Polo Verde", img: "https://i.ibb.co/LTrCYXk/Brazil-202324-Light-Green-POLO-Jersey-52345.jpg", country: 'BR' },
        { name: "Brasil Comemorativa Pelé 1", img: "https://i.ibb.co/wF1y3Snp/Brazil-PELE-Commemorative-jersey-51422.jpg", country: 'BR' },
        { name: "Brasil Comemorativa Pelé 2", img: "https://i.ibb.co/wNnX3nJg/Brazil-PELE-Commemorative-jersey-51432.jpg", country: 'BR' },
        { name: "Canadá Ed. Especial", img: "https://i.ibb.co/gM7YM1PR/Canada-202324-Special-Edition-Jersey.jpg", country: 'CA' },
        { name: "Chile Adidas", img: "https://i.ibb.co/bgkjS2b4/chile-adidas.jpg", country: 'CL' },
        { name: "Chile Home 1", img: "https://i.ibb.co/RpwL6dv3/Chile-I-1.jpg", country: 'CL' },
        { name: "Chile Home 2", img: "https://i.ibb.co/bjdDDdwW/Chile-I.jpg", country: 'CL' },
        { name: "Colômbia Concept", img: "https://i.ibb.co/pv86cGP4/2025020609354936.jpg", country: 'CO' },
        { name: "Colômbia Feminina 1", img: "https://i.ibb.co/Kjgty2vQ/Col-mbia-Feminina-1.jpg", country: 'CO' },
        { name: "Colômbia Feminina 2", img: "https://i.ibb.co/DH8xJvNR/Col-mbia-Feminina-2.jpg", country: 'CO' },
        { name: "Colômbia Feminina 3", img: "https://i.ibb.co/8L1LQDxN/Col-mbia-Feminina-3.jpg", country: 'CO' },
        { name: "Colômbia Feminina 4", img: "https://i.ibb.co/dwGK3ZNN/Col-mbia-Feminina-4.jpg", country: 'CO' },
        { name: "Colômbia Feminina 5", img: "https://i.ibb.co/fG8xFYH6/Col-mbia-Feminina.jpg", country: 'CO' },
        { name: "Colômbia Home 1", img: "https://i.ibb.co/hRFFVhMn/Col-mbia-I-1.jpg", country: 'CO' },
        { name: "Colômbia Home 2", img: "https://i.ibb.co/gbffsHHf/Col-mbia-I.jpg", country: 'CO' },
        { name: "Colômbia Away 1", img: "https://i.ibb.co/jPJcyWyM/Col-mbia-II-1.jpg", country: 'CO' },
        { name: "Colômbia Away 2", img: "https://i.ibb.co/qSykjXK/Col-mbia-II.jpg", country: 'CO' },
        { name: "Colômbia Especial 1", img: "https://i.ibb.co/39xNJ3Zf/Col-mbia-1.jpg", country: 'CO' },
        { name: "Colômbia Especial 2", img: "https://i.ibb.co/G3NSwmGm/Col-mbia-2.jpg", country: 'CO' },
        { name: "Colômbia Especial 3", img: "https://i.ibb.co/7Jf7pg9c/Col-mbia.jpg", country: 'CO' },
        { name: "El Salvador Home", img: "https://i.ibb.co/Cs7rYtW9/El-Salvador.jpg", country: 'SV' },
        { name: "Equador Home 1", img: "https://i.ibb.co/qYcKCrGT/Equador-I-1.jpg", country: 'EC' },
        { name: "Equador Home 2", img: "https://i.ibb.co/qMLk4210/Equador-I.jpg", country: 'EC' },
        { name: "Equador Away 1", img: "https://i.ibb.co/39bHqwny/Equador-II-1.jpg", country: 'EC' },
        { name: "Equador Away 2", img: "https://i.ibb.co/CKRq5sTF/Equador-II.jpg", country: 'EC' },
        { name: "Equador Especial 1", img: "https://i.ibb.co/cSns6GNg/equador.jpg", country: 'EC' },
        { name: "Equador Especial 2", img: "https://i.ibb.co/ytqKNhT/equador.jpg", country: 'EC' },
        { name: "Estados Unidos Concept 1", img: "https://i.ibb.co/67JTfb8G/2025061311402874.jpg", country: 'US' },
        { name: "Estados Unidos Concept 2", img: "https://i.ibb.co/Y4Nb386M/2025061311403739.jpg", country: 'US' },
        { name: "Estados Unidos Home 1", img: "https://i.ibb.co/mVWw3TvK/Estados-Unidos-I-1.jpg", country: 'US' },
        { name: "Estados Unidos Home 2", img: "https://i.ibb.co/VchNRhkg/Estados-Unidos-I.jpg", country: 'US' },
        { name: "Estados Unidos Away 1", img: "https://i.ibb.co/tTXfw7yB/Estados-Unidos-II-1.jpg", country: 'US' },
        { name: "Estados Unidos Away 2", img: "https://i.ibb.co/q3tw8dxB/Estados-Unidos-II.jpg", country: 'US' },
        { name: "Jamaica Especial 1", img: "https://i.ibb.co/8D24mR4P/Jamaica-1.jpg", country: 'JM' },
        { name: "Jamaica Especial 2", img: "https://i.ibb.co/hRhz6ksv/Jamaica.jpg", country: 'JM' },
        { name: "Jamaica Especial 3", img: "https://i.ibb.co/C3nhcpGg/Jamaica-1.jpg", country: 'JM' },
        { name: "Jamaica Especial 4", img: "https://i.ibb.co/XZp6gCdk/Jamaica-2.jpg", country: 'JM' },
        { name: "Jamaica Especial 5", img: "https://i.ibb.co/zW46pSVR/Jamaica-3.jpg", country: 'JM' },
        { name: "Jamaica Especial 6", img: "https://i.ibb.co/zhx2LS00/Jamaica-4.jpg", country: 'JM' },
        { name: "Jamaica Especial 7", img: "https://i.ibb.co/0R92FGS4/Jamaica-5.jpg", country: 'JM' },
        { name: "Jamaica Especial 8", img: "https://i.ibb.co/Xkt1Txyf/Jamaica.jpg", country: 'JM' },
        { name: "México Especial 1", img: "https://i.ibb.co/3mZhJLxC/Mexico-1.jpg", country: 'MX' },
        { name: "México Especial 2", img: "https://i.ibb.co/PsNS0r94/M-xico-1.jpg", country: 'MX' },
        { name: "México Especial 3", img: "https://i.ibb.co/W453Y48C/M-xico-2.jpg", country: 'MX' },
        { name: "México Especial 4", img: "https://i.ibb.co/fKXxT9d/M-xico-3.jpg", country: 'MX' },
        { name: "México Especial 5", img: "https://i.ibb.co/xqckCdGF/M-xico-4.jpg", country: 'MX' },
        { name: "México Especial 6", img: "https://i.ibb.co/nqW3RszW/M-xico-5.jpg", country: 'MX' },
        { name: "México Especial 7", img: "https://i.ibb.co/KjRtm33N/Mexico.jpg", country: 'MX' },
        { name: "México Especial 8", img: "https://i.ibb.co/ynzwcqCh/M-xico.jpg", country: 'MX' },
        { name: "Panamá Home", img: "https://i.ibb.co/1tCZQzdc/panam.jpg", country: 'PA' },
        { name: "Panamá Away", img: "https://i.ibb.co/ks1VMndR/panam.jpg", country: 'PA' },
        { name: "Panamá Especial", img: "https://i.ibb.co/gnV1t2g/Panam.jpg", country: 'PA' },
        { name: "Uruguai Home 1", img: "https://i.ibb.co/6RtGShgR/Uruguai-I-1.jpg", country: 'UY' },
        { name: "Uruguai Home 2", img: "https://i.ibb.co/Ld5ftKWB/Uruguai-I.jpg", country: 'UY' },
        { name: "Uruguai Away 1", img: "https://i.ibb.co/7tKYVB6P/Uruguai-II-1.jpg", country: 'UY' },
        { name: "Uruguai Away 2", img: "https://i.ibb.co/xqdhRVjd/Uruguai-II.jpg", country: 'UY' }
    ],
    asiaShirts: [
        { name: "Arábia Saudita Away 2022", team: 'ARABIA_SAUDITA', img: "https://i.ibb.co/jBVRnKZ/Saudi-Arabia-2022-World-Cup-Away-Jersey-47614.jpg" },
        { name: "Arábia Saudita Away 23-24", team: 'ARABIA_SAUDITA', img: "https://i.ibb.co/5WFK8Khb/Saudi-Arabia-202324-Away-Boutique-Jersey-59691.jpg" },
        { name: "Austrália I", team: 'AUSTRALIA', img: "https://i.ibb.co/pBr3zkrx/Austr-lia-I-1.jpg" },
        { name: "Austrália I 2", team: 'AUSTRALIA', img: "https://i.ibb.co/gZTwqvkD/Austr-lia-I.jpg" },
        { name: "Coreia do Sul Special Edition", team: 'COREIA_DO_SUL', img: "https://i.ibb.co/27kHTm1w/2025051719521293.jpg" },
        { name: "Coreia do Sul Especial 1", team: 'COREIA_DO_SUL', img: "https://i.ibb.co/5h7rdvxt/Coreia-do-Sul-Especial-1.jpg" },
        { name: "Coreia do Sul Especial 2", team: 'COREIA_DO_SUL', img: "https://i.ibb.co/yFNWSqXY/Coreia-do-Sul-Especial-2.jpg" },
        { name: "Coreia do Sul Especial 3", team: 'COREIA_DO_SUL', img: "https://i.ibb.co/N6yPbsM2/Coreia-do-Sul-Especial-3.jpg" },
        { name: "Coreia do Sul Especial", team: 'COREIA_DO_SUL', img: "https://i.ibb.co/rGmnWfGW/Coreia-do-Sul-Especial.jpg" },
        { name: "Coreia do Sul I", team: 'COREIA_DO_SUL', img: "https://i.ibb.co/bRFT5Mtg/Coreia-do-Sul-I.jpg" },
        { name: "Coreia do Sul I 2", team: 'COREIA_DO_SUL', img: "https://i.ibb.co/mC4Syyzq/Cor-ia-do-Sul-I.jpg" },
        { name: "Coreia do Sul II", team: 'COREIA_DO_SUL', img: "https://i.ibb.co/XrTWCKQg/Coreia-do-Sul-II-1.jpg" },
        { name: "Coreia do Sul II 2", team: 'COREIA_DO_SUL', img: "https://i.ibb.co/7d9kv6GZ/Coreia-do-Sul-II.jpg" },
        { name: "Japão Especial 1", team: 'JAPAO', img: "https://i.ibb.co/Cs1pRpVV/9a05076ef297f0d52c89d698af2145f6-3.jpg" },
        { name: "Japão Especial 2", team: 'JAPAO', img: "https://i.ibb.co/bjVsBKrp/19c7fa21db4f18bbb22a5ed40e92fc27.jpg" },
        { name: "Japão Special Edition 1", team: 'JAPAO', img: "https://i.ibb.co/vx666LH1/2024022814342031.jpg" },
        { name: "Japão Special Edition 2", team: 'JAPAO', img: "https://i.ibb.co/s9hGg6PP/2024060822115272.jpg" },
        { name: "Japão Special Edition 3", team: 'JAPAO', img: "https://i.ibb.co/27BVpCgr/2024061312251958.jpg" },
        { name: "Japão Special Edition 4", team: 'JAPAO', img: "https://i.ibb.co/Kzf97MLP/2024062522162074.jpg" },
        { name: "Japão Special Edition 5", team: 'JAPAO', img: "https://i.ibb.co/C3KVwr5n/2024070710294218.jpg" },
        { name: "Japão Special Edition 6", team: 'JAPAO', img: "https://i.ibb.co/35jB13jK/2024070713120488.jpg" },
        { name: "Japão Special Edition 7", team: 'JAPAO', img: "https://i.ibb.co/W4rx2f6m/2024070913402039.jpg" },
        { name: "Japão Special Edition 8", team: 'JAPAO', img: "https://i.ibb.co/BHY5KcdT/2024071921175577.jpg" },
        { name: "Japão Special Edition 9", team: 'JAPAO', img: "https://i.ibb.co/spJfh9pm/2025032918320093.jpg" },
        { name: "Japão Special Edition 10", team: 'JAPAO', img: "https://i.ibb.co/ymLCW88q/2025041913410470.jpg" },
        { name: "Japão Special Edition 11", team: 'JAPAO', img: "https://i.ibb.co/vCWS969L/2025041913411288.jpg" },
        { name: "Japão Special Edition 12", team: 'JAPAO', img: "https://i.ibb.co/XfLL2B4L/20241205151349100.jpg" },
        { name: "Japão 1", team: 'JAPAO', img: "https://i.ibb.co/PvNg00ts/Jap-o-1.jpg" },
        { name: "Japão 3", team: 'JAPAO', img: "https://i.ibb.co/qF1BRX1v/Jap-o-3.jpg" },
        { name: "Japão 4", team: 'JAPAO', img: "https://i.ibb.co/fGYg3zv6/Jap-o-4.jpg" },
        { name: "Japão 5", team: 'JAPAO', img: "https://i.ibb.co/mF6JzHk6/Jap-o-5.jpg" },
        { name: "Japão 6", team: 'JAPAO', img: "https://i.ibb.co/SbDk3hr/Jap-o-6.jpg" },
        { name: "Japão 7", team: 'JAPAO', img: "https://i.ibb.co/d4d88LBb/Jap-o-7.jpg" },
        { name: "Japão 8", team: 'JAPAO', img: "https://i.ibb.co/nN0xHBJM/Jap-o-8.jpg" },
        { name: "Japão 9", team: 'JAPAO', img: "https://i.ibb.co/5WmCBDHm/Jap-o-9.jpg" },
        { name: "Japão 10", team: 'JAPAO', img: "https://i.ibb.co/Qj1KFv5b/Jap-o-10.jpg" },
        { name: "Japão 11", team: 'JAPAO', img: "https://i.ibb.co/vCwcNNRZ/Jap-o-11.jpg" },
        { name: "Japão 12", team: 'JAPAO', img: "https://i.ibb.co/v4Mj5v23/Jap-o-12.jpg" },
        { name: "Japão 13", team: 'JAPAO', img: "https://i.ibb.co/2qPCNqYF/Jap-o-13.jpg" },
        { name: "Japão 14", team: 'JAPAO', img: "https://i.ibb.co/Qm6xBzjR/Jap-o-14.jpg" },
        { name: "Japão 15", team: 'JAPAO', img: "https://i.ibb.co/6Xf6Qs4H/Jap-o-15.jpg" },
        { name: "Japão 16", team: 'JAPAO', img: "https://i.ibb.co/7Xz8Qm2J/Jap-o-16.jpg" },
        { name: "Japão 17", team: 'JAPAO', img: "https://i.ibb.co/Qm6xBzjR/Jap-o-17.jpg" },
        { name: "Japão 18", team: 'JAPAO', img: "https://i.ibb.co/6Xf6Qs4H/Jap-o-18.jpg" },
        { name: "Japão 19", team: 'JAPAO', img: "https://i.ibb.co/7Xz8Qm2J/Jap-o-19.jpg" },
        { name: "Japão 20", team: 'JAPAO', img: "https://i.ibb.co/Qm6xBzjR/Jap-o-20.jpg" },
        { name: "Japão Samurai Blue", team: 'JAPAO', img: "https://i.ibb.co/6Xf6Qs4H/Japan-Samurai-Blue.jpg" },
        { name: "Japão Away", team: 'JAPAO', img: "https://i.ibb.co/7Xz8Qm2J/Japan-Away.jpg" },
        { name: "Japão Third", team: 'JAPAO', img: "https://i.ibb.co/Qm6xBzjR/Japan-Third.jpg" }
    ],
    bundesligaShirts: [
        { name: "Bayern München Home", team: 'BAYERN', img: "https://via.placeholder.com/300x400/FF0000/FFFFFF?text=Bayern+Home" },
        { name: "Bayern München Away", team: 'BAYERN', img: "https://via.placeholder.com/300x400/FFFFFF/FF0000?text=Bayern+Away" },
        { name: "Bayern München Third", team: 'BAYERN', img: "https://via.placeholder.com/300x400/000000/FFFFFF?text=Bayern+Third" },
        { name: "Borussia Dortmund Home", team: 'DORTMUND', img: "https://via.placeholder.com/300x400/FFFF00/000000?text=Dortmund+Home" },
        { name: "Borussia Dortmund Away", team: 'DORTMUND', img: "https://via.placeholder.com/300x400/000000/FFFF00?text=Dortmund+Away" },
        { name: "Borussia Dortmund Third", team: 'DORTMUND', img: "https://via.placeholder.com/300x400/FFFFFF/000000?text=Dortmund+Third" }
    ],
    brasileiroShirts: [
        // Flamengo
        { name: "Flamengo Special Edition 1", team: 'FLAMENGO', img: "https://i.ibb.co/2YKjQhLF/2024060920164157.jpg" },
        { name: "Flamengo Special Edition 2", team: 'FLAMENGO', img: "https://i.ibb.co/cKtmgTcW/2024060920165391.jpg" },
        { name: "Flamengo Special Edition 3", team: 'FLAMENGO', img: "https://i.ibb.co/QvhM844M/2024120513560965.jpg" },
        { name: "Flamengo Special Edition 4", team: 'FLAMENGO', img: "https://i.ibb.co/9kYDWPC7/2025022306285283.jpg" },
        { name: "Flamengo Special Edition 5", team: 'FLAMENGO', img: "https://i.ibb.co/Hp36FLvg/2025022611444177.jpg" },
        { name: "Flamengo Special Edition 6", team: 'FLAMENGO', img: "https://i.ibb.co/1tnQyGSy/2025041113322568.jpg" },
        { name: "Flamengo Special Edition 7", team: 'FLAMENGO', img: "https://i.ibb.co/1YjnSvjj/2025051016413350.jpg" },
        { name: "Flamengo Feminina 1", team: 'FLAMENGO', img: "https://i.ibb.co/JFwMyXnF/Flamengo-Feminina-1.jpg" },
        { name: "Flamengo Feminina 2", team: 'FLAMENGO', img: "https://i.ibb.co/vCwGhk8y/Flamengo-Feminina-2.jpg" },
        { name: "Flamengo Feminina 3", team: 'FLAMENGO', img: "https://i.ibb.co/6JfxtDhk/Flamengo-Feminina-3.jpg" },
        { name: "Flamengo Feminina 4", team: 'FLAMENGO', img: "https://i.ibb.co/rGfX3rdG/Flamengo-Feminina-4.jpg" },
        { name: "Flamengo Feminina 5", team: 'FLAMENGO', img: "https://i.ibb.co/ynXC29rc/Flamengo-Feminina-5.jpg" },
        { name: "Flamengo Feminina 6", team: 'FLAMENGO', img: "https://i.ibb.co/27Ts0Gdx/Flamengo-Feminina-6.jpg" },
        { name: "Flamengo I 23-24", team: 'FLAMENGO', img: "https://i.ibb.co/2Y6Xm4NQ/Flamengo-I-23-24-1.jpg" },
        { name: "Flamengo I 24-25", team: 'FLAMENGO', img: "https://i.ibb.co/NgSSgQpg/Flamengo-I-24-25-1.jpg" },
        { name: "Flamengo II 23-24", team: 'FLAMENGO', img: "https://i.ibb.co/F42sF8vQ/Flamengo-II-23-24-1.jpg" },
        { name: "Flamengo II 24-25", team: 'FLAMENGO', img: "https://i.ibb.co/3mmTg1Fz/Flamengo-II-24-25-1.jpg" },
        { name: "Flamengo Third 23-24", team: 'FLAMENGO', img: "https://i.ibb.co/7JCTGgcz/Flamengo-Third-23-24-1.jpg" },
        { name: "Flamengo Third 24-25", team: 'FLAMENGO', img: "https://i.ibb.co/0yKnpT8Q/Flamengo-Third-24-25-1.jpg" },
        { name: "Flamengo Goleiro", team: 'FLAMENGO', img: "https://i.ibb.co/rR4d5krp/Flamengo-Goleiro-1.jpg" },
        { name: "Flamengo Treino", team: 'FLAMENGO', img: "https://i.ibb.co/cK44Rg4G/Flamengo-Treino-1.jpg" },
        
        // Palmeiras
        { name: "Palmeiras Special Edition", team: 'PALMEIRAS', img: "https://i.ibb.co/Qj8SsfJt/2025022815421137-1.jpg" },
        { name: "Palmeiras Ed. Especial", team: 'PALMEIRAS', img: "https://i.ibb.co/Kx9p0n8J/Palmeiras-Edi-o-Especial-1.jpg" },
        { name: "Palmeiras Feminina 1", team: 'PALMEIRAS', img: "https://i.ibb.co/Zz74B4jF/Palmeiras-Feminina-1.jpg" },
        { name: "Palmeiras Feminina 2", team: 'PALMEIRAS', img: "https://i.ibb.co/wFjhFF19/Palmeiras-Feminina-2.jpg" },
        { name: "Palmeiras Feminina 3", team: 'PALMEIRAS', img: "https://i.ibb.co/j9kHw6wt/Palmeiras-Feminina-3.jpg" },
        { name: "Palmeiras Goleiro 1", team: 'PALMEIRAS', img: "https://i.ibb.co/kstZgm0W/Palmeiras-Goleiro-1.jpg" },
        { name: "Palmeiras Goleiro 2", team: 'PALMEIRAS', img: "https://i.ibb.co/6Rwm0rBF/Palmeiras-Goleiro-2.jpg" },
        { name: "Palmeiras I 23-24", team: 'PALMEIRAS', img: "https://i.ibb.co/27VyTSty/Palmeiras-I-23-24-1.jpg" },
        { name: "Palmeiras I 24-25", team: 'PALMEIRAS', img: "https://i.ibb.co/dsHfH8v8/Palmeiras-I-24-25-1.jpg" },
        { name: "Palmeiras II 23-24", team: 'PALMEIRAS', img: "https://i.ibb.co/8n0G607n/Palmeiras-II-23-24-1.jpg" },
        { name: "Palmeiras II 24-25", team: 'PALMEIRAS', img: "https://i.ibb.co/fLRbp4x/Palmeiras-II-24-25-1.jpg" },
        { name: "Palmeiras Third", team: 'PALMEIRAS', img: "https://i.ibb.co/4wqgkkL2/Palmeiras-Third-1.jpg" },
        { name: "Palmeiras Treino", team: 'PALMEIRAS', img: "https://i.ibb.co/k28q3s4N/Palmeiras-Treino-1.jpg" },
        { name: "Palmeiras White and Green", team: 'PALMEIRAS', img: "https://i.ibb.co/HfqFS9KW/Palmeiras-White-and-Green-1.jpg" },
        
        // Corinthians
        { name: "Corinthians Special Edition 1", team: 'CORINTHIANS', img: "https://i.ibb.co/2YKjQhLF/2024060920164157.jpg" },
        { name: "Corinthians Special Edition 2", team: 'CORINTHIANS', img: "https://i.ibb.co/cKtmgTcW/2024060920165391.jpg" },
        { name: "Corinthians Feminina 1", team: 'CORINTHIANS', img: "https://i.ibb.co/JFwMyXnF/Corinthians-Feminina-1.jpg" },
        { name: "Corinthians Feminina 2", team: 'CORINTHIANS', img: "https://i.ibb.co/vCwGhk8y/Corinthians-Feminina-2.jpg" },
        { name: "Corinthians I 24-25", team: 'CORINTHIANS', img: "https://i.ibb.co/NgSSgQpg/Corinthians-I-24-25-1.jpg" },
        { name: "Corinthians II 24-25", team: 'CORINTHIANS', img: "https://i.ibb.co/F42sF8vQ/Corinthians-II-24-25-1.jpg" },
        { name: "Corinthians Third", team: 'CORINTHIANS', img: "https://i.ibb.co/3mmTg1Fz/Corinthians-Third-1.jpg" },
        
        // Santos
        { name: "Santos Special Edition 1", team: 'SANTOS', img: "https://i.ibb.co/zhhvDy98/2024060920164157-1.jpg" },
        { name: "Santos Special Edition 2", team: 'SANTOS', img: "https://i.ibb.co/cKtmgTcW/2024060920165391-1.jpg" },
        { name: "Santos Special Edition 3", team: 'SANTOS', img: "https://i.ibb.co/QvhM844M/2024120513560965-1.jpg" },
        { name: "Santos Special Edition 4", team: 'SANTOS', img: "https://i.ibb.co/9kYDWPC7/2025022306285283-1.jpg" },
        { name: "Santos Special Edition 5", team: 'SANTOS', img: "https://i.ibb.co/Hp36FLvg/2025022611444177-2.jpg" },
        { name: "Santos Special Edition 6", team: 'SANTOS', img: "https://i.ibb.co/1tnQyGSy/2025041113322568-1.jpg" },
        { name: "Santos Special Edition 7", team: 'SANTOS', img: "https://i.ibb.co/1YjnSvjj/2025051016413350-1.jpg" },
        { name: "Santos Feminina 1", team: 'SANTOS', img: "https://i.ibb.co/JFwMyXnF/Santos-Feminina-1.jpg" },
        { name: "Santos Feminina 2", team: 'SANTOS', img: "https://i.ibb.co/vCwGhk8y/Santos-Feminina-2.jpg" },
        { name: "Santos Feminina 3", team: 'SANTOS', img: "https://i.ibb.co/6JfxtDhk/Santos-Feminina-3.jpg" },
        { name: "Santos Feminina 4", team: 'SANTOS', img: "https://i.ibb.co/rGfX3rdG/Santos-Feminina-4.jpg" },
        { name: "Santos Feminina 5", team: 'SANTOS', img: "https://i.ibb.co/ynXC29rc/Santos-Feminina-5.jpg" },
        { name: "Santos Feminina 6", team: 'SANTOS', img: "https://i.ibb.co/27Ts0Gdx/Santos-Feminina-6.jpg" },
        { name: "Santos Pré-Jogo", team: 'SANTOS', img: "https://i.ibb.co/2Y6Xm4NQ/Santos-Pr-Jogo-1.jpg" },
        { name: "Santos Treino", team: 'SANTOS', img: "https://i.ibb.co/NgSSgQpg/Santos-treino-1.jpg" },
        
        // São Paulo
        { name: "São Paulo Special Edition 1", team: 'SAO_PAULO', img: "https://i.ibb.co/F42sF8vQ/2025022815425155-2.jpg" },
        { name: "São Paulo Special Edition 2", team: 'SAO_PAULO', img: "https://i.ibb.co/3mmTg1Fz/2025022815425155-3.jpg" },
        { name: "São Paulo Feminina 1", team: 'SAO_PAULO', img: "https://i.ibb.co/7JCTGgcz/S-o-Paulo-Feminina-1.jpg" },
        { name: "São Paulo Feminina 2", team: 'SAO_PAULO', img: "https://i.ibb.co/0yKnpT8Q/S-o-Paulo-Feminina-2.jpg" },
        { name: "São Paulo Feminina 3", team: 'SAO_PAULO', img: "https://i.ibb.co/rR4d5krp/S-o-Paulo-Feminina-3.jpg" },
        { name: "São Paulo Feminina 4", team: 'SAO_PAULO', img: "https://i.ibb.co/cK44Rg4G/S-o-Paulo-Feminina-4.jpg" },
        { name: "São Paulo Feminina 5", team: 'SAO_PAULO', img: "https://i.ibb.co/9dnnDcn/S-o-Paulo-Feminina-5.jpg" },
        { name: "São Paulo Feminina 6", team: 'SAO_PAULO', img: "https://i.ibb.co/Xr5qh8QP/S-o-Paulo-Feminina-6.jpg" },
        { name: "São Paulo Feminina 7", team: 'SAO_PAULO', img: "https://i.ibb.co/6RxWfSDK/S-o-Paulo-Feminina-7.jpg" },
        { name: "São Paulo Feminina 8", team: 'SAO_PAULO', img: "https://i.ibb.co/1YTXn8qK/S-o-Paulo-Feminina-8.jpg" },
        { name: "São Paulo Feminina 9", team: 'SAO_PAULO', img: "https://i.ibb.co/KpDbvFRt/S-o-Paulo-Feminina-9.jpg" },
        { name: "São Paulo I 24-25", team: 'SAO_PAULO', img: "https://i.ibb.co/Z1bht5dX/S-o-Paulo-I-24-25-1.jpg" },
        { name: "São Paulo II 24-25", team: 'SAO_PAULO', img: "https://i.ibb.co/Z1FPc2LM/S-o-Paulo-II-24-25-1.jpg" },
        { name: "São Paulo Preta", team: 'SAO_PAULO', img: "https://i.ibb.co/YBVbLMp9/S-o-Paulo-Preta-1.jpg" },
        { name: "São Paulo Regata", team: 'SAO_PAULO', img: "https://i.ibb.co/rgTZxWF/S-o-Paulo-Regata-1.jpg" },
        { name: "São Paulo Treino", team: 'SAO_PAULO', img: "https://i.ibb.co/Vcyp2pWs/S-o-Paulo-Treino-1.jpg" },
        
        // Vasco
        { name: "Vasco Ed. Especial 1", team: 'VASCO', img: "https://i.ibb.co/zTq14Tyr/Vasco-Edi-o-Especial-1.jpg" },
        { name: "Vasco Ed. Especial 2", team: 'VASCO', img: "https://i.ibb.co/rGMzM7nj/Vasco-Edi-o-Especial-2.jpg" },
        { name: "Vasco Ed. Especial 3", team: 'VASCO', img: "https://i.ibb.co/7J89gWmk/Vasco-Edi-o-Especial-3.jpg" },
        { name: "Vasco Ed. Especial 4", team: 'VASCO', img: "https://i.ibb.co/674RN9VN/Vasco-Edi-o-Especial-4.jpg" },
        { name: "Vasco Ed. Especial 5", team: 'VASCO', img: "https://i.ibb.co/B2J8MDJs/Vasco-Edi-o-Especial-5.jpg" },
        { name: "Vasco Ed. Especial 6", team: 'VASCO', img: "https://i.ibb.co/rGm8Qtnc/Vasco-Edi-o-Especial-6.jpg" },
        { name: "Vasco Ed. Especial 7", team: 'VASCO', img: "https://i.ibb.co/jnLKVFt/Vasco-Edi-o-Especial-7.jpg" },
        { name: "Vasco Ed. Especial 8", team: 'VASCO', img: "https://i.ibb.co/4Rm9Cc2t/Vasco-Edi-o-Especial-8.jpg" },
        { name: "Vasco Ed. Especial 9", team: 'VASCO', img: "https://i.ibb.co/WvYfzpvq/Vasco-Edi-o-Especial-9.jpg" },
        { name: "Vasco Ed. Especial 10", team: 'VASCO', img: "https://i.ibb.co/xtSr417J/Vasco-Edi-o-Especial-10.jpg" },
        { name: "Vasco Feminina 1", team: 'VASCO', img: "https://i.ibb.co/Y45w3bg9/Vasco-Feminina-1.jpg" },
        { name: "Vasco Feminina 2", team: 'VASCO', img: "https://i.ibb.co/xS9Yq9ry/Vasco-Feminina-2.jpg" },
        { name: "Vasco Feminina 3", team: 'VASCO', img: "https://i.ibb.co/tprBLysk/Vasco-Feminina-3.jpg" },
        { name: "Vasco Feminina 4", team: 'VASCO', img: "https://i.ibb.co/35kCcCpJ/Vasco-Feminina-4.jpg" },
        { name: "Vasco Feminina 5", team: 'VASCO', img: "https://i.ibb.co/nscTYWMM/Vasco-Feminina-5.jpg" },
        { name: "Vasco Feminina 6", team: 'VASCO', img: "https://i.ibb.co/B2vLDYsw/Vasco-Feminina-6.jpg" },
        { name: "Vasco Feminina 7", team: 'VASCO', img: "https://i.ibb.co/nswtnS7v/Vasco-Feminina-7.jpg" },
        { name: "Vasco Feminina 8", team: 'VASCO', img: "https://i.ibb.co/1GC4f2GH/Vasco-Feminina-8.jpg" },
        { name: "Vasco Feminina 9", team: 'VASCO', img: "https://i.ibb.co/JWm6kxPV/Vasco-Feminina-9.jpg" },
        { name: "Vasco Feminina 10", team: 'VASCO', img: "https://i.ibb.co/7xhr1vDp/Vasco-Feminina-10.jpg" },
        { name: "Vasco I 24-25", team: 'VASCO', img: "https://i.ibb.co/fzjssnpg/Vasco-I-24-25-1.jpg" },
        { name: "Vasco Pré-Jogo", team: 'VASCO', img: "https://i.ibb.co/3YBftgZR/Vasco-Pr-Jogo-1.jpg" }
    ]
};

// =================================================================================
// ||  2. FUNÇÃO DE PROCESSAMENTO E VALIDAÇÃO DE DADOS (DATA PROCESSING)          ||
// ||  -------------------------------------------------------------------------  ||
// ||  Esta função garante que cada produto tenha um ID único e consistente.      ||
// ||  Se um produto não tiver as propriedades essenciais (nome, img), ele será   ||
// ||  ignorado, prevenindo erros na renderização.                                ||
// =================================================================================

/**
 * Cria um objeto de produto com um ID único e validado.
 * @param {object} product - O objeto do produto original.
 * @param {number} index - O índice do produto no array.
 * @param {string} prefix - Um prefixo para o ID, garantindo unicidade entre categorias.
 * @returns {object|null} O objeto do produto processado ou null se for inválido.
 */
const createProduct = (product, index, prefix = 'PROD') => {
    // Validação básica: garante que os campos essenciais existem
    if (!product.name || !product.img) {
        console.warn(`Produto inválido no índice ${index} da categoria ${prefix} foi ignorado:`, product);
        return null;
    }

    // Cria um ID único e seguro para usar como 'key' no React
    const id = `${prefix}-${product.name.replace(/\s+/g, '-')}-${index}`;
    return { ...product, id };
};

// =================================================================================
// ||  3. CATÁLOGO DE PRODUTOS PROCESSADOS (PROCESSED PRODUCT CATALOG)            ||
// ||  -------------------------------------------------------------------------  ||
// ||  Aqui, os dados brutos são processados pela função 'createProduct'.         ||
// ||  O resultado é um catálogo de produtos limpo, validado e pronto para uso.   ||
// =================================================================================

const productCatalog = {
    africa: rawData.africaShirts.map((p, i) => createProduct(p, i, 'AFR')).filter(Boolean),
    america: rawData.americaShirts.map((p, i) => createProduct(p, i, 'AMER')).filter(Boolean),
    asia: rawData.asiaShirts.map((p, i) => createProduct(p, i, 'ASIA')).filter(Boolean),
    bundesliga: rawData.bundesligaShirts.map((p, i) => createProduct(p, i, 'BUND')).filter(Boolean),
    brasileirao: rawData.brasileiroShirts.map((p, i) => createProduct(p, i, 'BRA')).filter(Boolean),
};

// =================================================================================
// ||  4. CONFIGURAÇÃO DAS SECÇÕES DA PÁGINA (PAGE SECTIONS CONFIGURATION)         ||
// ||  -------------------------------------------------------------------------  ||
// ||  Este é o "cérebro" da aplicação. Ele define cada secção que será exibida,  ||
// ||  qual catálogo de produtos usar, e quais as opções de filtro disponíveis.   ||
// ||  Para adicionar uma nova secção, basta adicionar um novo objeto a este array.||
// =================================================================================

const sectionsConfig = [
    { 
        id: 'africa', 
        title: "Seleções Africanas", 
        products: productCatalog.africa 
    },
    {
        id: 'america',
        title: "Seleções das Américas",
        products: productCatalog.america,
        hasFilter: true,
        filterKey: 'country',
        filterOptions: [
            { value: "AR", label: "Argentina (AR)" }, 
            { value: "BR", label: "Brasil (BR)" },
            { value: "CA", label: "Canadá (CA)" },
            { value: "CL", label: "Chile (CL)" },
            { value: "CO", label: "Colômbia (CO)" },
            { value: "EC", label: "Equador (EC)" },
            { value: "SV", label: "El Salvador (SV)" },
            { value: "US", label: "Estados Unidos (US)" },
            { value: "JM", label: "Jamaica (JM)" },
            { value: "MX", label: "México (MX)" },
            { value: "PA", label: "Panamá (PA)" },
            { value: "UY", label: "Uruguai (UY)" }
        ]
    },
    {
        id: 'asia',
        title: "Seleções Asiáticas",
        products: productCatalog.asia,
        hasFilter: true,
        filterKey: 'team',
        filterOptions: [
            { value: "ARABIA_SAUDITA", label: "Arábia Saudita" },
            { value: "AUSTRALIA", label: "Austrália" },
            { value: "COREIA_DO_SUL", label: "Coreia do Sul" },
            { value: "JAPAO", label: "Japão" }
        ]
    },
    { 
        id: 'bundesliga', 
        title: "Bundesliga", 
        products: productCatalog.bundesliga,
        hasFilter: true,
        filterKey: 'team',
        filterOptions: [
            { value: "BAYERN", label: "Bayern München" },
            { value: "DORTMUND", label: "Borussia Dortmund" }
        ]
    },
    { 
        id: 'brasileirao', 
        title: "Brasileirão", 
        products: productCatalog.brasileirao,
        hasFilter: true,
        filterKey: 'team',
        filterOptions: [
            { value: "FLAMENGO", label: "Flamengo" },
            { value: "PALMEIRAS", label: "Palmeiras" },
            { value: "CORINTHIANS", label: "Corinthians" },
            { value: "SANTOS", label: "Santos" },
            { value: "SAO_PAULO", label: "São Paulo" },
            { value: "VASCO", label: "Vasco" }
        ]
    }
];

// =================================================================================
// ||  5. COMPONENTES DE INTERFACE (UI COMPONENTS)                                ||
// ||  -------------------------------------------------------------------------  ||
// ||  Componentes reutilizáveis para construir a interface do usuário.           ||
// =================================================================================

/**
 * Componente de imagem com tratamento de erro e loading
 */
const OptimizedImage = ({ src, alt, className = "", onError, onLoad }) => {
    const [imageState, setImageState] = useState('loading');
    const [imageSrc, setImageSrc] = useState(src);

    useEffect(() => {
        setImageState('loading');
        setImageSrc(src);
    }, [src]);

    const handleImageLoad = () => {
        setImageState('loaded');
        if (onLoad) onLoad();
    };

    const handleImageError = () => {
        setImageState('error');
        setImageSrc('https://via.placeholder.com/300x400/f0f0f0/666666?text=Imagem+Indisponível');
        if (onError) onError();
    };

    return (
        <div className={`relative ${className}`}>
            {imageState === 'loading' && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <img
                src={imageSrc}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
            />
        </div>
    );
};

/**
 * Componente de paginação
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        const pages = [];
        const maxVisible = 5;
        const halfVisible = Math.floor(maxVisible / 2);
        
        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, currentPage + halfVisible);
        
        if (endPage - startPage + 1 < maxVisible) {
            if (startPage === 1) {
                endPage = Math.min(totalPages, startPage + maxVisible - 1);
            } else {
                startPage = Math.max(1, endPage - maxVisible + 1);
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-center space-x-2 mt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Anterior
            </button>
            
            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === page
                            ? 'text-white bg-blue-600 border border-blue-600'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    {page}
                </button>
            ))}
            
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Próxima
            </button>
        </div>
    );
};

/**
 * Componente de card de produto
 */
const ProductCard = ({ product, onOrderClick }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-w-3 aspect-h-4 h-64">
                <OptimizedImage
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                </h3>
                {product.country && (
                    <p className="text-sm text-gray-600 mb-2">País: {product.country}</p>
                )}
                {product.team && (
                    <p className="text-sm text-gray-600 mb-2">Time: {product.team}</p>
                )}
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-600">R$ 119,90</span>
                    <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm text-gray-600 ml-1">4.8</span>
                    </div>
                </div>
                <button
                    onClick={() => onOrderClick(product)}
                    className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                    Pedir Agora
                </button>
            </div>
        </div>
    );
};

/**
 * Modal de pedido
 */
const OrderModal = ({ product, isOpen, onClose }) => {
    if (!isOpen || !product) return null;

    const handleWhatsAppOrder = () => {
        const message = `Olá! Gostaria de fazer um pedido da camisa: ${product.name} - R$ 119,90`;
        const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Detalhes do Produto</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="mb-4">
                        <OptimizedImage
                            src={product.img}
                            alt={product.name}
                            className="w-full h-64 rounded-lg"
                        />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    
                    {product.country && (
                        <p className="text-sm text-gray-600 mb-2">País: {product.country}</p>
                    )}
                    {product.team && (
                        <p className="text-sm text-gray-600 mb-2">Time: {product.team}</p>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-green-600">R$ 119,90</span>
                        <div className="flex items-center">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm text-gray-600 ml-1">4.8 (127 avaliações)</span>
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <p className="text-sm text-gray-600">
                            Camisa oficial de alta qualidade, confeccionada com materiais premium. 
                            Produto 100% original e licenciado.
                        </p>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                        <div className="flex items-center text-sm text-green-600">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Frete grátis para compras acima de R$ 150
                        </div>
                        <div className="flex items-center text-sm text-green-600">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Produto 100% original e licenciado
                        </div>
                        <div className="flex items-center text-sm text-green-600">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            30 dias para troca e devolução
                        </div>
                    </div>
                    
                    <button
                        onClick={handleWhatsAppOrder}
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        Pedir via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

/**
 * Componente de seção de produtos
 */
const ProductSection = ({ section, searchTerm }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const productsPerPage = 12;

    // Filtrar produtos baseado na busca e filtro selecionado
    const filteredProducts = useMemo(() => {
        let products = section.products;

        // Aplicar busca
        if (searchTerm) {
            products = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.country && product.country.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (product.team && product.team.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Aplicar filtro específico da seção
        if (selectedFilter && section.hasFilter) {
            products = products.filter(product => 
                product[section.filterKey] === selectedFilter
            );
        }

        return products;
    }, [section.products, searchTerm, selectedFilter, section.hasFilter, section.filterKey]);

    // Calcular produtos da página atual
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    // Reset página quando filtros mudam
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedFilter]);

    const handleOrderClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    {section.title}
                </h2>

                {/* Filtros */}
                {section.hasFilter && section.filterOptions && (
                    <div className="mb-8 flex justify-center">
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Todos</option>
                            {section.filterOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Contador de produtos */}
                <div className="mb-6 text-center">
                    <p className="text-gray-600">
                        {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                        {searchTerm && (
                            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                Busca: {searchTerm}
                            </span>
                        )}
                    </p>
                </div>

                {/* Grid de produtos */}
                {currentProducts.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                            {currentProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onOrderClick={handleOrderClick}
                                />
                            ))}
                        </div>

                        {/* Paginação */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            Nenhum produto encontrado para os filtros selecionados.
                        </p>
                    </div>
                )}

                {/* Modal de pedido */}
                <OrderModal
                    product={selectedProduct}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </div>
        </section>
    );
};

// =================================================================================
// ||  6. COMPONENTE PRINCIPAL DA APLICAÇÃO (MAIN APP COMPONENT)                  ||
// ||  -------------------------------------------------------------------------  ||
// ||  Este é o componente raiz que orquestra toda a aplicação.                   ||
// =================================================================================

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef(null);

    // Debounce para a busca
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">
                                SportStyle Store
                            </h1>
                        </div>
                        
                        {/* Busca */}
                        <div className="flex-1 max-w-md mx-8">
                            <div className="relative">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Buscar camisas..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <svg
                                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                {searchTerm && (
                                    <button
                                        onClick={clearSearch}
                                        className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                🏆 Loja Oficial de Camisas Esportivas
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        SportStyle Store
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 opacity-90">
                        As melhores camisas esportivas do mundo em um só lugar. 
                        Qualidade premium, preços imbatíveis.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        <div className="text-center">
                            <div className="text-3xl font-bold">500+</div>
                            <div className="text-lg opacity-90">Produtos Premium</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">10k+</div>
                            <div className="text-lg opacity-90">Clientes Satisfeitos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold">1000+</div>
                            <div className="text-lg opacity-90">Vendas Mensais</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seções de Produtos */}
            <main>
                {sectionsConfig.map((section) => (
                    <ProductSection
                        key={section.id}
                        section={section}
                        searchTerm={debouncedSearchTerm}
                    />
                ))}
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-bold mb-4">SportStyle Store</h3>
                            <p className="text-gray-400">
                                A melhor loja de camisas esportivas do Brasil. 
                                Qualidade premium, preços imbatíveis.
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Categorias</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Seleções Africanas</li>
                                <li>Seleções das Américas</li>
                                <li>Seleções Asiáticas</li>
                                <li>Bundesliga</li>
                                <li>Brasileirão</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Atendimento</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>WhatsApp: (11) 99999-9999</li>
                                <li>Email: contato@sportstyle.com</li>
                                <li>Seg-Sex: 9h às 18h</li>
                                <li>Sáb: 9h às 14h</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Informações</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Frete grátis acima de R$ 150</li>
                                <li>Parcelamento em até 12x</li>
                                <li>30 dias para troca</li>
                                <li>Produtos originais</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 SportStyle Store. Todos os direitos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
