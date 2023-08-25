# Project instructions
This take home assignment a simple Dockerized React project bundled using Vite and written in Typescript.

## Pre-requisite
You'll need the latest Node to run this locally. Docker is optional.

## Installation
1. Clone project
```bash
git clone git@github.com:lucidkodo/carpark.git && cd carpark
```

2. Install packages
```bash
# choose one
pnpm install
yarn install
npm install
```

3. Run the project in Docker container
```bash
# choose one
pnpm dev:docker
yarn dev:docker
npm dev:docker
```

4. Run the project without Docker
```bash
# choose one
pnpm dev
yarn dev
npm dev
```

5. Run production build in Docker container
```bash
# choose one
pnpm build && pnpm preview:docker
yarn build && yarn preview:docker
npm build && npm preview:docker
```

6. Run production build without Docker
```bash
# choose one
pnpm build && pnpm preview
yarn build && yarn preview
npm build && npm preview
```

Thanks for your time.

---

# Project boilerplate code
## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
