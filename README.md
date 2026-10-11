# Vuetify layout SSR in Nuxt

Pages that compare the server-rendered layout with the hydrated one, to verify [vuetifyjs/vuetify#23250](https://github.com/vuetifyjs/vuetify/pull/23250) in a real Nuxt app.

Nuxt 4.5.2, vuetify-nuxt-module 1.0.0-rc.6 with `ssrClientHints.viewportSize`, Vue 3.5.43.

## Run

```bash
pnpm install
pnpm exec playwright install chromium   # or set CHROMIUM=/path/to/chromium
pnpm build && pnpm start                # http://localhost:3000
pnpm measure /,/drawer,/admin,/public   # in another terminal
```

`measure` loads each page twice: with JavaScript off (the server HTML) and with JavaScript on, the scripts delayed by 600 ms so the server HTML paints first. It compares the boxes of every layout item and `v-main`'s padding, and reports Chrome's layout-shift score. Lines marked `!` changed during hydration.

Modes (third argument, default all four):

- `*-hints`: Chrome user agent. The module asks for viewport client hints and Chromium sends them.
- `*-nohints`: Firefox user agent. No client hints, so the server assumes a width of 0, like Firefox and Safari.

Hydration warnings need the dev server: `pnpm dev`, then `pnpm warnings /,/drawer`.

## Test a Vuetify branch

```bash
git clone https://github.com/vuetifyjs/vuetify && cd vuetify
git fetch origin pull/23250/head:pr-23250 && git checkout pr-23250
pnpm install && cd packages/vuetify && pnpm build && pnpm pack
# back in this repo
pnpm add vuetify@file:/path/to/vuetify/packages/vuetify/vuetify-4.2.4.tgz && pnpm build
```

## Pages

| Page | Layout |
|---|---|
| `/` | app bar, main |
| `/drawer` | drawer without v-model, app bar, main |
| `/admin` | drawer with v-model, rail and `mobile-breakpoint="lg"`, app bar, bottom navigation below lg |
| `/public` | temporary drawer, transparent app bar with a border, main with a footer inside |
| `/nuxt-layout` | shell in a Nuxt layout, page with `await useAsyncData` |
| `/rail`, `/sticky-drawer`, `/drawer-bottom` | drawer variants with an app bar |
| `/scroll-hide`, `/scroll-inverted` | app bar `scroll-behavior` |
| `/empty-extension` | `#extension` slot whose content is `v-if`'d out |
| `/fab` | three `v-fab app`, one with `layout` |
| `/layout-item` | `v-layout-item` |
| `/footer-after-main`, `/bottom-nav-after-main`, `/discord` | layout items after `v-main` (`/discord` is the docs wireframe) |
| `/footer-auto` | `v-footer app` with `height="auto"` |
| `/async-header` | app bar inside a component with async setup |
| `/lazy-idle`, `/lazy-never`, `/lazy-footer` | layout items in Nuxt delayed-hydration components |
| `/mismatch` | drawer open on the server, closed on the client (deliberate mismatch) |
