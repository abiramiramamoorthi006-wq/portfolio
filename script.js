const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

const frameCount = 240;
const images = [];
let loadedImages = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  renderFrame(currentFrame);
}

window.addEventListener("resize", resizeCanvas);

// Load images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  const frameNumber = String(i).padStart(3, "0");
  img.src = `images/ezgif-frame-${frameNumber}.png`;
  img.onload = () => {
    loadedImages++;
    if (loadedImages === frameCount) {
      renderFrame(0);
    }
  };
  images.push(img);
}

let currentFrame = 0;

function renderFrame(index) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const img = images[index];
  if (!img) return;

  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const x = canvas.width / 2 - (img.width * scale) / 2;
  const y = canvas.height / 2 - (img.height * scale) / 2;

  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

// Scroll animation logic
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / scrollHeight;
  currentFrame = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => renderFrame(currentFrame));
});
