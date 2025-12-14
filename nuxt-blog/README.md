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

# NuxtUI使用

## APP
App在layout中是用于进行最外层ui布局的配置项目，类似一个用于控制全局布局，并且可以控制tooltip和dialog的方式。
- dialog
- locale：i18n


# NuxtJs

## NuxtPage标签

用于显示项目中`/pages`下的所有vue项目，相当于vue中的`<route-view>`标签。


## alia
- `~`/`@`：<src>
- `~~`/`@@`：<root-src>

# NuxtContent

## ContentRenderer