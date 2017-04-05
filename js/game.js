let game_screen_width  = 1280;  
let game_screen_height = 940; 

const menu_stage  = 0;
const game_stage  = 1;		
const score_stage = 2;

let game_start = false;

let game_current_stage = menu_stage;

// Game control
const mouse_control    = 0;
const keyboard_control = 1;

let game_current_control = mouse_control;

// Game objects
let ball = new Object();
let paddle = new Object();			
let bricks = new Object();

// Game level
let level = 1;
let score = 0;
let lives = 3;
let speed = 5;

let bricks_destroed = 0;
let bricks_count = 0;

// Game levels							
let all_bricks_count = [0, 84, 84, 98];
let all_bricks = [0,
   [[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,1,2,1,2,1,2,2,2,1,1],
    [1,2,1,2,1,2,1,2,1,2,1,2,1,1],
    [1,2,2,2,1,2,2,2,1,2,2,2,1,1],
    [1,2,1,1,1,2,1,2,1,2,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1]],
   [[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,2,2,2,1,2,2,2,1,2,2,2,1,1],
    [1,1,1,2,1,1,1,2,1,1,1,2,1,1],
    [1,1,1,2,1,1,1,2,1,1,1,2,1,1],
    [1,1,2,1,1,1,2,1,1,1,2,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,2,1,1,1,2,1,1,1,2,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0]],
   [[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,2,2,2,1,1,1,1,1,1],
    [1,1,1,1,1,2,2,2,1,1,1,1,1,1],
    [1,1,2,2,1,1,2,1,1,2,2,1,1,1],
    [1,1,2,2,2,2,2,2,2,2,2,1,1,1],
    [1,1,1,1,1,1,2,1,1,1,1,1,1,1],
    [1,1,1,1,1,2,1,2,1,1,1,1,1,1],
    [1,1,1,1,2,2,1,2,2,1,1,1,1,1]]];

// Start first level
let level_bricks_count = all_bricks_count[1];
let level_bricks = all_bricks[1];

let canvas = null; 	  // canvas DOM object
let context = null;   // canvas context
let frameCount = 0;   // Frame count 

function gameRun() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");			
	init(); 
	draw(); 				
	mainLoop();
}

//default parameters
function gameDefault() {
	textFont('12pt Arial');
	textColor('#999');
}

function gameClear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
}

function mainLoop() {
	let start = new Date().getTime(),
	time = 0;

	function timer() {
		time += 15;

		let diff = (new Date().getTime() - start) - time;	

		gameClear();
		gameDefault(); 
		update(); 	   
		draw(); 	  		 
		frameCount++;					
		window.setTimeout(timer, (15 - diff));			
	}	
	window.setTimeout(timer, 15);		
}

// Set text font	
function textFont(font) {
	context.font = font;
}	

// Set text color
function textColor(color) {
	context.fillStyle = color;
}

// Draw text
function text(str, x, y) {
	context.fillText(str, x, y);
}

// Mouse input
let mouseX = 0;
let mouseY = 0;
let mouseClickX = 0;
let mouseClickY = 0;
let mouseClick = false;

// Keyboard input
let KEY = 0;
let KEY_LEFT  = false;
let KEY_RIGHT = false;
let KEY_UP    = false;
let KEY_DOWN  = false;
let KEY_SPACE = false;
let KEY_W 	  = false;
let KEY_A  	  = false;
let KEY_S 	  = false;
let KEY_D     = false;
let	KEY_K 	  = false;
let	KEY_M     = false;

function gameMouseMove(event) {
	mouseX = event.clientX - canvas.offsetLeft;    
	mouseY = event.clientY - canvas.offsetTop;    
}

function gameMouseClick(event) {
	mouseClickX = event.clientX - canvas.offsetLeft;    
	mouseClickY = event.clientY - canvas.offsetTop;    		
}
	
function gameMouseDown(event) {			
	mouseClick = true;		
}

function gameMouseUp(event) {		
	mouseClick = false;		
}	 

function gameKeyboardUpdateStates(event) {				
	KEY = event.keyCode;		
	if(KEY == 39) KEY_RIGHT = true; 
	if(KEY == 37) KEY_LEFT  = true; 
	if(KEY == 38) KEY_DOWN  = true; 
	if(KEY == 40) KEY_UP    = true; 
	if(KEY == 65) KEY_A  = true; 
	if(KEY == 87) KEY_W  = true; 
	if(KEY == 68) KEY_D  = true; 
	if(KEY == 83) KEY_S  = true; 
	if(KEY == 75) KEY_K  = true;
	if(KEY == 77) KEY_M  = true;
	if(KEY == 32) KEY_SPACE  = true;		
}

function gameKeyboardClearStates(event) {
	KEY = event.keyCode;
	KEY_RIGHT = false;
	KEY_LEFT  = false;
	KEY_DOWN  = false; 
	KEY_UP    = false; 
	KEY_W 	  = false;
	KEY_A  	  = false;
	KEY_S 	  = false;
	KEY_D     = false;
	KEY_K 	  = false;
	KEY_M     = false;
	KEY_SPACE = false;		
}

function lineWidth(width) {	
	context.lineWidth = width;		    
}
          
function lineStyle(style) {		
	context.lineCap = cap; 
}	

function gameBegin() {
	context.beginPath();
}

function moveTo(x, y) {
	context.moveTo(x, y);
}

function lineTo(x, y) {
	context.lineTo(x, y);
}	

function quadraticCurveTo(controlX, controlY, endingPointX, endingPointY) {
    context.quadraticCurveTo(controlX, controlY, endingPointX, endingPointY);
} 

function bezierCurveTo(cPointX1, cPointY1, cPointX2, cPointY2, endPointX, endPointY) {
    context.bezierCurveTo(cPointX1, cPointY1, cPointX2, cPointY2, endPointX, endPointY); 
}

function gameEnd() {
    context.stroke();
}	

function circle(x, y, radius, fill_style) {
    startingAngle =  0 * Math.PI;
    endingAngle = 2 * Math.PI;
    context.beginPath();           
    context.arc(x, y, radius, startingAngle, endingAngle, false);
    context.fillStyle = fill_style;
    context.fill();
    context.stroke(); 
} 

function line(x1, y1, x2, y2, cap) {                            
    context.beginPath();           
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);                 
    context.stroke();
}

function arc(x, y, radius, startAngle, endAngle) {
    startingAngle = startAngle * Math.PI;
    endingAngle = endAngle * Math.PI;
    context.beginPath();           
    context.arc(x, y, radius, startingAngle, endingAngle, false);
    context.stroke();    
}

function curve(x, y, controlX, controlY, endingPointX, endingPointY) {
    context.beginPath();              
    context.moveTo(x, y);
    context.quadraticCurveTo(controlX, controlY, endingPointX, endingPointY);
    context.stroke();
}    

function bezier(x, y, cPointX1, cPointY1, cPointX2, cPointY2, endPointX, endPointY) {
    context.beginPath();
    context.moveTo(x, y);
    context.bezierCurveTo(cPointX1, cPointY1, cPointX2, cPointY2, endPointX, endPointY); 
    context.stroke();
}

function rectangle(topLeftCornerX, topLeftCornerY, width, height, fill_style) {
    context.beginPath();
    context.rect(topLeftCornerX, topLeftCornerY, width, height);
    context.fillStyle = fill_style;
    context.fill();
    context.stroke();
}  	

function initMenu() {}

function updateMenu() {
    if(KEY_SPACE) {
        game_current_stage = game_stage;
        initGame();
    }    
}

function drawMenu() {}

function initBall() {
    ball.x = 350;			
    ball.y = 300;
    ball.dx = 0;
    ball.dy = speed;  
    ball.radius = 5;
}

function drawBall() {
    circle(ball.x, ball.y, ball.radius, "#000");        
}

function updateBall() {
    // Collisions with game level
    if(ball.x + ball.dx + ball.radius > canvas.width || ball.x + ball.dx - ball.radius < 0)  ball.dx = -ball.dx;     

    // Collissions with bricks
    rowheight = bricks.height + bricks.padding;
    colwidth = bricks.width + bricks.padding;
    row = Math.floor(ball.y/rowheight);
    col = Math.floor(ball.x/colwidth);
    
    // Ball collision with brick
    if (ball.y < bricks.rows * rowheight && row >= 0 && col >= 0 && level_bricks[row][col] == 1) {
        ball.dy = -ball.dy;
        level_bricks[row][col] = 0;
        score += 50;		
        bricks_destroed++; 
    }
    
    // Ball collision with rock
    if (ball.y < bricks.rows * rowheight && row >= 0 && col >= 0 && level_bricks[row][col] == 2) {
        ball.dy = -ball.dy;            
        level_bricks[row][col] = 1;
    }
    
    // Ball collision
    if(ball.y + ball.dy - ball.radius < 20) {
        // Collision with top of the room
        ball.dy = -ball.dy;
    } else {
        // Collision with paddle
        if(ball.y + ball.dy + ball.radius > canvas.height - paddle.height) {
            // Collision with paddle
            if(ball.x + ball.radius > paddle.x && ball.x - ball.radius < paddle.x + paddle.width) {
                ball.dy = -ball.dy;
                ball.dx = 8 * ((ball.x-(paddle.x+paddle.width/2))/paddle.width);						
            } else {                
                // Collision with the bottom of the room - Water
                if(ball.y + ball.dy + ball.radius > canvas.height) {
                    // Sub lives 
                    lives -= 1;
                    // Sub score
                    score -= 100;
                    
                    // Magnet ball
                    game_start = false;
                    
                    // Respawn ball
                    initBall();
                    
                                
                }
            }
        }
    }
    
    // Ball moves    
    ball.x += ball.dx;
    ball.y += ball.dy;    
}

function magnetBall() {
    ball.x = paddle.x + (paddle.width/2); 
    ball.y = paddle.y - paddle.height; 
}		

function initPaddle() {
    paddle.x = 100;
    paddle.y = 710;
    paddle.width = 100;
    paddle.height = 10;
}

function drawPaddle() {
    rectangle(paddle.x, paddle.y, paddle.width, paddle.height, "#000");
}

function updatePaddle() {
    paddle.x = mouseX - (paddle.width/2);
    
    if(paddle.x < 0) 
        paddle.x = 0; 
    if(paddle.x + paddle.width > 1280) 
        paddle.x = canvas.width - paddle.width;   
}

function initBricks() {
    bricks.cols = 15;
    bricks.rows = 10;
    bricks.width = 88.3;
    bricks.height = 25;
    bricks.padding = 3;	
    bricks_count = level_bricks_count;
}

function drawBricks() {	
    for (i = 0; i < bricks.rows; i++) {
        for (j = 0; j < bricks.cols; j++) {          
            // Brick
            if (level_bricks[i][j] == 1) {         			
                    rectangle((j * (bricks.width + bricks.padding)) + bricks.padding, 
                                (i * (bricks.height + bricks.padding)) + bricks.padding,
                                        bricks.width, bricks.height,"#101010");                
            }
            // Rock
            if (level_bricks[i][j] == 2) {                
                rectangle((j * (bricks.width + bricks.padding)) + bricks.padding, 
                                (i * (bricks.height + bricks.padding)) + bricks.padding,
                                        bricks.width, bricks.height,"#010101");                
            }
        }
    }
}

function updateBricks() {
    // If lives is 0 then game over
    if(lives <= 0) 
        game_current_stage = score_stage;

    // If bricks destroed for this level then level + 1
    if(bricks_count != 0) {
        if(bricks_destroed == bricks_count)  {
            bricks_destroed = 0;
            level +=1;
            speed +=2;
            game_start = false;
            initBall();				
        }
    }
    
    // Load levels
    level_bricks_count = all_bricks_count[level];
    level_bricks = all_bricks[level];
    
    if(level > 3) {
        game_current_stage = score_stage;
    }	

    initBricks();
}

function initGame() {
    initBall();		
    initPaddle();
    initBricks();			
}

function updateGame() {			
    
    if(game_current_control == mouse_control) {
        if(mouseClick) game_start = true;			
        if(game_start) updateBall(); else magnetBall();
    } else {
        if(KEY_SPACE) game_start = true;			
        if(game_start) updateBall(); else magnetBall();
    }
    
    updatePaddle();
    updateBricks();
}

function drawInfoBar() {
    rectangle(0, 0, game_screen_width, 20, "#333");
    
    textColor('#fff');
    text('Score: ' + score,game_screen_width / 2 - 50,15);		
    text('Level: ' + level,10,15);
    text('Lives: ' + lives,game_screen_width-60,15); 
}

function drawGame() {			
    drawInfoBar();
    drawBall();			
    drawPaddle();			
    drawBricks();					
}

function initScore() {}
function updateScore() {}

function drawScore() {
    textFont('34pt Arial');
    text('ARKANOID',200,180);
    
    textFont('24pt Arial');
    text('Score:',200,280);
    text(score,300,280);
    
    
    text('PRESS',80,380);
    textColor('#333');
    text('F5',200,380);			
    textColor('#999');
    text('RESTART THE GAME',247,380);
}


function init() {	
    initMenu();			
}

function update() {			
    switch(game_current_stage) {
        case menu_stage:  
			updateMenu(); 
			break;
        case game_stage:  
			updateGame(); 
			break;
        case score_stage: 
			updateScore(); 
			break;
    }
}
		
function draw() {
    switch(game_current_stage) {
        case menu_stage:  
            drawMenu(); 
            break;
        case game_stage:  
            drawGame(); 
            break;
        case score_stage: 
            drawScore(); 
            break;
    }
}
	