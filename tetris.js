const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);



const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
];

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = 'red';
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    })
  })
}

const player = {
  matrix: matrix,
  pos: {x:5, y:5}
}

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(player.matrix, player.pos);
}

let lastTime = 0;
let dropCounter = 0;
const dropInterval = 1000;

function update(time = 0) {
  let deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  
  if (dropCounter > dropInterval) {
    player.pos.y++;
    dropCounter = 0;
  }

  draw();
  requestAnimationFrame(update)
}

update();
