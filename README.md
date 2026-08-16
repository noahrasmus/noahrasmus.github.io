# Noah Rasmus

Static site for Noah Rasmus.

## Stack

- Plain HTML, CSS, JavaScript — no build step
- Deployed via GitHub Pages from the `main` branch root

## Local preview

Any static server works. Two easy options:

```sh
# Python (preinstalled on macOS)
python3 -m http.server 8000

# Or Node's `serve` package
npx serve .
```

Then open http://localhost:8000

## Structure

```
index.html         Home page
css/styles.css     Styles
js/main.js         Behavior
assets/            Images and other static assets
```

## Deploy

Pushes to `main` publish automatically once GitHub Pages is enabled for the repo
(Settings → Pages → Source: `main` / root). The `.nojekyll` file at the repo
root disables Jekyll processing so files/folders starting with `_` are served
as-is.
