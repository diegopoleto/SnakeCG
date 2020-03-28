
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const map = {
    scale: 30,
    x: 24,
    y: 16
}
canvas.height = map.y * map.scale;
canvas.width = map.x * map.scale;

//Seta a posição de cada snake
//A velocidade inicial da snake
let snake = {
    speed: 100,
    position: [
        {x: 3, y: 3},
        {x: 2, y: 3},
        {x: 1, y: 3}
    ],
    position2: [
        {x: 3, y: 6},
        {x: 2, y: 6},
        {x: 1, y: 6}
    ],
    direction: "right",
    lastDirection: "right",
    direction2: "right",
    lastDirection2: "right",
}

let food = {
    position: undefined,
    
}

let time = setTimeout(menu, 100);

function game() {
    moveSnake(); 
    moveSnake2();
    checkcollisionFood();
    snakeBorder(snake.position[0]);
    snakeBorder(snake.position2[0]);
    checkcollisionFood();
    if (collision() || collision2() || collision3(snake.position, snake.position2)) {
        clearInterval(time);
        restart();
        endGameMenu();
        return;
    }
    drawMap();
    drawSnake();
    drawFood();
    snake.lastDirection = snake.direction;
    snake.lastDirection2 = snake.direction2;
}

function startGame() {
    clearInterval(time);
    canvas.removeEventListener("click", startGame, false);
    time = setInterval(game, snake.speed);
}

function menu() {
    drawMap();
    drawMenu();
    canvas.addEventListener("click", startGame, false);
}

function endGameMenu() {
    ctx.textAlign = 'center';
    ctx.font = "50px Arial";
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fillText("Click to play again! :)", canvas.width / 2, canvas.height / 2);
    canvas.addEventListener("click", startGame, false);
}

function drawMap() {
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let background = new Image();
        background.src = 'https://www.tynker.com/projects/images/5ca79e0d60ba6f5629698de0/background-scene---backgrnd.png';
    ctx.fillStyle = ctx.createPattern(background, 'repeat');
    ctx.fillRect(0, 0, map.x * map.scale, map.y * map.scale);
}

function drawMenu() {
    ctx.textAlign = 'center';
    ctx.font = "40px Arial";
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.fillText("Click to play!", canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = "rgb(255,0,0)";
}

function drawSnake() {
  
    for (let i = 0; i < snake.position.length; i++) {
        ctx.fillStyle = 'rgb(0,0,0)';
        var circle = new Path2D();
        circle.arc(snake.position[i].x * map.scale + 15, snake.position[i].y * map.scale + 15, 15, 0, 2 * Math.PI);

        ctx.fill(circle);
    }
    for (let i = 0; i < snake.position2.length; i++) {
        ctx.fillStyle = 'rgb(255,255,255)';
        var circle = new Path2D();
        circle.arc(snake.position2[i].x * map.scale + 15, snake.position2[i].y * map.scale + 15, 15, 0, 2 * Math.PI);

        ctx.fill(circle);
    }
}

function drawFood() {
  
    if (food.position === undefined) {
        do {
            food.position = {
                x: randomNum(map.x),
                y: randomNum(map.y)
            }
        } while (foodInSnake(food.position));
    }
    ctx.fillStyle = 'rgb(220,20,60)';
    var circle = new Path2D();
        circle.arc(food.position.x * map.scale + 15, food.position.y * map.scale + 15, 15, 0, 2 * Math.PI);

        ctx.fill(circle);
  
}

function moveSnake() {
    switch (snake.direction) {
        case 'right':
            snake.position.unshift({x: snake.position[0].x + 1, y: snake.position[0].y});
            break;
        case 'left':
            snake.position.unshift({x: snake.position[0].x - 1, y: snake.position[0].y});
            break;
        case 'up':
            snake.position.unshift({x: snake.position[0].x, y: snake.position[0].y - 1});
            break;
        case 'down':
            snake.position.unshift({x: snake.position[0].x, y: snake.position[0].y + 1});
            break;
        default:
            console.log('Error moveSnake()');
    }
    snake.position.pop();
}

function moveSnake2() {
    switch (snake.direction2) {
        case 'right':
            snake.position2.unshift({x: snake.position2[0].x + 1, y: snake.position2[0].y});
            break;
        case 'left':
            snake.position2.unshift({x: snake.position2[0].x - 1, y: snake.position2[0].y});
            break;
        case 'up':
            snake.position2.unshift({x: snake.position2[0].x, y: snake.position2[0].y - 1});
            break;
        case 'down':
            snake.position2.unshift({x: snake.position2[0].x, y: snake.position2[0].y + 1});
            break;
        default:
            console.log('Error moveSnake()');
    }
    snake.position2.pop();
}

window.addEventListener('keydown', function (event) {
    switch (event.code) {
        case 'ArrowLeft':
            if (snake.direction !== "right" && snake.lastDirection !== "right") {
                snake.direction = "left";
            }
            break;
        case 'KeyA':
            if (snake.direction2 !== "right" && snake.lastDirection2 !== "right") {
                snake.direction2 = "left";
            }
            break;
        case 'ArrowUp':
            if (snake.direction !== "down" && snake.lastDirection !== "down") {
                snake.direction = "up";
            }
            break;
        case 'KeyW':
            if (snake.direction2 !== "down" && snake.lastDirection2 !== "down") {
                snake.direction2 = "up";
            }
            break;
        case 'ArrowRight':
            if (snake.direction !== "left" && snake.lastDirection !== "left") {
                snake.direction = "right";
            }
            break;
        case 'KeyD':
            if (snake.direction2 !== "left" && snake.lastDirection2 !== "left") {
                snake.direction2 = "right";
            }
            break;
        case 'ArrowDown':
            if (snake.direction !== "up" && snake.lastDirection !== "up") {
                snake.direction = "down";
            }
            break;
        case 'KeyS':
            if (snake.direction2 !== "up" && snake.lastDirection2 !== "up") {
                snake.direction2 = "down";
            }
            break;
        default:
            break;
    }
}, false);

function snakeBorder(snakeHead) {
    if (snakeHead.x === -1) {
        snakeHead.x = map.x - 1;
    }
    if (snakeHead.x === map.x){
        snakeHead.x = 0;
    }
    if (snakeHead.y === -1) {
        snakeHead.y = map.y - 1;
    }
    if (snakeHead.y === map.y){
        snakeHead.y = 0;
    }
}

function randomNum(max) {
    return Math.floor(Math.random() * max);
}

function foodInSnake(foodPos) {
    for (let i = 0; i < snake.position.length; i++) {
        if (snake.position[i].x === foodPos.x && snake.position[i].y === foodPos.y) {
            return true;
        }
    }
    return false;
}

function snakeIsOnFood(position) {
    if (position === undefined) {
        return false;
    }
    return (snake.position[0].x === position.x && snake.position[0].y === position.y );
}

function snakeIsOnFood2(position) {
    if (position === undefined) {
        return false;
    }
    return (snake.position2[0].x === position.x && snake.position2[0].y === position.y );
}

function snakeEatFood() {
    food.position = undefined;
  
    snake.position.push({
        x: snake.position[snake.position.length],
        y: snake.position[snake.position.length]
    });
}

function snakeEatFood2() {
    food.position = undefined;
  
    snake.position2.push({
        x: snake.position2[snake.position2.length],
        y: snake.position2[snake.position2.length]
    });
}

function checkcollisionFood() {
    if (snakeIsOnFood(food.position)){
       // scoreUp(10);
        snakeEatFood();
    }
    else if(snakeIsOnFood2(food.position)){
       // scoreUp(10);
        snakeEatFood2();
    }
}

function collision() {
    for (let i = 1; i < snake.position.length; i++) {
        if (snake.position[i].x === snake.position[0].x && snake.position[i].y === snake.position[0].y) {
            return true;   
        }
    }
    return false;
}
function collision2() {
    for (let i = 1; i < snake.position2.length; i++) {
        if (snake.position2[i].x === snake.position2[0].x && snake.position2[i].y === snake.position2[0].y) {
            return true;
        }
    }
    return false;
}
function collision3(position1, position2){
    if (position1.some(position => position2.some(element => element.x === position.x && element.y === position.y))){
        return true; 
    }
    return false;
  
} 

function restart() {
    snake = {
      speed: 100,
      position: [
          {x: 3, y: 3},
          {x: 2, y: 3},
          {x: 1, y: 3}
      ],
      position2: [
          {x: 3, y: 6},
          {x: 2, y: 6},
          {x: 1, y: 6}
      ],
      direction: "right",
      lastDirection: undefined,
      direction2: "right",
      lastDirection2: undefined,
      }
      food = {
          position: undefined,
      }
}