const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "..", "assets");
const manifestPath = path.join(assetsDir, "photos.json");
const imagePattern = /\.(avif|gif|jpe?g|png|webp)$/i;

const files = fs
  .readdirSync(assetsDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && imagePattern.test(entry.name))
  .map((entry) => `assets/${entry.name}`)
  .sort((left, right) => left.localeCompare(right, "pt-BR", { numeric: true, sensitivity: "base" }));

fs.writeFileSync(manifestPath, `${JSON.stringify(files, null, 2)}\n`);

console.log(`Manifesto atualizado com ${files.length} foto(s): ${path.relative(__dirname, manifestPath)}`);
