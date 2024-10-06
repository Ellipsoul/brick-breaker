"use strict";
// Get the canvas element and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
// Game states
var GameState;
(function (GameState) {
    GameState[GameState["Start"] = 0] = "Start";
    GameState[GameState["Playing"] = 1] = "Playing";
    GameState[GameState["GameOver"] = 2] = "GameOver";
})(GameState || (GameState = {}));
let currentState = GameState.Start;
// Game variables
let score = 0;
let level = 1;
let lives = 3;
// Paddle properties
const paddleHeight = 10;
const paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleY = canvas.height - paddleHeight - 30; // Move paddle up
// Ball properties
let x = canvas.width / 2;
let y = canvas.height - 60; // Adjusted to be above the paddle
let initialSpeed = 3; // Initial ball speed
let dx = initialSpeed; // Ball's horizontal velocity
let dy = -initialSpeed; // Ball's vertical velocity
const ballRadius = 10;
// Brick properties
let brickRowCount = 5;
const brickColumnCount = 8;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
// Brick types with colors and point values
const brickTypes = [
    { color: "#FF0000", points: 50 }, // Red bricks, 50 points
    { color: "#FFA500", points: 40 }, // Orange bricks, 40 points
    { color: "#FFFF00", points: 30 }, // Yellow bricks, 30 points
    { color: "#008000", points: 20 }, // Green bricks, 20 points
    { color: "#0000FF", points: 10 }, // Blue bricks, 10 points
];
let bricks = [];
// Initialize bricks with random visibility
function initBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            // Randomly decide if a brick should be displayed
            const status = Math.random() > 0.5 ? 1 : 0;
            // Randomly select a brick type
            const brickType = brickTypes[Math.floor(Math.random() * brickTypes.length)];
            bricks[c][r] = {
                x: 0,
                y: 0,
                status: status,
                color: brickType.color,
                points: brickType.points,
            };
        }
    }
}
// Keyboard controls
let rightPressed = false;
let leftPressed = false;
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keydown", keyPressHandler); // For starting/restarting the game
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}
function keyPressHandler(e) {
    if (e.key === "Enter") {
        if (currentState === GameState.Start ||
            currentState === GameState.GameOver) {
            startGame();
        }
    }
}
// Collision detection between ball and bricks
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x + ballRadius > b.x &&
                    x - ballRadius < b.x + brickWidth &&
                    y + ballRadius > b.y &&
                    y - ballRadius < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0; // Hide the brick
                    score += b.points; // Increment score
                }
            }
        }
    }
}
// Check if all bricks are cleared
function areAllBricksCleared() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                return false; // Found a brick that's still visible
            }
        }
    }
    return true; // All bricks are cleared
}
// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
// Draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
// Draw bricks
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                b.x = brickX;
                b.y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = b.color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
// Draw score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + score, 8, 20);
}
// Draw level
function drawLevel() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.fillText("Level: " + level, canvas.width / 2, 20);
}
// Draw lives
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "right";
    ctx.fillText("Lives: " + lives, canvas.width - 85, 20);
}
// Draw start screen
function drawStartScreen() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.fillText("Brick Breaker", canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = "20px Arial";
    ctx.fillText("Press Enter to Start", canvas.width / 2, canvas.height / 2 + 20);
}
// Draw game over screen with final score
function drawGameOverScreen() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 60);
    ctx.font = "24px Arial";
    ctx.fillText("Final Score: " + score, canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = "20px Arial";
    ctx.fillText("Press Enter to Restart", canvas.width / 2, canvas.height / 2 + 30);
}
// Reset ball and paddle positions
function resetBallAndPaddle() {
    x = canvas.width / 2;
    y = canvas.height - 60; // Adjusted to be above the paddle
    // Preserve current speed and randomize horizontal direction
    dx = Math.abs(dx) * (Math.random() > 0.5 ? 1 : -1);
    dy = -Math.abs(dy);
    paddleX = (canvas.width - paddleWidth) / 2;
}
// Start or restart the game
function startGame() {
    // Reset game variables
    score = 0; // Reset the score
    level = 1;
    lives = 3;
    brickRowCount = 5;
    // Set initial speed
    dx = initialSpeed * (Math.random() > 0.5 ? 1 : -1);
    dy = -initialSpeed;
    initBricks();
    resetBallAndPaddle();
    currentState = GameState.Playing;
    draw(); // Start the game loop
}
// Main draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (currentState === GameState.Start) {
        drawStartScreen();
    }
    else if (currentState === GameState.Playing) {
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLevel();
        drawLives();
        collisionDetection();
        // Ball-wall collision
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy < ballRadius) {
            dy = -dy;
        }
        else if (y + dy + ballRadius > paddleY) {
            // Ball-paddle collision
            if (x + ballRadius > paddleX && x - ballRadius < paddleX + paddleWidth) {
                dy = -dy;
            }
            else if (y + dy + ballRadius > canvas.height) {
                lives--;
                if (lives === 0) {
                    currentState = GameState.GameOver;
                }
                else {
                    resetBallAndPaddle();
                }
            }
        }
        x += dx;
        y += dy;
        // Paddle movement
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        }
        else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
        // Check if all bricks are cleared
        if (areAllBricksCleared()) {
            level++; // Increase the level
            // Increase ball speed
            const speedMultiplier = 1.2; // Adjust as desired
            dx *= speedMultiplier;
            dy *= speedMultiplier;
            // Limit maximum speed
            const maxSpeed = 100; // Adjust as desired
            dx = Math.sign(dx) * Math.min(Math.abs(dx), maxSpeed);
            dy = Math.sign(dy) * Math.min(Math.abs(dy), maxSpeed);
            brickRowCount = Math.min(brickRowCount + 1, 10); // Increase rows up to a maximum
            lives += 2; // Grant 2 extra lives
            initBricks(); // Regenerate the bricks
            resetBallAndPaddle(); // Reset ball and paddle positions
        }
        requestAnimationFrame(draw);
    }
    else if (currentState === GameState.GameOver) {
        drawGameOverScreen();
    }
}
// Initial draw call to display the start screen
draw();
