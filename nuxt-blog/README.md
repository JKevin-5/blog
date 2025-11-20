# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# Nuxt Content + pnpm
pnpm无法创建better-sqlite3模块所需的文件，所以需要对其进行特殊处理

创建pnpm-workspace.yaml文件，内容如下：
```yaml
onlyBuiltDependencies:
  - better-sqlite3
```
接着使用pnpm对better-sqlite3进行安装，即可正常使用
```bash
pnpm rebuild better-sqlite3
```
