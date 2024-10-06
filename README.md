# Brick Breaker Game

Welcome to the **Brick Breaker Game**! This is a classic arcade game built using TypeScript, HTML5, and Canvas, where you control a paddle to bounce a ball and break bricks.

## [Play Now](https://brickbreaker.aronteh.com/)

## Table of Contents

- [Brick Breaker Game](#brick-breaker-game)
  - [Play Now](#play-now)
  - [Table of Contents](#table-of-contents)
  - [Game Description](#game-description)
  - [Features](#features)
  - [How to Play](#how-to-play)
  - [Installation and Setup](#installation-and-setup)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Deployment](#deployment)
  - [Technologies Used](#technologies-used)

## Game Description

In this game, your objective is to destroy all the bricks on the screen by bouncing a ball off a paddle. Each brick has a different color and point value. The game becomes progressively more challenging as you advance through the levels.

## Features

- **Dynamic Levels**: The game increases in difficulty with each level, adding more rows of bricks and increasing the ball's speed.
- **Scoring System**: Earn points by destroying bricks. Different colored bricks have different point values.
- **Lives System**: Start with 3 lives. Gain extra lives by clearing levels.
- **Colorful Bricks**: Bricks come in different colors, each with unique point values.
- **Responsive Controls**: Move the paddle using the left and right arrow keys.
- **Start and Game Over Screens**: The game includes a start screen and a game over screen displaying your final score.
- **Deployed on Vercel**: Easily accessible online via Vercel deployment.

## How to Play

1. **Start the Game**: Press **Enter** on the start screen to begin.
2. **Move the Paddle**: Use the **Left Arrow** and **Right Arrow** keys to move the paddle.
3. **Bounce the Ball**: Prevent the ball from falling off the screen by bouncing it off the paddle.
4. **Destroy Bricks**: Aim to destroy all the bricks by hitting them with the ball.
5. **Advance Levels**: Clear all bricks to advance to the next level, where the game becomes more challenging.
6. **Game Over**: The game ends when you lose all your lives.

## Installation and Setup

### Prerequisites

- **Node.js** and **npm** installed on your machine.

### Steps

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/brick-breaker-game.git
cd brick-breaker-game
```

2. Install Dependencies

```bash
npm install
```

3. Build the Project

```bash
npm run build
```

4. Run the Game Locally

You can use any static server to serve the dist directory. Here's an example using http-server:

```bash
npm install -g http-server
http-server public
```

Open your browser and navigate to http://localhost:8080 (or the port specified by http-server).

## Deployment

The game is configured for deployment on Vercel. After pushing your code to GitHub, you can import the repository into Vercel and deploy it using the following settings:

- Build Command: `npm run build`
- Output Directory: `public`
- Install Command: `npm install`

## Technologies Used

- TypeScript
- HTML5 Canvas
- CSS
- Vercel

> Enjoy the game, and happy brick breaking!
