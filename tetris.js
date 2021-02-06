const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
];

const player = {
  matrix: matrix,
  pos: {x:5, y:5}
}

let lastTime = 0;
let dropCounter = 0;
const dropInterval = 1000;

const arena = createMatrix(12, 20);

function createMatrix(width, height) {
  const matrix = [];
  while (height--) {
    matrix.push(new Array(width).fill(0));
  }
  return matrix;
}

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

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    })
  })
}

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(player.matrix, player.pos);
}

function playerDrop() {
  player.pos.y++;
  dropCounter = 0;
}

function update(time = 0) {
  let deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;

  if (dropCounter > dropInterval) {
    playerDrop();
  }
  draw();
  requestAnimationFrame(update)
}

update();

document.addEventListener('keydown', event => {
  console.log(event)
  if (event.key === "ArrowLeft") {
    player.pos.x--;
  } else if (event.key === "ArrowRight") {
    player.pos.x++;
  } else if (event.key === "ArrowDown") {
    playerDrop();
  }  
})
