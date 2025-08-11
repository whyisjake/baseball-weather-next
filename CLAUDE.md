# Baseball Weather Next - Development Guide

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style Guidelines
- **Imports**: Group imports: React/Next.js first, third-party libraries, then local components/styles
- **Components**: Use functional components with hooks, not class components
- **Naming**: 
  - Files: PascalCase for components (Button.js)
  - Variables/Functions: camelCase (getUserData)
- **Path Aliases**: Use `@/` path alias for imports (from jsconfig.json)
- **Formatting**: Follow NextJS/React conventions and existing patterns in codebase
- **Error Handling**: Use try/catch blocks for async operations
- **Weather Data**: Follow established patterns in _weatherTypes.js and other weather component files

## Project Structure
- `components/` - Reusable React components
- `pages/` - Next.js pages and API routes
- `public/` - Static assets
- `styles/` - CSS files