const tileBg = document.getElementById("tile-bg");

if (tileBg) {
  const mediaReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  let tiles = [];
  let sequence = [];
  let stepIndex = 0;
  let targetColor = "pink";
  let intervalId = null;
  let tileColor = "blue";

  const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

  function getTileSize() {
    return Math.round(clamp(window.innerWidth * 0.24, 220, 380));
  }

  function buildSequence(count) {
    sequence = Array.from({ length: count }, (_, i) => i);
    for (let i = count - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    }
    stepIndex = 0;
  }

  function setTileColor(tile, color) {
    tile.classList.remove("is-blue", "is-pink");
    tile.classList.add(color === "blue" ? "is-blue" : "is-pink");
  }

  function buildGrid() {
    const tileSize = getTileSize();
    const cols = Math.ceil(window.innerWidth / tileSize) + 1;
    const rows = Math.ceil(window.innerHeight / tileSize) + 1;

    tileBg.style.setProperty("--tile-size", `${tileSize}px`);
    tileBg.style.setProperty("--tile-cols", String(cols));
    tileBg.style.setProperty("--tile-rows", String(rows));

    const total = cols * rows;
    tileBg.innerHTML = "";
    tiles = [];

    for (let i = 0; i < total; i += 1) {
      const tile = document.createElement("div");
      tile.className = "tile";
      setTileColor(tile, tileColor);
      tileBg.appendChild(tile);
      tiles.push(tile);
    }

    buildSequence(total);
  }

  function tick() {
    if (tiles.length === 0) {
      return;
    }

    if (stepIndex >= sequence.length) {
      tileColor = targetColor;
      targetColor = tileColor === "blue" ? "pink" : "blue";
      buildSequence(sequence.length);
      return;
    }

    const tile = tiles[sequence[stepIndex]];
    setTileColor(tile, targetColor);
    stepIndex += 1;
  }

  function start() {
    if (mediaReduce.matches) {
      tileBg.innerHTML = "";
      return;
    }

    buildGrid();
    clearInterval(intervalId);
    intervalId = window.setInterval(tick, 140);
  }

  function stop() {
    clearInterval(intervalId);
    intervalId = null;
  }

  window.addEventListener("resize", () => {
    if (!mediaReduce.matches) {
      buildGrid();
    }
  });

  mediaReduce.addEventListener("change", () => {
    stop();
    start();
  });

  start();
}
