# UniverseEx Mars Explorer

Aplicação web para exploração de imagens capturadas pelos rovers da NASA em Marte.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **NASA Mars Rover Photos API** - Fonte de dados

## 📋 Funcionalidades

- ✅ Visualização de fotos de Marte capturadas pelos Rovers
- ✅ Filtro por Rover (Curiosity, Opportunity, Spirit, Perseverance)
- ✅ Filtro por câmera
- ✅ Seleção de data terrestre
- ✅ Campo de busca por nome do Rover ou Câmera
- ✅ Paginação de resultados
- ✅ Informações detalhadas de cada foto (data, rover, câmera)

## 🛠️ Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure a API Key da NASA (opcional):
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione sua chave da API:
```env
NEXT_PUBLIC_NASA_API_KEY=sua_chave_aqui
```
   - Se não configurar, será usada a chave DEMO_KEY (com limitações)
   - Obtenha sua chave gratuita em: https://api.nasa.gov

## 🚀 Executando o projeto

```bash
npm run dev
```

Acesse http://localhost:3000

## 📁 Estrutura do Projeto

```
app/
├── components/
│   ├── Header.tsx         # Cabeçalho da aplicação
│   ├── Footer.tsx         # Rodapé
│   ├── Filters.tsx        # Componente de filtros
│   ├── PhotoGallery.tsx   # Galeria de imagens
│   ├── PhotoCard.tsx      # Card individual de foto
│   ├── Pagination.tsx     # Componente de paginação
│   └── MarsExplorer.tsx   # Componente principal
├── services/
│   └── nasaApi.ts         # Serviço de comunicação com a API
├── types/
│   └── mars.ts            # Tipos TypeScript
├── layout.tsx             # Layout principal
└── page.tsx               # Página inicial
```

## 🎨 Layout

A aplicação possui um layout responsivo com:

1. **Header**: Logo e título da UniverseEx
2. **Seção de Filtros**:
   - Seletor de Rover
   - Seletor de Câmera
   - Seletor de Data
3. **Galeria de Imagens**: Grid responsivo com cards de fotos
4. **Paginação**: Navegação entre páginas de resultados
5. **Footer**: Informações e créditos

## 📸 Rovers Disponíveis

- **Curiosity**: Ativo desde 2012
- **Opportunity**: 2004-2018
- **Spirit**: 2004-2010
- **Perseverance**: Ativo desde 2021

## 🔍 Câmeras

Cada rover possui diferentes câmeras com propósitos específicos:
- FHAZ - Front Hazard Avoidance Camera
- RHAZ - Rear Hazard Avoidance Camera
- MAST - Mast Camera
- CHEMCAM - Chemistry and Camera Complex
- NAVCAM - Navigation Camera
- E muitas outras...

## 📝 Licença

Este projeto foi desenvolvido como desafio técnico para a Valcann.
