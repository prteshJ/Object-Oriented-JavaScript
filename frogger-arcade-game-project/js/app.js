var enemyTracker = 0; // Keeps track of enemy position.
var row1, row2, row3, row4, row5; // Keeps track of enemy rows.
var score = 0; // Keeps track of score.

// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    dt *= 4.5;
    this.x = Math.round(this.x + this.y * 0.25 * dt);
    if (this.x > 400) {
        this.x -= 400;
    }
    enemyTracker = Math.round(this.x);
    this.collisionHelper();
};

// Use Boolean flags to detect which row enemy is currently on.
Enemy.prototype.collisionHelper = function() {
    if (enemyTracker < 80) {
        row1 = true;
    } else if (enemyTracker < 160) {
        row2 = true;
        row1 = row3 = row4 = row5 = false;
    } else if (enemyTracker < 240) {
        row3 = true;
        row1 = row2 = row4 = row5 = false;
    } else if (enemyTracker < 320) {
        row4 = true;
        row1 = row2 = row3 = row5 = false;
    } else if (enemyTracker < 400) {
        row5 = true;
        row1 = row2 = row3 = row4 = false;
    }
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 0;
    this.y = 400;
    this.sprite = 'images/char-boy.png'
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    dt = dt * 5;

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.y > 400) {
        this.y = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y === -50) {
        score += 50;
        alert('You won!' + '\n' + 'Your score: ' + score);
        this.y = 400;
    }

    if (this.y === 220) { // Block 1
        score += 5;
        this.checkCollision();
    } else if (this.y === 130) { // Block 2
        score += 10;
        this.checkCollision();
    } else if (this.y === 40) {
        score += 15;
        this.checkCollision(); // Final block
    }
};

Player.prototype.checkCollision = function() {
    if (this.x === 0 & row1) {
        this.y = 400;
        row1 = false;
        score = 0;
    } else if (this.x === 100 & row2) {
        this.y = 400;
        row2 = false;
        score = 0;
    } else if (this.x === 200 & row3) {
        this.y = 400;
        row3 = false;
        score = 0;
    } else if (this.x === 300 & row4) {
        this.y = 400;
        row4 = false;
        score = 0;
    } else if (this.x === 400 & row5) {
        this.y = 400;
        row5 = false;
        score = 0;
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle player movement based on keyboard input, required method for game
Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left') {
        this.x -= 100;
    }
    if (keyCode === 'up') {
        if (this.y === -50) {
            this.y = -50;
        } else {
            this.y -= 90;
        }
    }
    if (keyCode === 'right') {

        this.x += 100;
    }
    if (keyCode === 'down') {
        this.y += 100;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var enemy1 = new Enemy(60);
var enemy2 = new Enemy(145);
var enemy3 = new Enemy(225);
var allEnemies = [enemy1, enemy2, enemy3];

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