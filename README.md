# Gabriela Moreira Senna — Portfólio

**Desenvolvedora de Software** · Florianópolis/SC

🌐 Site: [gabrielasenna.github.io/portoflio-web-dev](https://gabrielasenna.github.io/portoflio-web-dev/) ·
💼 [LinkedIn](https://www.linkedin.com/in/gabriela-moreira-senna) ·
✉️ gabrielamsenna@gmail.com

Portfólio pessoal construído do zero em **HTML, CSS e JavaScript puro**, sem frameworks nem dependências. Reúne meus projetos de desenvolvimento web e UX/UI, trajetória profissional e canais de contato.

## O que você encontra no site

- **Projetos:** Viventia Medical e Universal Juntas (sites publicados, do layout ao código), Dibba App (front-end e UX/UI de uma plataforma de ingressos) e Spots (wireframe de coworking).
- **Experiência, formação, habilidades e idiomas.**
- **Contato:** WhatsApp, e-mail, LinkedIn e download do currículo em PDF.

## Decisões de design e técnica

- **Identidade visual própria:** paleta cacau, creme, vinho e oliva; tipografia Fraunces (títulos) e Manrope (texto).
- **Modo claro e escuro**, com a preferência salva no navegador e aplicada antes da primeira renderização.
- **Responsivo e acessível:** mobile first, HTML semântico, navegação por teclado e respeito a `prefers-reduced-motion`.
- **Leve:** sem build nem bibliotecas; imagens otimizadas e carregamento adiado nas capas dos projetos.
- **Interações em JavaScript puro:** menu mobile, troca de tema, animações de entrada e navegação ativa por seção.

## Estrutura

```
index.html            página única com todas as seções
css/style.css         tokens de cor (temas), componentes e responsivo
js/main.js            tema, menu, reveal, nav ativa, marquee
assets/img            foto, capas e wireframes dos projetos
assets/docs           currículo em PDF
```

## Rodar localmente

Abra o `index.html` no navegador ou sirva a pasta:

```bash
python3 -m http.server 5173
```

---

Publicado com GitHub Pages a partir da branch `main`. Licença [MIT](LICENSE).
