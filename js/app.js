var increaseX = 101;
var increaseY = 101;
var win = 0;
var loss = 0;
// Enemies our player must avoid
function getRandomInt(min, max) {
    return Math.ceil(Math.random() * (max - min + 1)) + min;
}

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 20;
    this.width = 50;
    this.height = 85;
    this.speed = Math.random() * 5;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
/*
Enemy.prototype.reset = function()
{
    this.x = 0;
    this.speed = (Math.random() * 5);
    this.y = getRandomInt(80,200);
    
}*/

Enemy.prototype.col = function(object) {
    return (this.x < object.x + object.width  && this.x + this.width  > object.x &&
        this.y < object.y + object.height && this.y + this.height > object.y);    
};


// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (increaseX * dt * this.speed);
    //console.log('enemy x = ', this.x, 'enemy y = ', this.y);    
    if(this.x > 480){
        var posiciones = [100 , 178 , 250];
        this.speed = Math.random() * 5;
        this.x = -50;
        this.y = posiciones[getRandomInt(0,2)];

    }
    if(this.col(player)){
        player.reset();
        loss++;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function getWin()
{
    return win;
}

function getLoss()
{
    return loss;
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(sprite1)
{
    Enemy.call(this);
    this.sprite = sprite1;
    
    this.x = 200;
    this.y = 420;
}

Player.prototype = Object.create(Enemy.prototype);

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 420;
};


Player.prototype.update = function() {
    if(player.y < 0){
        player.reset();
        win++;
    }  
};

Player.prototype.handleInput = function(key)
{
    switch(key){
    case 'left':
    if(this.x > 0){
        this.x -= increaseX;
    }
    break;
    case 'up':
    this.y -= increaseY;
    break;
    case 'right':
    if(this.x < 404){
        this.x += increaseX;    
    }    
    break;
    case 'down':
    if(this.y < 424){
        this.y += increaseY;
    }
    break;    

    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player('images/char-pink-girl.png');
var allEnemies = [];

var i = 0;

while(i < 3){
    var enemy = new Enemy();
    enemy.x = i * increaseX;
    enemy.y = i * increaseY;
    allEnemies.push(enemy);
    i++
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});