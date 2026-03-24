# React + TypeScript + Vite

## Node.js version

**Vite 8 needs a current Node.js** (20.19+ recommended). If `npm run dev` fails with `SyntaxError: Unexpected token {` in `vite.js`, your Node is too old.

If you use [nvm](https://github.com/nvm-sh/nvm), run from this folder:

```bash
nvm install   # uses .nvmrc
nvm use
npm install
npm run dev
```

Do **not** use Node 11 or other legacy versions with this project.

## MLB season (HR leaderboard)

- Default API season is **2025** (`src/lib/mlbSeason.ts`) so HR totals match the completed 2025 regular season in the Stats API.
- Optional override: create `.env.local` with `VITE_MLB_SEASON=2026` (or another year) when you want that season instead.
- **Undrafted**: top 5 MLB HR leaders not on any `mockLeague` roster (`src/lib/mlbLeaders.ts`), shown **below** the standings (not ranked), re-fetched on each load / refresh.
- Verify the API from the CLI: `npm run test:mlb-api` (checks 2025 sample HRs and logs 2026 for comparison).

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
