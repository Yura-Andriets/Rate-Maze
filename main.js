
/************Курс валют************/

let element = document.getElementById("rate");

getCurrencies();

async function getCurrencies () {
    let url = "https://www.nbrb.by/api/exrates/rates?periodicity=0";
    let response = await fetch(url);
    let data = await response.json();
    let result = await data;

    element.innerHTML = result[0].Date;

    for(let i=0; i<result.length; i++){
        let counter = i+1;
        const div = document.createElement("div");
        div.textContent =  result[i].Cur_Scale + " " + result[i].Cur_Name.toUpperCase() +  " = " + result[i].Cur_OfficialRate + " белоруcских рублей";
        div.className = "course-value";
        element.append(div);
    }
}

/***********Лабиринт************/

let maze = [
    ['#','#','#','#','#','#','#','#',"#"],
    ['#','+','+','+','#','+','+','+',"#"],
    ['#','+','#','+','#','+','#','+',"#"],
    ['+','+','#','+', 0 ,'+','#','+',"#"],
    ['#','#','#','+','#','#','#','#',"#"],
    ['#','#','+','+','#','#','#','#',"#"],
    ['#','#','+','#','#','#','#','#',"#"],
    ['#','#','#','#','#','#','#','#',"#"],
];

function checkPath(start, end) {
    maze[start.y][start.x] = 0;
    let siblings = getValidSib(start);

    if (siblings.length > 0){
        for (let i=0; i <siblings.length; i++){
            let current = siblings[i];
            let isSolded = current.x === end.x && current.y === end.y;
            let notVisited = maze[current.y][current.x] !== 0;
            if(isSolded || (notVisited && checkPath(current, end))){
                maze[end.y][end.x] = 0;
                return true;
            }
        }
    }
    
    return false;
}

let stepsMaze = [];

function getValidSib(cord) {
    let {x,y} = cord;
    let cords = [];
    
    if(maze[y-1] !== undefined){
        cords.push({ x: x, y:y-1, val: maze[y-1][x], step:"top"});
    }

    if(maze[y+1] !== undefined){
        cords.push({ x: x, y:y+1, val: maze[y+1][x], step:"bottom" });
    }

    if(maze[y][x-1] !== undefined){
        cords.push({x:x-1, y:y, val:maze[y][x-1], step: "left"});
    }

    if(maze[y][x+1] !== undefined){
        cords.push({x:x+1, y:y, val:maze[y][x+1], step: "right"});
    }

    let res = cords.filter(el => el.val=== "+");
    stepsMaze.push(res[0].step);
    return   res;
}

checkPath({x:4,y:3}, {x:0,y:3});
console.log(stepsMaze);

let mazeStep = document.getElementById("maze");
mazeStep.className = "maze-value";
mazeStep.textContent = "Exit from the maze : " + stepsMaze;