
   // get a random integer between the range of [min,max]
   function getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
   }
  
   // generate a new tetromino sequence
   function generateSequence() {
     const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
     while (sequence.length) {
       const rand = getRandomInt(0, sequence.length - 1);
       const name = sequence.splice(rand, 1)[0];
       tetrominoSequence.push(name);
     }
   }
  
   // get the next tetromino in the sequence
   function getNextTetromino() {
     if (tetrominoSequence.length === 0) {
       generateSequence();
     }
     const name = tetrominoSequence.pop();
     const matrix = tetrominos[name];
     const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);
     const row = name === 'I' ? -1 : -2;
     return { name, matrix, row, col };
   }
  
   // rotate an NxN matrix 90deg
   function rotate(matrix) {
     const N = matrix.length - 1;
     return matrix.map((row, i) =>
       row.map((val, j) => matrix[N - j][i])
     );
   }
  
   // check to see if the new matrix/row/col is valid
   function isValidMove(matrix, cellRow, cellCol) {
     for (let row = 0; row < matrix.length; row++) {
       for (let col = 0; col < matrix[row].length; col++) {
         if (matrix[row][col] && (
             cellCol + col < 0 ||
             cellCol + col >= playfield[0].length ||
             cellRow + row >= playfield.length ||
             playfield[cellRow + row][cellCol + col])
           ) {
           return false;
         }
       }
     }
     return true;
   }
  
   // place the tetromino on the playfield
   function placeTetromino() {
     let linesCleared = 0;
  
     for (let row = 0; row < tetromino.matrix.length; row++) {
       for (let col = 0; col < tetromino.matrix[row].length; col++) {
         if (tetromino.matrix[row][col]) {
           if (tetromino.row + row < 0) {
               tokenbalance.innerHTML=((parseFloat(tokenbalance.innerHTML) + (parseFloat(tokenvalueplaceholder))/2).toFixed(2))+ " Tokens"
                tokenbalancebrick = parseFloat(tokenbalance.innerHTML)
                localStorage.setItem("balanceupdate",tokenbalancebrick)
             return showGameOver();
           }
           playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
         }
       }
     }
  
     for (let row = playfield.length - 1; row >= 0; ) {
       if (playfield[row].every(cell => !!cell)) {
         linesCleared++;
         for (let r = row; r >= 0; r--) {
           for (let c = 0; c < playfield[r].length; c++) {
             playfield[r][c] = playfield[r-1][c];
           }
         }
       } else {
         row--;
       }
     }
  
     // Update score and increase speed if lines were cleared
     if (linesCleared > 0) {
       updateScore(linesCleared);
       increaseSpeed();
     }
  
     tetromino = getNextTetromino();
   }
  
   // show the game over screen
   function showGameOver() {
     cancelAnimationFrame(rAF);
     gameOver = true;
     playbutton.innerHTML = "Play"
     tokenvalue.innerHTML = "Current Token Value: 0"


  
     context.fillStyle = 'black';
     context.globalAlpha = 0.75;
     context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
  
     context.globalAlpha = 1;
     context.fillStyle = 'white';
     context.font = '36px monospace';
     context.textAlign = 'center';
     context.textBaseline = 'middle';
     context.fillText('GAME OVER!', canvas.width / 2, canvas.height / 2);
  
     context.font = '18px monospace';
     context.fillText('Press Play to Restart', canvas.width / 2, canvas.height / 2 + 40);
   }
  
   // show the intro Start Game screen
   function showIntroScreen() {
     context.fillStyle = 'black';
     context.globalAlpha = 0.75;
     context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);
  
     context.globalAlpha = 1;
     context.fillStyle = 'white';
     context.font = '18px monospace';
     context.textAlign = 'center';
     context.textBaseline = 'middle';
     context.fillText('Press Play to Start', canvas.width / 2, canvas.height / 2);
   }
  
   // reset the game state
   function resetGame() {
      
     for (let row = -2; row < 20; row++) {
       playfield[row] = [];
       for (let col = 0; col < 10; col++) {
         playfield[row][col] = 0;
       }
     }
  
     tetrominoSequence.length = 0;
     tetromino = getNextTetromino();
     gameOver = false;
     count = 0;
     score = 0; // reset score
     speed = initialSpeed; // reset speed
     rAF = requestAnimationFrame(loop);
   }
  
   // update score
   function updateScore(linesCleared) {
     const points = [0, 100, 300, 500, 800]; // score for 0, 1, 2, 3, 4 lines cleared
     score += points[linesCleared];
     playbutton.innerHTML= Math.min(parseFloat((score)/(average*1.3)).toFixed(2),2.00)+" X";
     tokenvalue.innerHTML="Current Token Value: "+Math.min(parseFloat(5*(score)/(average*1.3)).toFixed(2),10.00);
     tokenvalueplaceholder=Math.min(parseFloat(5*(score)/(average*1.3)).toFixed(2),10.00)
    
   }


   let average = 1000
   let tokenvalueplaceholder = 0
   let tokenbalancebrick = 0
   tokenbalance.innerHTML = localStorage.getItem("balanceupdate") + " Tokens"
  
   // increase the speed of the game
   function increaseSpeed() {
     if (speed > minSpeed) {
       speed = Math.max(minSpeed, speed - speedIncrement);
     }
   }
  
   // draw score
   function drawScore() {
     context.fillStyle = 'white';
     context.font = '18px monospace';
     context.textAlign = 'left';
     context.fillText(`Score: ${score}`, 10, 30);
   }
  
   // draw speed (optional)
   function drawSpeed() {
     context.fillStyle = 'white';
     context.font = '18px monospace';
     context.textAlign = 'left';
     context.fillText(`Speed: ${(1000 - speed).toFixed(0)}`, 10, 50);
   }
  
   // Function to handle hard drop (spacebar)
   function hardDrop() {
     while (isValidMove(tetromino.matrix, tetromino.row + 1, tetromino.col)) {
       tetromino.row++;
     }
     placeTetromino();
   }
  
   const canvas = document.getElementById('game');
   const context = canvas.getContext('2d');
   const grid = 25;
   const tetrominoSequence = [];
   const playfield = [];
  
   for (let row = -2; row < 20; row++) {
     playfield[row] = [];
     for (let col = 0; col < 10; col++) {
       playfield[row][col] = 0;
     }
   }
  
   const tetrominos = {
     'I': [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
     'J': [[1,0,0],[1,1,1],[0,0,0]],
     'L': [[0,0,1],[1,1,1],[0,0,0]],
     'O': [[1,1],[1,1]],
     'S': [[0,1,1],[1,1,0],[0,0,0]],
     'Z': [[1,1,0],[0,1,1],[0,0,0]],
     'T': [[0,1,0],[1,1,1],[0,0,0]]
   };
  
   const colors = {
     'I': 'cyan',
     'O': 'yellow',
     'T': 'purple',
     'S': 'green',
     'Z': 'red',
     'J': 'blue',
     'L': 'orange'
   };
  
   let count = 0;
   let tetromino = getNextTetromino();
   let rAF = null;
   let gameOver = false;
   let gameStarted = false;  // New flag for game start
   let score = 0;  // Initialize score
   let initialSpeed = 500;
   let speed = initialSpeed;
   let minSpeed = 200;  // Minimum speed (fastest fall)
   let speedIncrement = 50;  // Amount by which speed decreases as the game progresses
  
   // game loop
   function loop() {
     rAF = requestAnimationFrame(loop);
     context.clearRect(0,0,canvas.width,canvas.height);
  
     if (!gameStarted) {
       showIntroScreen();
       return;
     }
  
     for (let row = 0; row < 20; row++) {
       for (let col = 0; col < 10; col++) {
         if (playfield[row][col]) {
           const name = playfield[row][col];
           context.fillStyle = colors[name];
           context.fillRect(col * grid, row * grid, grid-1, grid-1);
     }
   }
 }


 if (tetromino) {
   if (++count > (speed / 16)) {
     tetromino.row++;
     count = 0;
     if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
       tetromino.row--;
       placeTetromino();
     }
   }


   context.fillStyle = colors[tetromino.name];
   for (let row = 0; row < tetromino.matrix.length; row++) {
     for (let col = 0; col < tetromino.matrix[row].length; col++) {
       if (tetromino.matrix[row][col]) {
         context.fillRect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid-1, grid-1);
       }
     }
   }
 }


 drawScore();
 //drawSpeed();  // Optional, shows the current speed level
}


// Listen for button click to start the game
// Listen for button click to start or restart the game
// Listen for button click to start or restart the game
document.getElementById('playbutton').addEventListener('click', function() {
  
   if (gameOver) {
       let currentBalance = parseFloat(document.getElementById('tokenbalance').innerHTML);
   if (currentBalance >= 5.00) {  // Check if there are enough tokens
     tokenbalance.innerHTML = (currentBalance - 2.00).toFixed(2) + " Tokens"; 
     let tokenbalancepacman = parseFloat(tokenbalance.innerHTML);
     localStorage.setItem("balanceupdate", tokenbalancepacman);
     resetGame();
   }
  
 } else if (!gameStarted) {
   let currentBalance = parseFloat(document.getElementById('tokenbalance').innerHTML);
   if (currentBalance >= 5.00) {
   // Start the game if it hasn't started yet
   gameStarted = true;
   resetGame();}
  
   // Deduct 2 tokens when the game begins
  
   if (currentBalance >= 5.00) {  // Check if there are enough tokens
     tokenbalance.innerHTML = (currentBalance - 5.00).toFixed(2) + " Tokens"; 
     let tokenbalancepacman = parseFloat(tokenbalance.innerHTML);
     localStorage.setItem("balanceupdate", tokenbalancepacman);
   }


   // Update play button and token value UI
   playbutton.innerHTML = Math.min(parseFloat((score) / (average * 1.3)).toFixed(2), 2.00) + " X";
   tokenvalue.innerHTML = "Current Token Value: " + Math.min(parseFloat(5 * (score) / (average * 1.3)).toFixed(2), 10.00);
   tokenvalueplaceholder = Math.min(parseFloat(5 * (score) / (average * 1.3)).toFixed(2), 10.00);
 }
});






// keyboard controls
document.addEventListener('keydown', function(e) {


 // Prevent default behavior for certain keys (arrow keys and spacebar)
 if ([32, 37, 38, 39, 40].includes(e.which)) {
   e.preventDefault();
 }


 if (gameOver && e.which === 3002) {
   resetGame();
   return;
 }


 if (gameOver || !gameStarted) return; // Game won't start until button is clicked


 if (e.which === 37 || e.which === 39) {
   const col = e.which === 37 ? tetromino.col - 1 : tetromino.col + 1;
   if (isValidMove(tetromino.matrix, tetromino.row, col)) {
     tetromino.col = col;
   }
 }


 if (e.which === 38) {
   const matrix = rotate(tetromino.matrix);
   if (isValidMove(matrix, tetromino.row, tetromino.col)) {
     tetromino.matrix = matrix;
   }
 }


 if (e.which === 40) {
   const row = tetromino.row + 1;
   if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
     tetromino.row = row - 1;
     placeTetromino();
     return;
   }
   tetromino.row = row;
 }


 // Hard drop (spacebar)
 if (e.which === 32) {
   hardDrop();
 }
});




// Start the game loop with the intro screen
rAF = requestAnimationFrame(loop);