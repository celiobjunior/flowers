# Women's Day Celebration Landing Page

This project is a small celebratory landing page for Women's Day.

![Landing page screenshot](docs/landing-page.png)

It includes:

- an animated two-line title
- decorative flowers and stars around the page
- an automatic horizontal carousel
- images loaded from `assets/photos.json`

Source files are in `src/`.
The carousel reads image entries from `assets/photos.json`.

## Requirements

- `node` to generate/update `assets/photos.json`
- a simple local server to open the site
- a local `assets/` folder
- an `assets/photos.json` file containing an array of image paths or image URLs

## Run

1. Create the `assets/` folder if it does not exist yet.

2. Create `assets/photos.json` with a list of images, or generate it with the script.

Example:

```json
[
  "assets/photo-01.jpg",
  "assets/photo-02.jpg",
  "https://example.com/photo-03.jpg"
]
```

3. If you want to generate `assets/photos.json` from the local files inside `assets/`, run:

```bash
node src/generate-photos-json.js
```

4. Start a local server:

```bash
python3 -m http.server 8000
```

5. Open in the browser:

```text
http://localhost:8000
```

## Add new photos

1. Put the images inside `assets/`
2. Choose one of these options:

- manually edit `assets/photos.json` and list the local image paths or remote image URLs you want to show
- run the generator below to rebuild `assets/photos.json` from the local image files inside `assets/`

3. If you want to regenerate the JSON from local files, run:

```bash
node src/generate-photos-json.js
```

4. Reload the page in the browser

## Image sources

The carousel supports both:

- local image paths in `assets/photos.json`, such as `assets/photo-01.jpg`
- remote image URLs in `assets/photos.json`, such as `https://example.com/photo.jpg`

The generator in `src/generate-photos-json.js` scans local files inside `assets/` and writes their paths to `assets/photos.json`.

## Supported formats

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.gif`
- `.avif`

## Note

Do not open `index.html` directly with `file://`, because the browser will block reading `assets/photos.json`.
