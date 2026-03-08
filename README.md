# flowers

Static site with:

- animated title
- automatic photo carousel
- images loaded from `assets/photos.json`

Source files are in `src/`.

## Requirements

- `node` to generate/update `assets/photos.json`
- a simple local server to open the site

## Run

1. Update the photo list:

```bash
node src/generate-photos-json.js
```

2. Start a local server:

```bash
python3 -m http.server 8000
```

3. Open in the browser:

```text
http://localhost:8000
```

## Add new photos

1. Put the images inside `assets/`
2. Run:

```bash
node src/generate-photos-json.js
```

3. Reload the page in the browser

## Supported formats

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.gif`
- `.avif`

## Note

Do not open `index.html` directly with `file://`, because the browser will block reading `assets/photos.json`.
