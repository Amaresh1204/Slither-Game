//Game Constants and Variables
let inputDir = {
    x: 0,
    y: 0
};
const movesound = new Audio("move.mp3");
const foodsound = new Audio("food.mp3");
const gameOversound = new Audio("gameover.mp3");
let speed = 9;
let lastPaintTime=0;
let snakeArr = [{
    x: 13,
    y: 15
}];
food = {
    x: 6,
    y: 7
};
let score=0;
//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;

    }
    lastPaintTime=ctime;
    gameEngine();

}
function collide(snake){
    //If you bump into yourself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x&&snake[i].y===snake[0].y){
            return true;
        }
    }
    //If you bump into the wall
    if(snake[0].x>=18||snake[0].x<=0||snake[0].y>=18||snake[0].y<=0){
        return true;
    }
    return false;
}
function gameEngine(){
    //Part 1 updating snake and food
    if(collide(snakeArr)){
        gameOversound.play();
        inputDir={x:0,y:0};
        alert("Game Over:(Press ctrl + r to refresh the game");
        snakeArr=[{x:13,y:15}];
        score=0;

    }
    //If you have eaten the food ,regenrate the food
    if(snakeArr[0].y===food.y&&snakeArr[0].x===food.x){
        foodsound.play();
        score++;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(hiscoreval))
            highscorebox.innerHTML="Highscore:"+hiscoreval;
        }
        scorebox.innerHTML="score:"+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2,b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //Move the snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};

    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //Part 2 For displaying snake food

   //Display Snake 
    playArea.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;

if(index === 0){
    snakeElement.classList.add('head');
}
else{
    snakeElement.classList.add('snake');

}
playArea.appendChild(snakeElement);
});

//Display Food
foodElement=document.createElement('div');
foodElement.style.gridRowStart=food.y;
foodElement.style.gridColumnStart=food.x;
foodElement.classList.add('food');
playArea.appendChild(foodElement);
} 
//Main Logic behind running the game

let hiscore=localStorage.getItem("highscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore);
    highscorebox.innerHTML="Highscore:"+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir={x:0,y: 1};
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrow Up");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("Arrow Down");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("Arrow Left");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("Arrow Right");
            inputDir.x=1;
            inputDir.y=0;
            break;
            default:
                break;
    }
})