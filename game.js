var size = 50;
var canvasWidth = 1200;
var canvasHeight = 800;

var rectagnles = [];
var random;
var brojPogodenih = 0;

function startGame() {
    var min = 6;
    var max = 12;
    random = Math.floor(Math.random() * (max - min + 1)) + min;
    for (var i = 0; i < random; i++) {
        var x = Math.floor(Math.random() * (canvasWidth - size)) + size;
        var y = Math.floor(Math.random() * (canvasHeight - size)) + size;
        var rect = new component(size, size, "red", x, y);
        rectagnles.push(rect);
    }
    var context = myGameArea.context;
    myGameArea.start()
}

var myGameArea = {
    canvas : document.getElementById("myCanvas"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.canvas.style.border = "1px solid";
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        this.canvas.addEventListener('click', function(event) {
            var x = event.offsetX;
            var y = event.offsetY;
            for (var i = 0; i < rectagnles.length; i++) {
                var rect = rectagnles[i];
                if (x > rect.x - rect.width / 2 && x < rect.x + rect.width / 2 && y > rect.y - rect.height / 2 && y < rect.y + rect.height / 2) {
                    rect.onclick();
                }
            }
        }, false);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    const speedX = Math.floor(Math.random() * 5) + 1;
    const speedY = Math.floor(Math.random() * 5) + 1;
    this.width = width;
    this.height = height;
    this.speed_x = speedX;
    this.speed_y = speedY;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
    this.onclick = function() {
        if (brojPogodenih < rectagnles.length) {
            brojPogodenih++;
        }
        var index = rectagnles.indexOf(this);
        if (index > -1) {
            rectagnles.splice(index, 1);
        }
        updateGameArea();
    }
    this.newPos = function() {
        // random broj izmedu -2 i 2 koji se dodaje na x i y brzinu
        var randomXChange = Math.floor(Math.random() * 5) - 2;
        var randomYChange = Math.floor(Math.random() * 5) - 2;
        if (this.x - this.width / 2 < 0)
            this.speed_x = speedX + randomXChange;
        else if ((this.x + this.width / 2) >= myGameArea.context.canvas.width)
            this.speed_x = -speedX - randomXChange;
        if (this.y - this.height / 2 < 0)
            this.speed_y = -speedY - randomYChange;
        else if ((this.y + this.height / 2) >= myGameArea.context.canvas.height)
            this.speed_y = speedY + randomYChange;
        this.x += this.speed_x;
        this.y -= this.speed_y;
    }
}

function updateGameArea() {
    myGameArea.clear();
    var context = myGameArea.context;
    context.font = "30px Arial";
    context.fillStyle = "black";
    context.textAlign = "right";
    context.fillText("Generirano: " + rectagnles.length, canvasWidth - 10, 30);
    context.fillText("Pogodeno: " + brojPogodenih, canvasWidth - 10, 60);
    for (var i = 0; i < rectagnles.length; i++) {
        rectagnles[i].newPos();
        rectagnles[i].update();
    }
}
