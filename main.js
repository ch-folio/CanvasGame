// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);

let chessBoard = [
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ];

var soundEfx; //Sound Efx
var soundGameOver = "sounds/gameOver.wav"; //Game Over sound efx
//Assign audio to soundEfx
soundEfx = document.getElementById("soundEfx");

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/heart_background.jpg";

// Border image 1 L-R
var blrReady = false;
var blrImage = new Image();
blrImage.onload = function () {
    blrReady = true;
};
blrImage.src = "images/BorderLeftRight.jpg";

// Border image 2 T-B
var btbReady = false;
var btbImage = new Image();
btbImage.onload = function () {
    btbReady = true;
};
btbImage.src = "images/BorderTopBottom.jpg";


// Cupid image
var cupidReady = false;
var cupidImage = new Image();
cupidImage.onload = function () {
    cupidReady = true;
};
cupidImage.src = "images/cupid.png";

// Heart image
var heartReady = false;
var heartImage = new Image();
heartImage.onload = function () {
    heartReady = true;
};
heartImage.src = "images/heart.png";

// Black heart image
var blackReady = false;
var blackImage = new Image();
blackImage.onload = function () {
    blackReady = true;
};
blackImage.src = "images/obstacle2.png"; 

// Bad heart 1 image
var badReady = false;
var badImage = new Image();
badImage.onload = function () {
    badReady = true;
};
badImage.src = "images/obstacle4.png"; 


// Bad heart 2 image
var badderReady = false;
var badderImage = new Image();
badderImage.onload = function () {
    badderReady = true;
};
badderImage.src = "images/obstacle5.png"; 





// Game objects
var cupid = {
    speed: 256, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};

var heart = {
    // for this version, the heart does not move, so just and x and y
        x: 0,
        y: 0
    };

var black1 = {
    x: 0,
    y: 0
};
var black2 = {
    x: 0,
    y: 0
};
var black3 = {
    x: 0,
    y: 0
};
var bad = {
    x: 0,
    y: 0
};
var badder = {
    x: 0,
    y: 0
};


var heartsCaught = 0;
let died = false;


// Handle keyboard controls
var keysDown = {
    keysDown: []
}; //object were we properties when keys go down
                // and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the cupid image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a heart
var reset = function () {

    if(died == true) {
        soundEfx.src = soundGameOver;
        soundEfx.play();
    }
    else {

        placeItem(cupid);
        placeItem(heart);
        placeItem(black1);
        placeItem(black2);
        placeItem(black3);
        placeItem(bad);
        placeItem(badder);

    

        if(heartsCaught === 5) {
            alert("You won!");
            //change sound effect and play it. 
            soundEfx.src = soundGameOver;
            soundEfx.play();
        }
    }
  
};

let placeItem = function (character)
{
    let X = 5;
    let Y = 6;
    let success = false;
    while(!success) {
        X = Math.floor( Math.random( ) * 9 );
        Y = Math.floor( Math.random( ) * 9 );
        if( chessBoard[X][Y] === 'x' ) {
            success = true;
        }
    }
    chessBoard[X][Y] = 'O'; //mark that square as taken
    character.x = (X*100) + 32; //allow for border
    character.y = (Y*100) + 32;
}
//Place the heart somewhere on the screen randomly
// but not on the edges, Article in wrong, the 64 needs to be 
// edge 32 + edge 32 + char 32 = 96
// heart.x = 32 + (Math.random() * (canvas.width - 110));
// heart.y = 32 + (Math.random() * (canvas.height - 108));



///=======================================================================================

// Update game objects
var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        cupid.y -= cupid.speed * modifier;
        if (cupid.y < (32)) {
            cupid.y = 32;
        }

    }
    if (40 in keysDown) { // Player holding down
        cupid.y += cupid.speed * modifier;
        if (cupid.y > (1000 - (32 + 100)) ) {
            cupid.y = 1000 - 32 - 100;
        }
    }
    if (37 in keysDown) { // Player holding left
        cupid.x -= cupid.speed * modifier;
        if (cupid.x < (32)) {
            cupid.x = 32;
        }
    }
    if (39 in keysDown) { // Player holding right
        cupid.x += cupid.speed * modifier;
        if (cupid.x > (1000 - (32 + 100)) ) {
            cupid.x = 1000 - (32 + 100);
        }
    }
        // Are they touching?
        if (
            cupid.x+5 <= (heart.x + 45)
            && heart.x <= (cupid.x + 100)
            && cupid.y <= (heart.y + 42)
            && heart.y <= (cupid.y + 90)
        ) {
            // play sound when they touch
            soundEfx.src = "sounds/caught.wav";
            soundEfx.play();
            ++heartsCaught;       // keep track of our “score”
            reset();       // start a new cycle
        }
 

        if (
            cupid.x+5 <= (black1.x + 40)
            && black1.x <= (cupid.x + 30)
            && cupid.y <= (black1.y + 40)
            && black1.y <= (cupid.y + 30)
        ) {
            gameOver()
        }

        if (
            cupid.x+5 <= (black2.x + 40)
            && black2.x <= (cupid.x + 30)
            && cupid.y <= (black2.y + 40)
            && black2.y <= (cupid.y + 30)
        ) {
            gameOver()
        }

        if (
            cupid.x+5 <= (black3.x + 40)
            && black3.x <= (cupid.x + 30)
            && cupid.y <= (black3.y + 40)
            && black3.y <= (cupid.y + 30)
        ) {
            gameOver()
        }

        if (
            cupid.x+5 <= (bad.x + 40)
            && bad.x <= (cupid.x + 30)
            && cupid.y <= (bad.y + 40)
            && bad.y <= (cupid.y + 30)
        ) {
            gameDone()
        }

        if (
            cupid.x+5 <= (badder.x + 40)
            && badder.x <= (cupid.x + 30)
            && cupid.y <= (badder.y + 40)
            && badder.y <= (cupid.y + 30)
        ) {
            gameDone()
        }

   
};

let gameOver = function() {
    alert("You've selected a black heart. GAME OVER.")
    died = true;
    reset();
}

let gameDone = function() {
    alert("You've selected a wounded heart. GAME OVER.")
    died = true;
    reset();
}


// Draw everything in the main render function
var render = function () {


    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0); 
    }

    if (blrReady) {
        ctx.drawImage(blrImage, 0, 0); 
        ctx.drawImage(blrImage, 1000 - 32, 0); 
    }


    if (btbReady) {
        ctx.drawImage(btbImage, 0, 0); 
        ctx.drawImage(btbImage, 0, 1000 - 32);
    }


    if (cupidReady) {
        ctx.drawImage(cupidImage, cupid.x, cupid.y);
    }

    if (heartReady) {
        ctx.drawImage(heartImage, heart.x, heart.y);
    }

    if (blackReady) {
        ctx.drawImage(blackImage, black1.x, black1.y);
        ctx.drawImage(blackImage, black2.x, black2.y);
        ctx.drawImage(blackImage, black3.x, black3.y);
    }

    if (badReady) {
        ctx.drawImage(badImage, bad.x, bad.y);
    }

    if (badderReady) {
        ctx.drawImage(badderImage, badder.x, badder.y);
        
    }

        // Score
        ctx.fillStyle = "rgb(159, 30, 30)";
        ctx.font = "28px Segoe Script";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        if (heartsCaught === 5) {
            ctx.fillText("You won! ", 32, 32);
            soundEfx.src = soundGameOver;
            soundEfx.play();
        }
        else {
        ctx.fillText("Hearts stolen: " + heartsCaught, 32, 32);

        }
        
};



// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;

    if(heartsCaught < 5 && died == false) {
    //  Request to do this again ASAP
    requestAnimationFrame(main);   
    }
};


// Let's play this game!
var then = Date.now();
reset();
main();  // call the main game loop.
