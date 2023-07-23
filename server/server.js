// const express = require('express');
// const app = express();

// const projetos = [
//     {
//         id: 1,
//         nomePt: "Portfólio",
//         nomeEn: "Portfolio",
//         urlImagem: "images/projetos/portfolio.png",
//         altImagem: "Pré vizualização do projeto: Portfólio",
//         descricaoPt: "Meu portfólio pessoal, onde apresento meus projetos e habilidades.",
//         descricaoEn: "My personal portfolio, where I showcase my projects and skills.",
//         livePreview: "https://muriwolf.github.io/portfolio/",
//         sourceCode: "https://github.com/MuriWolf/portfolio",
//         tecnologias: ["HTML", "CSS", "JavaScript"]
//     },
//     {
//         id: 2,
//         nomePt: "Calculadora de Gorjeta",
//         nomeEn: "Tip Calculator",
//         urlImagem: "images/projetos/tip-calculator.png",
//         altImagem: "Pré vizualização do projeto: Calculadora de Gorjeta",
//         descricaoPt: "Calculadora simples de gorjeta para auxiliar no cálculo de valores a serem pagos em restaurantes.",
//         descricaoEn: "Simple tip calculator to assist in calculating amounts to be paid at restaurants.",
//         livePreview: "https://muriwolf.github.io/tip-calculator/",
//         sourceCode: "https://github.com/MuriWolf/tip-calculator",
//         tecnologias: ["HTML", "CSS", "JavaScript"]
//     },
//     {
//         id: 3,
//         nomePt: "Relógio Digital",
//         nomeEn: "Digital Clock",
//         urlImagem: "images/projetos/digital-clock.png",
//         altImagem: "Pré vizualização do projeto: Relógio Digital",
//         descricaoPt: "Relógio digital simples com data e hora atualizada em tempo real.",
//         descricaoEn: "Simple digital clock with real-time updated date and time.",
//         livePreview: "https://muriwolf.github.io/digital-clock/",
//         sourceCode: "https://github.com/MuriWolf/digital-clock",
//         tecnologias: ["HTML", "CSS", "JavaScript"]
//     },
//     {
//         id: 4,
//         nomePt: "Conversor de Unidades",
//         nomeEn: "Unit Converter",
//         urlImagem: "images/projetos/unit-converter.png",
//         altImagem: "Pré vizualização do projeto: Conversor de Unidades",
//         descricaoPt: "Conversor de unidades simples que permite converter entre diferentes sistemas de medida.",
//         descricaoEn: "Simple unit converter that allows conversion between different measurement systems.",
//         livePreview: "https://muriwolf.github.io/unit-converter/",
//         sourceCode: "https://github.com/MuriWolf/unit-converter",
//         tecnologias: ["HTML", "CSS", "JavaScript"]
//     },
//     {
//         id: 5,
//         nomePt: "Seção de Introdução com Navegação Dropdown",
//         nomeEn: "Introduction Section with Dropdown Navigation",
//         urlImagem: "images/projetos/intro-section.png",
//         altImagem: "Pré vizualização do projeto: Seção de Introdução com Navegação Dropdown",
//         descricaoPt: "Seção de introdução responsiva com navegação dropdown. Design do desafio feito pelo Frontend Mentor.",
//         descricaoEn: "Responsive introduction section with dropdown navigation. Design challenge made by Frontend Mentor.",
//         livePreview: "https://muriwolf.github.io/intro-section/",
//         sourceCode: "https://github.com/MuriWolf/intro-section",
//         tecnologias: ["HTML", "CSS", "JavaScript"]
//     },
//     {
//         id: 6,
//         nomePt: "Página de Captura Responsiva",
//         nomeEn: "Responsive Capture Page",
//         urlImagem: "images/projetos/capture-page.png",
//         altImagem: "Pré vizualização do projeto: Página de Captura Responsiva",
//         descricaoPt: "Página de captura responsiva com design moderno. Projeto desenvolvido durante um curso online.",
//         descricaoEn: "Responsive capture page with modern design. Project developed during an online course.",
//         livePreview: "https://muriwolf.github.io/responsive-capture-page/",
//         sourceCode: "https://github.com/MuriWolf/responsive-capture-page",
//         tecnologias: ["HTML", "CSS"]
//     },
//     {
//         id: 7,
//         nomePt: "Página de FAQ Responsiva",
//         nomeEn: "Responsive FAQ Page",
//         urlImagem: "images/projetos/faq-page.png",
//         altImagem: "Pré vizualização do projeto: Página de FAQ Responsiva",
//         descricaoPt: "Página de perguntas frequentes responsiva com respostas expansíveis. Design do desafio feito pelo Frontend Mentor.",
//         descricaoEn: "Responsive frequently asked questions page with expandable answers. Design challenge made by Frontend Mentor.",
//         livePreview: "https://muriwolf.github.io/responsive-faq-page/",
//         sourceCode: "https://github.com/MuriWolf/responsive-faq-page",
//         tecnologias: ["HTML", "CSS", "JavaScript"]
//     },
//     {
//         id: 8,
//         nomePt: "Página de Preços Responsiva",
//         nomeEn: "Responsive Pricing Page",
//         urlImagem: "images/projetos/pricing-page.png",
//         altImagem: "Pré vizualização do projeto: Página de Preços Responsiva",
//         descricaoPt: "Página de preços responsiva com opções de planos. Design do desafio feito pelo Frontend Mentor.",
//         descricaoEn: "Responsive pricing page with plan options. Design challenge made by Frontend Mentor.",
//         livePreview: "https://muriwolf.github.io/responsive-pricing-page/",
//         sourceCode: "https://github.com/MuriWolf/responsive-pricing-page",
//         tecnologias: ["HTML", "CSS", "JavaScript"]
//     },
//     {
//         id: 9,
//         nomePt: "Página de Blog Responsiva",
//         nomeEn: "Responsive Blog Page",
//         urlImagem: "images/projetos/blog-page.png",
//         altImagem: "Pré vizualização do projeto: Página de Blog Responsiva",
//         descricaoPt: "Página de blog responsiva com layout de artigos. Design do desafio feito pelo Frontend Mentor.",
//         descricaoEn: "Responsive blog page with article layout. Design challenge made by Frontend Mentor.",
//         livePreview: "https://muriwolf.github.io/responsive-blog-page/",
//         sourceCode: "https://github.com/MuriWolf/responsive-blog-page",
//         tecnologias: ["HTML", "CSS"]
//     },
//     {
//         id: 10,
//         nomePt: "Página de Depoimentos Responsiva",
//         nomeEn: "Responsive Testimonials Page",
//         urlImagem: "images/projetos/testimonials-page.png",
//         altImagem: "Pré vizualização do projeto: Página de Depoimentos Responsiva",
//         descricaoPt: "Página de depoimentos responsiva com rolagem suave. Design do desafio feito pelo Frontend Mentor.",
//         descricaoEn: "Responsive testimonials page with smooth scrolling. Design challenge made by Frontend Mentor.",
//         livePreview: "https://muriwolf.github.io/responsive-testimonials-page/",
//         sourceCode: "https://github.com/MuriWolf/responsive-testimonials-page",
//         tecnologias: ["HTML", "CSS", "JavaScript"]
//     },
//     {
//         id: 11,
//         nomePt: "Painel de Controle de Tempo",
//         nomeEn: "Time Tracking Dashboard",
//         urlImagem: "images/projetos/time-tracking-dashboard-main.png",
//         altImagem: "Pré visualização do projeto: Painel de Controle de Tempo",
//         descricaoPt: "Projeto que é um painel onde estão registradas a quantidade de horas de cada tarefa que a pessoa executa. É responsivo. Design do desafio feito pelo Frontend Mentor.",
//         descricaoEn: "A project that is a dashboard where the amount of hours for each task that a person performs is recorded. It is responsive. Design challenge made by Frontend Mentor.",
//         livePreview: "https://muriwolf.github.io/time-tracking-dashboard-main/",
//         sourceCode: "https://github.com/MuriWolf/time-tracking-dashboard-main",
//         tecnologias: ["HTML", "CSS", "JavaScript"]
//     },
//     {
//         id: 12,
//         nomePt: "Seção Grid",
//         nomeEn: "Grid Section",
//         urlImagem: "images/projetos/grid-section-main.png",
//         altImagem: "Pré visualização do projeto: Seção Grid",
//         descricaoPt: "Uma seção em grade composta por comentários. É responsiva. Design do desafio feito pelo Frontend Mentor.",
//         descricaoEn: "A grid section composed of comments. It is responsive. Design challenge made by Frontend Mentor.",
//         livePreview: "https://muriwolf.github.io/grid-section-main/",
//         sourceCode: "https://github.com/MuriWolf/grid-section-main",
//         tecnologias: ["HTML", "CSS", "JavaScript"]
//     },
//     {
//         id: 13,
//         nomePt: "FlexBlog",
//         nomeEn: "FlexBlog",
//         urlImagem: "images/projetos/flexblog.png",
//         altImagem: "Pré visualização do projeto: FlexBlog",
//         descricaoPt: "Projeto final do curso de Flexbox da Origamid. Foi muito bom para treinar minhas habilidades com Flexbox após ter aprendido a teoria.",
//         descricaoEn: "Final project of the Flexbox course from Origamid. It was very good to practice my skills with Flexbox after learning the theory.",
//         livePreview: "https://muriwolf.github.io/origamid_flexbox_project/",
//         sourceCode: "https://github.com/MuriWolf/origamid_flexbox_project",
//         tecnologias: ["HTML", "CSS"]
//     },
//     {
//         id: 14,
//         nomePt: "WildBeast",
//         nomeEn: "WildBeast",
//         urlImagem: "images/projetos/wildbeast.png",
//         altImagem: "Pré visualização do projeto: WildBeast",
//         descricaoPt: "Projeto final do curso de Grid da Origamid. Com ele, pude colocar em prática o sistema de grid do CSS e entender melhor seu funcionamento.",
//         descricaoEn: "Final project of the Grid course from Origamid. With it, I was able to put into practice the CSS grid system and better understand its functioning.",
//         livePreview: "https://muriwolf.github.io/origamid_grid_project/",
//         sourceCode: "https://github.com/MuriWolf/origamid_grid_project",
//         tecnologias: ["HTML", "CSS"]
//     }
//     // ... mais projetos
// ];

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

// // Define o tipo de conteúdo MIME dos arquivos JavaScript
// app.use(express.static('/', { 'extensions': ['js'] }));

// app.get('/api/projetos', (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.json(projetos);
// });

// app.listen(3000, () => {
//     console.log('API rodando na porta 3000');
// });