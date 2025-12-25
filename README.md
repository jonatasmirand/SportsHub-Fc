# ⚽ SportsHub FC

O **SportsHub FC** é uma aplicação web desenvolvida com **Next.js**, focada em exibir **notícias do futebol** e **informações de times**, permitindo ao usuário buscar seu time do coração e acompanhar as últimas novidades do mundo da bola.

Este projeto foi desenvolvido **exclusivamente para fins de estudo**, com foco em boas práticas de React, Next.js, organização de código e consumo de APIs externas.

---

## 🚀 Funcionalidades

- 🔍 Busca de times pelo nome
- 🏟️ Exibição de informações do time
  - Escudo
  - País
  - Liga
  - Estádio
- 📰 Notícias dinâmicas
  - Destaques em formato de carousel
  - Últimas notícias filtradas por time
- 🎠 Carousel de destaques
  - Autoplay
  - Indicadores interativos
- ⬆️ Botão de voltar ao topo
- 🧭 Navegação por âncoras
- 🎬 Splash Screen animada
- 📱 Layout responsivo
- ⚛️ Context API para gerenciamento de estado global

---

## 🛠️ Tecnologias Utilizadas

- Next.js (App Router)
- React
- TypeScript
- CSS Modules
- Tailwind CSS
- Framer Motion
- Context API
- NewsAPI
- TheSportsDB API

---

## 📂 Estrutura do Projeto

```bash
src/
├── app/
│   ├── components/
│   │   ├── Header
│   │   ├── Footer
│   │   ├── Destaques
│   │   ├── News
│   │   ├── TeamCard
│   │   └── SplashScreen
│   ├── context/
│   │   └── TeamContext.tsx
│   ├── services/
│   │   ├── news.ts
│   │   └── sportsdb.ts
│   ├── types/
│   │   ├── team.ts
│   │   ├── newsArticle.ts
│   │   └── teamContextType.ts
│   ├── api/
│   │   └── news/route.ts
│   └── page.tsx

---
```

## ⚙️ Configuração do Ambiente

### 1️⃣ Clonar o repositório

```bash
Copiar código
git clone https://github.com/jonatasmirand/SportsHub-Fc.git
```

### 2️⃣ Instalar as dependências
```bash
Copiar código
npm install
```
### 3️⃣ Criar o arquivo .env.local
```bash
env
Copiar código
NEWS_API_KEY=SUACHAVEAQUI
A chave pode ser obtida em https://newsapi.org
```
### 4️⃣ Rodar o projeto
```bash
Copiar código
npm run dev
Acesse:
Copiar código
http://localhost:3000
```

## 📚 Objetivo do Projeto
Este projeto tem como objetivo praticar:

Arquitetura com Next.js (App Router)

Componentização

Context API

Consumo de APIs externas

Organização de pastas

Responsividade

UX/UI para aplicações reais

Animações com Framer Motion

## 🔮 Melhorias Futuras
🔄 Paginação ou infinite scroll nas notícias

📱 Menu mobile com hamburger

🎯 Filtro por ligas e campeonatos

⭐ Favoritar times

💾 Persistência de dados no localStorage

🌙 Tema dark/light

📊 Página detalhada do time

🧪 Testes com Jest e Testing Library

🚀 Deploy na Vercel

## ⚠️ Observações
Projeto desenvolvido para fins educacionais

Sem objetivos comerciais

APIs externas possuem limites de uso

## 👨‍💻 Autor
Desenvolvido por Jonatas Miranda
Projeto criado para estudo e aprimoramento em Front-end com React e Next.js

