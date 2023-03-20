var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ball = {
    radius: 10,
    x: canvas.width / 2,
    y: canvas.height - 30,
    dx: 2,
    dy: -2
};

var paddle = {
    height: 10,
    width: 75,
    x: (canvas.width - 75) / 2
};

var bricks = {
    rows: 3,
    columns: 5,
    width: 75,
    height: 20,
    padding: 10,
    offsetTop: 30,
    offsetLeft: 30,
    count: 0,
    status: [],
    draw: function () {
        for (var c = 0; c < this.columns; c++) {
            for (var r = 0; r < this.rows; r++) {
                if (this.status[c][r] == 1) {
                    var brickX = (c * (this.width + this.padding)) + this.offsetLeft;
                    var brickY = (r * (this.height + this.padding)) + this.offsetTop;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, this.width, this.height);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
};

var score = {
    value: 0,
    draw: function () {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Pontos: " + this.value, 8, 20);
    }
};

var game = {
        over: false,
        pause: false,
        start: function () {
            bricks.count = bricks.rows * bricks.columns;
            for (var c = 0; c < bricks.columns; c++) {
                bricks.status[c] = [];
                for (var r = 0; r < bricks.rows; r++) {
                    bricks.status[c][r] = 1;
                }
            }
            document.addEventListener("keydown", game.keyDownHandler, false);
            document.addEventListener("keyup", game.keyUpHandler, false);
            requestAnimationFrame(game.draw);
        },
        draw: function () {
                if (game.pause) {
                    return;
                }
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                bricks.draw();
                game.drawBall();
                game.drawPaddle();
                score.draw();
                game.collisionDetection();

                if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
                    ball.dx = -ball.dx;
                }
                if (ball.y + ball.dy < ball.radius) {
                    ball.dy = -ball.dy;
                } else if (ball.y + ball.dy > canvas.height - ball.radius - paddle.height) {
                    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                        ball.dy = -ball.dy;
                    } else {}
                    game.over
                    // Check if ball hits left or right wall
                    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
                        ball.dx = -ball.dx;
                    }
                    // Check if ball hits top wall
                    if (ball.y + ball.dy < ball.radius) {
                        ball.dy = -ball.dy;
                    }
                    // Check if ball hits bottom wall
                    else if (ball.y + ball.dy > canvas.height - ball.radius - paddle.height) {
                        // Check if ball hits paddle
                        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
                            ball.dy = -ball.dy;
                        }
                        // Game over if ball misses paddle
                        else {
                            game.over
                        }
                    }
                }
            }
} 