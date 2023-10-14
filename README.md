# svelte-hacker-news

A hacker news app built in svelte

TODO

- [x] Set up svelte
- [x] Set up tailwind
- [x] Set up daisy-ui
- [ ] Get Stories from hacker news api
- [ ] Display data
- [ ] Add comments
- [ ] Deploy to Railway

# Set up svelte

```bash
npm create svelte@latest myapp
cd myapp
npm install
git init && git add -A && git commit -m "Initial commit"
npm run dev -- --open
```

# Set up tailwind

https://tailwindcss.com/docs/guides/sveltekit  
8-steps

```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p
```

# Set up daisy-ui

```bash
npm i -D daisyui@latest
```

then add to tailwind.config.js

```js
plugins: [
    require('daisyui'),
],
```

Finally go to daisyui and make a theme. Paste it into the file above and check its working
