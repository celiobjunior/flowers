const titleLines = ["feliz dia das", "mulheres"];
const headline = document.querySelector("[data-title]");
const track = document.querySelector("[data-track]");
const statusMessage = document.querySelector("[data-status]");

const letterPalette = ["#ff5f8a", "#ff8d58", "#ffbf3f", "#d95f83", "#7a3155"];
const tiltValues = ["-6deg", "3deg", "-4deg", "6deg", "-5deg", "4deg", "-3deg", "5deg", "-6deg", "2deg"];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let photoFiles = [];
let offset = 0;
let loopWidth = 0;
let animationFrame = 0;
let lastFrameTime = 0;
let resizeTimer = 0;

function buildHeadline() {
  headline.innerHTML = "";
  let letterIndex = 0;

  titleLines.forEach((line) => {
    const lineWrap = document.createElement("span");
    lineWrap.className = "headline-line";

    [...line].forEach((character) => {
      const part = document.createElement("span");

      if (character === " ") {
        part.className = "space";
        part.setAttribute("aria-hidden", "true");
        lineWrap.appendChild(part);
        return;
      }

      part.className = `letter${letterIndex % 2 === 0 ? "" : " alt"}`;
      part.textContent = character;
      part.style.setProperty("--i", letterIndex);
      part.style.setProperty("--letter-color", letterPalette[letterIndex % letterPalette.length]);
      part.setAttribute("aria-hidden", "true");
      lineWrap.appendChild(part);
      letterIndex += 1;
    });

    headline.appendChild(lineWrap);
  });
}

function buildCarousel() {
  track.innerHTML = "";
  window.cancelAnimationFrame(animationFrame);

  [...photoFiles, ...photoFiles].forEach((fileName, index) => {
    const card = document.createElement("figure");
    const image = document.createElement("img");

    card.className = "photo-card";
    card.style.setProperty("--tilt", tiltValues[index % tiltValues.length]);

    image.src = fileName.split("/").map(encodeURIComponent).join("/");
    image.alt = `Foto ${index % photoFiles.length + 1}`;
    image.loading = "lazy";
    image.decoding = "async";

    card.appendChild(image);
    track.appendChild(card);
  });
}

function measureCarousel() {
  const cards = Array.from(track.children).slice(0, photoFiles.length);
  const styles = window.getComputedStyle(track);
  const gap = parseFloat(styles.gap) || 0;

  loopWidth = cards.reduce((total, card) => total + card.getBoundingClientRect().width, 0);
  loopWidth += gap * Math.max(cards.length - 1, 0);
  offset = -loopWidth;
  track.style.transform = `translate3d(${offset}px, 0, 0)`;
}

function animateCarousel(time) {
  if (prefersReducedMotion || loopWidth === 0) {
    return;
  }

  if (!lastFrameTime) {
    lastFrameTime = time;
  }

  const delta = time - lastFrameTime;
  lastFrameTime = time;
  offset += delta * 0.055;

  if (offset >= 0) {
    offset = -loopWidth;
  }

  track.style.transform = `translate3d(${offset}px, 0, 0)`;
  animationFrame = window.requestAnimationFrame(animateCarousel);
}

function startCarousel() {
  window.cancelAnimationFrame(animationFrame);
  lastFrameTime = 0;

  if (!prefersReducedMotion) {
    animationFrame = window.requestAnimationFrame(animateCarousel);
  }
}

function setStatus(message = "") {
  if (!statusMessage) {
    return;
  }

  if (!message) {
    statusMessage.hidden = true;
    statusMessage.textContent = "";
    return;
  }

  statusMessage.hidden = false;
  statusMessage.textContent = message;
}

async function loadPhotoFiles() {
  const response = await fetch("assets/photos.json", { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Manifesto indisponivel: ${response.status}`);
  }

  const files = await response.json();

  if (!Array.isArray(files)) {
    throw new Error("Manifesto invalido");
  }

  return files.filter((fileName) => typeof fileName === "string" && fileName.length > 0);
}

async function initCarousel() {
  try {
    photoFiles = await loadPhotoFiles();

    if (photoFiles.length === 0) {
      setStatus("Nenhuma foto encontrada em assets.");
      track.innerHTML = "";
      return;
    }

    setStatus("");
    buildCarousel();
    measureCarousel();
    startCarousel();
  } catch (error) {
    console.error(error);
    track.innerHTML = "";
    setStatus(
      window.location.protocol === "file:"
        ? "Abra o site por um servidor local para carregar o photos.json."
        : "Nao foi possivel carregar as fotos agora."
    );
  }
}

buildHeadline();
initCarousel();

window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    if (photoFiles.length === 0) {
      return;
    }

    measureCarousel();
    startCarousel();
  }, 140);
});
