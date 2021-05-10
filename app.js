window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas");
  const context = canvas.getContext("2d");
  const inputColor = document.querySelector("#input-color");
  const inputColorValue = document.querySelector("#input-color-value");
  const brushSize = document.querySelector("#brush-size");
  const brushSizeValue = document.querySelector("#brush-size-value");
  const clearButton = document.querySelector("#clear");

  clearButton.addEventListener("click", clear);

  brushSize.addEventListener("mousemove", () => {
    brushSizeValue.innerHTML = `Size ${brushSize.value}`;
  });

  canvas.width = window.innerWidth - 2;
  canvas.height = window.innerHeight / 1.2;

  let painting = false;

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function finishedPosition() {
    painting = false;
    context.beginPath();
  }

  function draw(e) {
    console.log(painting);
    if (!painting) {
      return;
    }

    context.lineWidth = brushSize.value;
    context.lineCap = "round";
    context.strokeStyle = inputColor.value;

    context.lineTo(e.clientX, e.clientY);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX, e.clientY);
  }

  function clear() {
    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", finishedPosition);
  canvas.addEventListener("mousemove", draw);
});
