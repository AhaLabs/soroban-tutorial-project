# Soroban Astro Tutorial

This is the code that the [Soroban Getting Started](https://soroban.stellar.org/docs/category/getting-started) tutorial creates.

As an added bonus, this repository can also be used as a template for new Astro Soroban projects! To create a new project using this as a template, run the following:

```
npm create astro@latest -- --template AhaLabs/soroban-tutorial-project#template
```

Note: the previous command specifies to use the `template` branch of this repository. That is so that your new project only includes necessary boilerplate, and a `hello-soroban` contract, instead of also including an `incrementor` contract and some additional front end components.



[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

## Project Structure

Inside of your Soroban Astro project, you'll see the following folders and files:

```
/
├── contracts
│   └── hello-soroban
│       ├── src
│       │   ├── lib.rs
│       │   └── test.rs
│       └── Cargo.toml
├── public
│   └── favicon.svg
├── src
│   ├── components
│   │   ├── Card.astro
│   │   └── ConnectFreighter.astro
│   ├── layouts
│   │   └── Layout.astro
│   ├── pages
│   │   └── index.astro
│   ├── env.d.ts
│   └── wallet.ts
├── Cargo.lock
├── Cargo.toml
├── README.md
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                                                                        |
| :------------------------ | :-------------------------------------------------------------------------------------------- |
| `npm install`             | Installs dependencies and regenerates contract client libraries                               |
| `npm run dev`             | Starts local dev server at `localhost:4321`                                                   |
| `npm run build`           | Build your production site to `./dist/`                                                       |
| `npm run preview`         | Preview your build locally, before deploying                                                  |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check`                                              |
| `npm run astro -- --help` | Get help using the Astro CLI                                                                  |
| `npm run create_deployer` | Creates a test Soroban identity to use for deploying contracts to Testnet                     |
| `npm run deploy:hello`    | Deploys the hello-soroban contract to Testnet with the previously configured "alice" identity |
| `npm run bindings:hello`  | Generates the hello-soroban contract typescript bindings                                      |
