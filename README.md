# Personal website

## Local setup
```bash
npm init -y
npm install @11ty/eleventy --save-dev
```

Run it
```bash
npx @11ty/eleventy
```

Now the website is compiled in `_site` folder by default.

To launch a hot-reloading local webserver:

```bash
npx @11ty/eleventy --serve
```