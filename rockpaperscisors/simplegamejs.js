
const options = ["sword", "rock", "paper"];
var playeranswer;
var computeranswer;

var playerscore = 0;
var computerscore = 0;

function sword(){
    playeranswer = 0;
}

function rock(){
    playeranswer = 1;
}

function paper(){
    playeranswer = 2;
}

function game(){
    document.getElementById('announcement').innerHTML="";
    document.getElementById('player').innerHTML = "";
    document.getElementById('computer').innerHTML = "";
    computeranswer = Math.floor(Math.random() * 3);
    showplayerimage();
    showcomputerimage();
    console.log(playeranswer, computeranswer)

    if(playeranswer == computeranswer){
        document.getElementById('announcement').innerHTML="Tie"
    }else if((playeranswer == 0 && computeranswer == 1)||(playeranswer == 1 && computeranswer == 2)||(playeranswer == 2 && computeranswer == 0)){
        document.getElementById('announcement').innerHTML="Computer Wins!";
        ++computerscore;
        document.getElementById('computerscore').innerHTML = computerscore;
    }else{
        document.getElementById('announcement').innerHTML="Player Wins!";
        ++playerscore;
        document.getElementById('playerscore').innerHTML = playerscore;
    }
    
    check();
}

function showplayerimage(){
    let div = document.getElementById('player');
    var image = document.createElement('img');
    let option = options[playeranswer];
    image.src = '/images/' + option + ".png";
    image.style = "width:100px; height:100px;"
    div.appendChild(image);
    
}

function showcomputerimage(){
    let div = document.getElementById('computer');
    var image = document.createElement('img');
    let option = options[computeranswer];
    image.src = '/images/' + option + ".png";
    image.style = "width:100px; height:100px;"
    div.appendChild(image);
}

function check(){
    if(computerscore == 5 ){
        document.getElementById('gameresults').innerHTML = "Better Luck Next Time!";
        document.getElementById('gameend').style.display = "flex";
    }
    if(playerscore == 5){
        document.getElementById('gameresults').innerHTML = "Well Played!";
        document.getElementById('gameend').style.display = "flex";
    }
    
}

function playagain(){
    playerscore = 0;
    computerscore = 0;
    document.getElementById('computerscore').innerHTML = computerscore;
    document.getElementById('playerscore').innerHTML = playerscore;
    document.getElementById('player').innerHTML = "";
    document.getElementById('computer').innerHTML = "";
    document.getElementById('announcement').innerHTML="...";

    document.getElementById('gameend').style.display = "none";
}