let game_screen_width  = 1280;  
let game_screen_height = 720; 

const menu_stage  = 0;
const game_stage  = 1;		
const score_stage = 2;

let game_start = false;

let game_current_stage = menu_stage;

let ball = new Object();
let paddle = new Object();			
let bricks = new Object();

let level = 1;
let score = 0;
let lives = 3;
let speed = 5;

let bricks_destroed = 0;
let bricks_count = 0;
						
let all_bricks_count = [0, 72, 112, 126];
let all_bricks = [0,
   [[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,2,2,1,1,2,2,1,1,2,2,1,0],
    [0,1,2,2,1,1,2,2,1,1,2,2,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0]],
   [[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,2,2,2,2,2,2,2,2,2,2,2,2,4],
    [4,2,1,1,1,1,1,1,1,1,1,1,2,4],
    [4,2,1,3,3,3,3,3,3,3,3,1,2,4],
    [4,2,1,3,3,3,3,3,3,3,3,1,2,4],
    [4,2,1,1,1,1,1,1,1,1,1,1,2,4],
    [4,2,2,2,2,2,2,2,2,2,2,2,2,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4]],
   [[0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [5,5,5,5,5,5,5,5,5,5,5,5,5,5]]];

let level_bricks_count = all_bricks_count[1];
let level_bricks = all_bricks[1];

let canvas = null; 	
let context = null; 
let tmp = null;  

function gameRun() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");			
	init(); 
	draw(); 				
	mainLoop();
}

function gameDefault() {
	textFont('12pt Arial');
	textColor('#000');
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
		window.setTimeout(timer, (15 - diff));			
	}	

	window.setTimeout(timer, 15);		
}

function textFont(font) {
	context.font = font;
}	

function textColor(color) {
	context.fillStyle = color;
}

function text(str, x, y) {
	context.fillText(str, x, y);
}

let mouseX = 0;
let mouseY = 0;
let mouseClickX = 0;
let mouseClickY = 0;
let mouseClick = false;

let KEY = 0;
let KEY_SPACE = false;

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
	switch (KEY = event.keyCode) {		
        case 32: 
            KEY_SPACE = true; 
            break;
    }	
}

function gameKeyboardClearStates(event) {
	KEY = event.keyCode;
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

function gameEnd() {
    context.stroke();
}	

function circle(x, y, radius, fill_style) {
    function arc(x, y, radius, startAngle, endAngle) {
        startingAngle = startAngle * Math.PI;
        endingAngle = endAngle * Math.PI;
        context.beginPath();           
        context.arc(x, y, radius, startingAngle, endingAngle, false);
        context.stroke();    
    }    

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

function rectangle(topLeftCornerX, topLeftCornerY, width, height, fill_style) {
    context.beginPath();
    context.rect(topLeftCornerX, topLeftCornerY, width, height);
    context.fillStyle = fill_style;
    context.fill();
    context.stroke();
}  	

function init() {	
    initMenu();			
}

function initMenu() {}
function drawMenu() {}
function initScore() {}
function updateScore() {}

function updateMenu() {
    if(KEY_SPACE) {
        canvas.style.background = "rgba(255, 255, 255, 0.1)";
        tmp = document.getElementById('title');
		tmp.style.display = "none";
        tmp = document.getElementById('start');
		tmp.style.display = "none";
        game_current_stage = game_stage;
        initGame();
    }    
}

function initBall() {
    ball.x = 0;			
    ball.y = game_screen_height-40;
    ball.dx = 0;
    ball.dy = speed;  
    ball.radius = 5;
}

function drawBall() {
    circle(ball.x, ball.y, ball.radius, "#000");        
}

function updateBall() {
    if(ball.x + ball.dx + ball.radius > canvas.width || ball.x + ball.dx - ball.radius < 0) { 
        ball.dx = -ball.dx;
        bounce('sound/Jump.wav');
    }

    rowheight = bricks.height + bricks.padding;
    colwidth = bricks.width + bricks.padding;
    row = Math.floor(ball.y/rowheight);
    col = Math.floor(ball.x/colwidth);
    
    for(i = 1; i <= 5; i++)
        if (ball.y < bricks.rows * rowheight && row >= 0 && col >= 0 && level_bricks[row][col] == i) {
            ball.dy = -ball.dy;
            level_bricks[row][col] = i-1;
            switch (i) {
                case 1:
                    score += 50;		
                    bricks_destroed++; 
                    break;
                case 2:
                    score += 10;		
                    break;
                case 3:
                    score += 5;		
                    break;
                case 4:
                    score += 2;		
                    break;
                case 5:
                    score += 1;		
                    break;
            }        
            bounce('sound/Plus.wav');
        }
    
    if(ball.y + ball.dy - ball.radius < 20) {
        ball.dy = -ball.dy;
        bounce('sound/Jump.wav');
    } else 
        if(ball.y + ball.dy + ball.radius > canvas.height - paddle.height) 
            if(ball.x + ball.radius > paddle.x && ball.x - ball.radius < paddle.x + paddle.width) {
                ball.dy = -ball.dy;
                ball.dx = 8 * ((ball.x - (paddle.x + paddle.width / 2)) / paddle.width);
                bounce('sound/Jump.wav');						
            } else              
                if(ball.y + ball.dy + ball.radius > canvas.height) {
                    bounce('sound/Explosion.wav');
                    lives--;
                    score -= 100;
                    
                    game_start = false;
                    
                    initBall();                      
                }
             
    ball.x += ball.dx;
    ball.y += ball.dy;    
}

function sticky() {
    ball.x = paddle.x + (paddle.width / 2); 
    ball.y = paddle.y - paddle.height; 
}		

function initPaddle() {
    paddle.width = 100;
    paddle.height = 10;
    paddle.x = game_screen_width / 2 - paddle.width;
    paddle.y = game_screen_height - paddle.height;
}

function drawPaddle() {
    rectangle(paddle.x, paddle.y, paddle.width, paddle.height, "#000");
}

function updatePaddle() {
    paddle.x = mouseX - (paddle.width / 2);
    
    if(paddle.x < 0) 
        paddle.x = 0; 
    if(paddle.x + paddle.width > game_screen_width) 
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
    for (i = 0; i < bricks.rows; i++) 
        for (j = 0; j < bricks.cols; j++)          
            switch (level_bricks[i][j]) { 
                case 1:         			
                    rectangle((j * (bricks.width + bricks.padding)) + bricks.padding, 
                        (i * (bricks.height + bricks.padding)) + bricks.padding,
                        bricks.width, bricks.height,"#000");   
                    break;             
                case 2:             
                    rectangle((j * (bricks.width + bricks.padding)) + bricks.padding, 
                        (i * (bricks.height + bricks.padding)) + bricks.padding,
                        bricks.width, bricks.height,"#fff");   
                    break;     
                case 3:                
                    rectangle((j * (bricks.width + bricks.padding)) + bricks.padding, 
                        (i * (bricks.height + bricks.padding)) + bricks.padding,
                        bricks.width, bricks.height,"#ff0");  
                    break;  
                case 4:                
                    rectangle((j * (bricks.width + bricks.padding)) + bricks.padding, 
                        (i * (bricks.height + bricks.padding)) + bricks.padding,
                        bricks.width, bricks.height,"#0f0"); 
                    break;  
                case 5:                
                    rectangle((j * (bricks.width + bricks.padding)) + bricks.padding, 
                        (i * (bricks.height + bricks.padding)) + bricks.padding,
                        bricks.width, bricks.height,"#f00");  
                    break;               
            }
}

function updateBricks() {
    if(lives <= 0) 
        game_current_stage = score_stage;

    if(bricks_count != 0) 
        if(bricks_destroed == bricks_count)  {
            bricks_destroed = 0;
            level++;
            speed += 2;
            game_start = false;
            initBall();				
        }
    
    level_bricks_count = all_bricks_count[level];
    level_bricks = all_bricks[level];
    
    if(level > 3) 
        game_current_stage = score_stage;

    initBricks();
}

function initGame() {
    initBall();		
    initPaddle();
    initBricks();			
}

function updateGame() {			
    if(mouseClick) 
        game_start = true;	

    game_start ? updateBall() : sticky();
    
    updatePaddle();
    updateBricks();
}

function drawInfoBar() {
    rectangle(0, 0, game_screen_width, 20, "#000");
    
    textColor('#fff');
    text('Score: ' + score, game_screen_width / 2 - 50, 15);		
    text('Level: ' + level, 10, 15);
    text('Lives: ' + lives, game_screen_width-60, 15); 
}

function drawGame() {			
    drawInfoBar();
    drawBall();			
    drawPaddle();			
    drawBricks();					
}

function drawScore() {
    canvas.style.background = "rgba(255, 255, 255, 0)";   
    tmp = document.getElementById('title');
	tmp.style.display = "inline";
    tmp = document.getElementById('start');
	tmp.innerHTML = "Score: " + score + "<br> PRESS F5 TO RESTART THE GAME";
    tmp.style.display = "inline";
}

function update() {			
    if (game_current_stage == menu_stage)  
        updateMenu(); 
    else if (game_current_stage == game_stage)  
        updateGame(); 
    else if (game_current_stage == score_stage)  
        updateScore();
}
		
function draw() {
    if (game_current_stage == menu_stage)  
        drawMenu(); 
    else if (game_current_stage == game_stage)  
        drawGame(); 
    else if (game_current_stage == score_stage)  
        drawScore();
}

function bounce(audio) {
    let sound = new Audio(audio);
    sound.play();
}
	