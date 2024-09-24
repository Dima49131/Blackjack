const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

// Define game states
const states = {
START: 'start',
PLAYING: 'playing',
GAME_OVER: 'game_over',
PAUSED: 'paused' // New paused state
};


let gameState = states.START;

// Brick level configuration
const level1 = [
  [],
  [],
  [],
  [],
  [],
  [],
  ['R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
  ['R','Y','R','R','R','R','R','R','R','R','R','R','R','R'],
  ['O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
  ['O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
  ['G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
  ['G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
  ['Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y'],
  ['Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y']
];

const colorMap = {
  'R': 'red',
  'O': 'orange',
  'G': 'green',
  'Y': 'yellow'
};

const pointsMap = {
  'R': 25,
  'O': 20,
  'G': 15,
  'Y': 10
};

const brickGap = 2;
const brickWidth = 25;
const brickHeight = 12;
const wallSize = 12;
const bottomWallSize = 50;
const bricks = [];
let score = 0;
let level = 1;  // Track the current level

// Function to create the bricks for the game
function createBricks() {
  bricks.length = 0;
  for (let row = 0; row < level1.length; row++) {
    for (let col = 0; col < level1[row].length; col++) {
      const colorCode = level1[row][col];
      if (colorCode) {
        bricks.push({
          x: wallSize + (brickWidth + brickGap) * col,
          y: wallSize + (brickHeight + brickGap) * row,
          color: colorMap[colorCode],
          width: brickWidth,
          height: brickHeight,
          points: pointsMap[colorCode]
        });
      }
    }
  }
}

createBricks();

const paddle = {
  x: canvas.width / 2 - brickWidth,
  y: 440,
  width: brickWidth * 2,
  height: brickHeight,
  dx: 0
};

const ball = {
  x: 130,
  y: 260,
  width: 5,
  height: 5,
  speed: 4,
  dx: 0,
  dy: 0
};

tokenbalance.innerHTML = localStorage.getItem("balanceupdate") + " Tokens"
// Function to reset the game when the ball falls below the screen
function resetGame() {
  tokenbalance.innerHTML=(parseFloat(tokenbalance.innerHTML) + parseFloat(tokenvalueplaceholder)).toFixed(2)+ " Tokens"
  tokenbalancebrick = parseFloat(tokenbalance.innerHTML)
  localStorage.setItem("balanceupdate",tokenbalancebrick)
  score = 0;
  ball.x = 130;
  ball.y = 260;
  ball.dx = 0;
  ball.dy = 0;
  paddle.x = canvas.width / 2 - paddle.width / 2;
  level = 1;  // Reset the level
  ball.speed = 4;  // Reset the ball speed
  createBricks();
  gameState = states.START; // Go back to start screen
  playbutton.disabled = true;
}

// Check for collision between two objects using AABB collision detection
function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

// Check if all bricks are cleared and start the next level
function checkLevelComplete() {
  if (bricks.length === 0) {
    level++;  // Increment level
    ball.speed++;  // Increase ball speed
    ball.dx = ball.speed * (ball.dx > 0 ? 1 : -1);  // Maintain ball's direction
    ball.dy = ball.speed * (ball.dy > 0 ? 1 : -1);
    createBricks();  // Recreate bricks for the new level
  }
}

// Main game loop
function loop() {

    setTimeout(() => {
        requestAnimationFrame(loop);
      }, 10);
      
      context.clearRect(0, 0, canvas.width, canvas.height);



  if (gameState === states.PLAYING) {
    playbutton.innerHTML= Math.min(parseFloat((score)/(average*1.3)).toFixed(2),2.00)+" X";
    tokenvalue.innerHTML="Current Token Value: "+Math.min(parseFloat(2*(score)/(average*1.3)).toFixed(2),4.00);
    tokenvalueplaceholder=Math.min(parseFloat(2*(score)/(average*1.3)).toFixed(2),10.00)


  }
  else {
    playbutton.innerHTML = "Play";
    tokenvalue.innerHTML="Current Token Value: 0"
   
  }
 

   






  // Draw the game elements in the background
  drawGame();

  if (gameState === states.START) {
    // Draw start screen overlay
    context.fillStyle = 'rgba(0, 0, 0, 0.75)'; // Semi-transparent black overlay
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText('Press Play to Begin', 100, canvas.height / 2);
    playbutton.disabled = false;
   
   
  }
}


let average = 200
let tokenvalueplaceholder = 0
let tokenbalancebrick = 0

// Draw the game components (walls, paddle, ball, bricks, score, level)
function drawGame() {
  // Move paddle


 




  paddle.x += paddle.dx;

  if (paddle.x < wallSize) {
    paddle.x = wallSize;
  } else if (paddle.x + paddle.width > canvas.width - wallSize) {
    paddle.x = canvas.width - wallSize - paddle.width;
  }

  // Move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x < wallSize) {
    ball.x = wallSize;
    ball.dx *= -1;
  } else if (ball.x + ball.width > canvas.width - wallSize) {
    ball.x = canvas.width - wallSize - ball.width;
    ball.dx *= -1;
  }

  if (ball.y < wallSize) {
    ball.y = wallSize;
    ball.dy *= -1;
  }

  if (ball.y > canvas.height) {
    resetGame();
  }

  if (collides(ball, paddle)) {
    ball.dy *= -1;
    ball.y = paddle.y - ball.height;
  }

  for (let i = 0; i < bricks.length; i++) {
    const brick = bricks[i];

    if (collides(ball, brick)) {
      score += brick.points;
      bricks.splice(i, 1);

      if (ball.y + ball.height - ball.speed <= brick.y || ball.y >= brick.y + brick.height - ball.speed) {
        ball.dy *= -1;
      } else {
        ball.dx *= -1;
      }
      break;
    }
  }

  // Draw the ball
  if (ball.dx || ball.dy) {
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
  }

  // Draw the bricks
  bricks.forEach(function(brick) {
    context.fillStyle = brick.color;
    context.fillRect(brick.x, brick.y, brick.width, brick.height);
  });

  // Draw the paddle
  context.fillStyle = 'cyan';
  context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  // Draw the walls
  context.fillStyle = 'grey';
  context.fillRect(0, 0, canvas.width, wallSize); // Top wall
  context.fillRect(0, 0, wallSize, canvas.height); // Left wall
  context.fillRect(canvas.width - wallSize, 0, wallSize, canvas.height); // Right wall
  context.fillRect(0, canvas.height - wallSize, canvas.width,bottomWallSize); // Bottom wall
  context.fillRect(0, canvas.height - wallSize - wallSize, canvas.width,bottomWallSize);
  context.fillRect(0, canvas.height - wallSize - 2*(wallSize), canvas.width,bottomWallSize);
  context.fillRect(0, canvas.height - wallSize - 3*(wallSize), canvas.width,bottomWallSize);
  context.fillRect(0, canvas.height - wallSize - 4*(wallSize), canvas.width,bottomWallSize);
  context.fillRect(0, canvas.height - wallSize - 5*(wallSize), canvas.width,bottomWallSize);
  context.fillRect(0, canvas.height - wallSize - 6*(wallSize), canvas.width,bottomWallSize);
  context.fillRect(0, canvas.height - wallSize - 7*(wallSize), canvas.width,bottomWallSize);


  // Draw the score
  context.fillStyle = 'white';
  context.font = '16px Arial';
  context.fillText('Score: ' + score, 20, 30);

  // Draw the level
  context.fillText('Level: ' + level, canvas.width - 80, 30);

  checkLevelComplete();  // Check if all bricks are cleared and advance to the next level
}

// Keyboard event listeners for controlling the paddle and starting the game
document.addEventListener('keydown', function(e) {
  if (e.which === 3001 && gameState === states.START) {  // Space key to start the game
    gameState = states.PLAYING;
    ball.dx = ball.speed;
    ball.dy = ball.speed;
  }

  if (gameState === states.PLAYING) {
    if (e.which === 37) { // Left arrow key
      paddle.dx = -7;
    } else if (e.which === 39) { // Right arrow key
      paddle.dx = 7;
    }
  }
});


document.addEventListener('mousemove', function(e) {
    if (gameState === states.PLAYING) {
        // Center the paddle on the mouse
        paddle.x = e.clientX-280;  
    }
});


document.addEventListener('keyup', function(e) {
  if (e.which === 37 || e.which === 39) {
    paddle.dx = 0;
  }
});

// Start the game loop
requestAnimationFrame(loop);




document.getElementById('playbutton').addEventListener('click', startGame);




function startGame() {
let currentBalance = parseFloat(tokenbalance.innerHTML);  // Get the current token balance as a number


if (currentBalance >= 2) {
    if (gameState === states.START) {
        gameState = states.PLAYING;  // Change state to playing
        ball.dx = ball.speed;        // Start ball movement
        ball.dy = ball.speed;


        // Deduct 2 tokens from the balance
        tokenbalance.innerHTML = (currentBalance - 2.00).toFixed(2) + " Tokens"; 
        tokenbalancepacman = parseFloat(tokenbalance.innerHTML);
        localStorage.setItem("balanceupdate", tokenbalancepacman);


        // Hide any token-related warning message if it was shown before
        document.getElementById('tokenMessage').innerHTML = "";  // Assuming you have an element with id 'tokenMessage'
    }
} else if (currentBalance < 2) {
    if (gameState === states.START) {
        // Show "Add more Tokens to Play" message in the HTML
        playbutton.innerHTML = "Plahgy";
        console.log("dfdfdfd")
    }
}
}




