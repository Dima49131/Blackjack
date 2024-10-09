const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 455;
canvas.height = 620;

let isGameRunning = false;

let initialHealth = 10;

// Paddle properties
const paddle = {
    width: 80, // 80
    height: 10,
    x: (canvas.width - 75) / 2,
    y: canvas.height - 30,
    color: "#FFFFFF",
};

// Draw paddle
function drawPaddle(paddleColor) {
    ctx.fillStyle = paddleColor;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

const BASE_SPEED = 1;
const SPEED_INCREMENT = 0.2;  // speed per level

// Ball properties
class Ball {
    constructor(x, y, radius, specialFilterNum) {
        this.x = x;
        this.y = y;
        this.color = "##FFFFFF";
        this.radius = radius;
        this.setRandomVelocity();
        this.specialFilterNum = specialFilterNum; 
        this.timer = 0;

    }

    setRandomVelocity() {
        this.dx = (Math.random() * 4 - 2) * (BASE_SPEED + (level - 1) * SPEED_INCREMENT); // Speed increases with each level
        this.dy = -((Math.random() * 2 + 2) * (BASE_SPEED + (level - 1) * SPEED_INCREMENT)); // Faster upwards
    }


    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    
        // Check if the ball is special
        if (this.specialFilterNum === 1) {
            ctx.fillStyle = "cyan"; // Change color for special ball
            ctx.strokeStyle = "cyan"; // Outline color for special ball
            ctx.lineWidth = 0; // Outline width for special ball
            ctx.stroke(); // Draw the outline
        } else if (this.specialFilterNum == 2){
            this.radius = 10;
            ctx.fillStyle = "gold"; // Change color for special ball
            ctx.strokeStyle = "yellow"; // Outline color for special ball
            ctx.lineWidth = 4; // Outline width for special ball
            ctx.stroke(); // Draw the outline
        } 
        
        else {
            ctx.fillStyle = this.color; // Default color for regular balls
        }
    
        ctx.fill(); // Fill the ball
        ctx.closePath();
    }
    

    update() {
        this.x += this.dx;
        this.y += this.dy;

        this.checkWallCollision();
        this.checkPaddleCollision();
        this.checkReset();
    }

    checkWallCollision() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) { this.dx = -this.dx; }       
        if (this.y - this.radius < 0) {this.dy = -this.dy; }}    

    checkPaddleCollision() {
        if (this.y + this.radius > paddle.y && this.isCollidingWithPaddle()) {
            this.dy = -this.dy;
            this.y = paddle.y - this.radius;
        }
    }

    isCollidingWithPaddle() { return this.x > paddle.x && this.x < paddle.x + paddle.width; }

    checkReset() {
        if (this.y + this.radius > canvas.height) {
            
            if (this.specialFilterNum == 2){
                this.remove();
            } else {
                health--;
            }

            if (health > 0){

                if (this.specialFilterNum == 0){
                    this.reset();
                } 
                else if (this.specialFilterNum == 1){
                    this.remove();
                }

            } else {
                isGameRunning = false; 
            }
        }
    }

    reset() {
        this.x = canvas.width / 2;
        this.y = canvas.height - 30;
        this.setRandomVelocity();
    }

    remove() {
        const index = balls.indexOf(this);
        if (index > -1) {
            balls.splice(index, 1); // Remove the ball from the array
            console.log("Special ball removed!"); // Optional logging
        }
    }
}


const colorScoreMap = {
    "#E74C3C": 40, // Red 
    "#F1C40F": 30, // Yellow 
    "#2ECC71": 20, // Green 
    "#3498DB": 10  // Blue 
};
// Brick class
class Brick {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isHit = false;
        this.opacity = 1.0; 
        this.color = color; 
        this.specialFilterNum = 0; 


    }

    draw() {
        ctx.save(); // Save the current canvas state
        ctx.globalAlpha = this.isHit ? 0.2 : 1.0; // Set opacity based on hit state
        ctx.fillStyle = this.isHit ? "#FFFFFF" : this.color; // Use assigned color or hit color
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
         // Draw outline if the brick is special
         if (this.specialFilterNum == 1) {
            ctx.strokeStyle = "cyan"; // Set outline color
            ctx.lineWidth = 2; // Set outline width
            ctx.strokeRect(this.x, this.y, this.width, this.height); // Draw the outline
        }
        if (this.specialFilterNum == 2) {
            ctx.strokeStyle = "red"; // Set outline color
            ctx.lineWidth = 2; // Set outline width
            ctx.strokeRect(this.x, this.y, this.width, this.height); // Draw the outline
        }
        if (this.specialFilterNum == 3) {
            ctx.strokeStyle = "yellow"; // Set outline color
            ctx.lineWidth = 4; // Set outline width
            ctx.strokeRect(this.x, this.y, this.width, this.height); // Draw the outline
        }
        ctx.restore(); // Restore to the previous canvas state
    }

    checkCollision(ball) {
        if (!this.isHit && ball.x + ball.radius > this.x && ball.x - ball.radius < this.x + this.width &&
            ball.y + ball.radius > this.y && ball.y - ball.radius < this.y + this.height) {
            ball.dy = -ball.dy;
            this.isHit = true;
            // Increment score based on the brick's color
            score += colorScoreMap[this.color];
            
            if (this.specialFilterNum == 1) {
                createBall("special"); // Call the function to create a new ball
            }
            if (this.specialFilterNum == 2) {
                if (health < initialHealth){
                    health +=1;
                }
            }
            if (this.specialFilterNum == 3){

                score += 100;
                for (let i = 0; i < 20; i++) {
                    createBall("golden");                    
                }


            }
            
            return true; // Indicate a hit
        }
        return false; // No hit
    }
    makeSpecial(number) {
        this.specialFilterNum = number; // Set the brick as special
    }
}



// Arrays to hold balls and bricks
const balls = [];
const bricks = [];

// Function to create a new ball
function createBall(filter) {
    let specialFilter = 0;
    
    if (filter == "special"){specialFilter = 1;}
    if (filter == "golden"){specialFilter = 2;}

    const radius = 5;
    const x = canvas.width / 2;
    const y = canvas.height - 30;
    balls.push(new Ball(x, y, radius, specialFilter));
}


function createBricks() {
    bricks.length = 0; // Clear existing bricks
    const rows = 8;
    const cols = 9;
    const brickWidth = 45;
    const brickHeight = 15;
    const padding = 5;
    const initialHeight = 80;

    // Define special chance probabilities based on level
    const specialChances = getSpecialChancesForLevel(level);

    const colors = [
        "#E74C3C",  // Red
        "#E74C3C",
        "#F1C40F", // Yellow
        "#F1C40F", 
        "#2ECC71", // Green
        "#2ECC71", 
        "#3498DB", // Blue
        "#3498DB", 
    ];

    // Create bricks grid
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const x = c * (brickWidth + padding) + padding;
            const y = r * (brickHeight + padding) + initialHeight;
            const color = colors[r % colors.length]; // Cycle through colors

            const brick = new Brick(x, y, brickWidth, brickHeight, color);

            const specialType = getSpecialType(specialChances);
            if (specialType) {
                brick.makeSpecial(specialType);
            }

            bricks.push(brick);
        }
    }
}


/**
 * index 0 : cyan outline - spawns 1 ball
 * index 1 : red outline - gives 1 health
 * index 2 : gold outline - spawns 20 coin balls
 */
// Mapping of levels to special chances, now using arrays without explicitly specifying types
const levelSpecialChancesMap = {
    1: [0.05, 0.01, 0.01], // Type 1 has 5%, Type 2 has 1%, Type 3 has 1%
    2: [0.1, 0.05, 0.005],
    3: [0.3, 0.25, 0.005],
    default: [0.05, 0.025, 0.005],
};

// Function to return special chances based on level
function getSpecialChancesForLevel(level) {
    return levelSpecialChancesMap[level] || levelSpecialChancesMap.default;
}

// Function to determine if a brick should be special and its type
function getSpecialType(specialChances) {
    for (let i = 0; i < specialChances.length; i++) {
        if (Math.random() < specialChances[i]) {
            return i + 1;  // The type is determined by the index (1-based index)
        }
    }
    return null; // No special type
}

// Function to reset balls
function resetBalls() {
    balls.length = 0; // Clear existing balls    
    createBall();
}


function drawHealthBar() {
    const barWidth = 100;  // Fixed width of the health bar
    const barHeight = 15;  // Height of the health bar
    const x = (canvas.width - barWidth) / 2;  // Center the health bar
    const y = 10;  // Position from the top of the canvas
    
    const maxHealth = initialHealth;  // Set the maximum health for the player (can be any value)

    // Red --> empty health (background)
    ctx.fillStyle = "#FF0000"; 
    ctx.fillRect(x, y, barWidth, barHeight);

    // Green --> current health left
    ctx.fillStyle = "#00FF00";  
    const healthWidth = (health / maxHealth) * barWidth;  
    ctx.fillRect(x, y, healthWidth, barHeight);

    // Draw health label
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Health", x - 60, y + 12);
}

/* Main Variables */
let score = 0;
let level = 1;
let health = initialHealth; 

// Start game
document.getElementById('startButton').addEventListener('click', () => {
    if (isGameRunning == false){
        fadeOutTitleScreen();
        isGameRunning = true;
        initializeGameState();
    }
});

function fadeOutTitleScreen() {
    const titleScreen = document.getElementById('titleScreen');
    const gameCanvas = document.getElementById('gameCanvas');

    titleScreen.classList.add('hidden');  // Add the hidden class to trigger fade-out

    // After the fade-out is complete
    setTimeout(() => {
        gameCanvas.style.opacity = 1;  // Fade-in the game canvas
        gameCanvas.style.visibility = 'visible';  // Ensure it's visible
    }, 1000);  // The timeout matches the duration of the CSS transition
}

function initializeGameState(){
    score = 0;
    level = 1;
    health = initialHealth;
    createBricks();
    resetBalls(); 
    gameLoop();
} 


function gameLoop() {
    if (!isGameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // background
    ctx.fillStyle = "#000000"; // Change this to your desired color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas

    const step = 5;

    drawPaddle(paddle.color);
    if (moveLeft) { paddle.x = Math.max(0, paddle.x - step); }
    if (moveRight) { paddle.x = Math.min(canvas.width - paddle.width, paddle.x + step); }

    balls.forEach(ball => {
        ball.update();
        ball.draw();
        bricks.forEach(brick => {
            brick.checkCollision(ball);
        });
    });

    bricks.forEach(brick => brick.draw());
    
    if (bricks.every(brick => brick.isHit)) {
        console.log("Level Complete");
        level += 1;
        health = initialHealth;
        createBricks(); 
        resetBalls();
    }


    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF"; 
    ctx.fillText("Score: " + score, 8, 20); 
    ctx.fillText("Level: " + level, canvas.width - 80, 20);

    drawHealthBar();

    // If health reaches 0, stop the game and display Game Over
    if (health <= 0) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "#FF0000";
        ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);
        return; // Exit the game loop
    }

    requestAnimationFrame(gameLoop);
}

let moveLeft = false;
let moveRight = false;

document.addEventListener('keydown', (event) => {
    moveLeft = event.key === 'ArrowLeft' || event.key === 'a';
    moveRight = event.key === 'ArrowRight' || event.key === 'd';
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'a') moveLeft = false;
    if (event.key === 'ArrowRight' || event.key === 'd') moveRight = false;
});

canvas.addEventListener('mousemove', (event) => {
    const relativeX = event.clientX - canvas.getBoundingClientRect().left;
    paddle.x = Math.max(0, Math.min(relativeX - paddle.width / 2, canvas.width - paddle.width));
});
