// create grid with columns and rows

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }
  
  let grid;
  let cols;
  let rows;
  let resolution = 10;

  function setup() {
    createCanvas(600, 400);
    cols = width / resolution;
    rows = height / resolution;
  
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = floor(random(2));
      }
    }
  }
  
  function draw() {
    background(0);
  
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] == 1) {
          fill(255);
          stroke(0);
          rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }
  
    let next = make2DArray(cols, rows);
  
    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        // Count live neighbors!
        let sum = 0;
        let neighbors = countNeighbors(grid, i, j);
  
        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
  
      }
    }
  
    grid = next;
  }
  
  function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
  }

//Another version of the project
// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');

// const resolution = 10;
// canvas.width = 800;
// canvas.height = 600;

// const COLS = canvas.width / resolution;
// const ROWS = canvas.height / resolution;

// function buildGrid() {
//   return new Array(COLS).fill(null)
//     .map(() => new Array(ROWS).fill(null)
//       .map(() => Math.floor(Math.random() * 2)));
// }

// let grid = buildGrid();

// requestAnimationFrame(update);

// function update() {
//   grid = nextGen(grid);
//   render(grid);
//   requestAnimationFrame(update);
// }

// function nextGen(grid) {
//   const nextGen = grid.map(arr => [...arr]);

//   for (let col = 0; col < grid.length; col++) {
//     for (let row = 0; row < grid[col].length; row++) {
//       const cell = grid[col][row];
//       let numNeighbours = 0;
//       for (let i = -1; i < 2; i++) {
//         for (let j = -1; j < 2; j++) {
//           if (i === 0 && j === 0) {
//             continue;
//           }
//           const x_cell = col + i;
//           const y_cell = row + j;

//           if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
//             const currentNeighbour = grid[col + i][row + j];
//             numNeighbours += currentNeighbour;
//           }
//         }
//       }

//       // rules
//       if (cell === 1 && numNeighbours < 2) {
//         nextGen[col][row] = 0;
//       } else if (cell === 1 && numNeighbours > 3) {
//         nextGen[col][row] = 0;
//       } else if (cell === 0 && numNeighbours === 3) {
//         nextGen[col][row] = 1;
//       }
//     }
//   }
//   return nextGen;
// }

// function render(grid) {
//   for (let col = 0; col < grid.length; col++) {
//     for (let row = 0; row < grid[col].length; row++) {
//       const cell = grid[col][row];

//       ctx.beginPath();
//       ctx.rect(col * resolution, row * resolution, resolution, resolution);
//       ctx.fillStyle = cell ? 'black' : 'white';
//       ctx.fill();
//       // ctx.stroke();
//     }
//   }
// }