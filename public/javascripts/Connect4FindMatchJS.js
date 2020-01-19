//@ts-check

var socket = new WebSocket("ws://localhost:3001");
var counter = 0;
var gameID = null;

alert("waiting for players");

socket.onmessage = function(e){

    var object = JSON.parse(e.data);

    console.log(object["type"]);
    console.log(object);
    socket.send("held");

    if(object["type"] === "GAME_STARTED"){

        alert("game has started");
        socket.send("understood");
        gameID = object["gameID"];
        startGame();

    } else if(object["type"] === "YOUR_TURN"){

        alert("your turn!");
        socket.send("hello server");
    }else if (object["type"] === "VALID_MOVE"){

        dropPiece(object["discType"]);
    }

}

socket.onopen = function(){
    socket.send("hekkie");

};

var grid = null;


// loading the page
function startGame(){
    var functions = ["col1()", "col2()", "col3()", "col4()", "col5()", "col6()", "col7()"];

    grid = [["x", "x", "x", "x", "x", "x"], 
    ["x", "x", "x", "x", "x", "x"], 
    ["x", "x", "x", "x", "x", "x"], 
    ["x", "x", "x", "x", "x", "x"], 
    ["x", "x", "x", "x", "x", "x"], 
    ["x", "x", "x", "x", "x", "x"], 
    ["x", "x", "x", "x", "x", "x"]];
    
    
    var blanks = document.getElementById("grid").getElementsByTagName("img");
    // reset the grid
    for(var i = 0; i < blanks.length; i++){
        
        blanks[i].src = "images/connect4ImageGridBlank.png";
        blanks[i].setAttribute("onclick",functions[i%functions.length]);
        
    }
    // reset win section
    if(document.getElementById("winSection") !== null){
        document.body.removeChild(document.getElementById("winSection"));
    }
    
    //reset the name sections 
    if(document.getElementById("p1Section") !== null){
        document.body.removeChild(document.getElementById("p1Section"));
    }
    if(document.getElementById("p2Section") !== null){
        document.body.removeChild(document.getElementById("p2Section"));
    }
    // create new name sections
    var p1Section = document.createElement("section");
    p1Section.setAttribute("id","p1Section");
    
    p1Section.appendChild(document.createTextNode("player1"));
    document.body.appendChild(p1Section);
    
    var p2Section = document.createElement("section");
    p2Section.setAttribute("id","p2Section");

    p2Section.appendChild(document.createTextNode("player2"));
    document.body.appendChild(p2Section);
    
    // set color
   // counter = 0;
   // if(counter%2 == 0){
    //    p1Section.setAttribute("style", "color: #f5756a;");
   // }
   // else{
   // p2Section.setAttribute("style", "color: #f5756a;");
   // }

}


function col1(){
   
    var sound = new Audio("connect4Sound.M4A");
    sound.play();

    var move = new Move("col1", 0);
    var messageMove = JSON.stringify(move);

    socket.send("hello");
    
};
function col2(){
    dropPiece("col2", 1);
};
function col3(){
    dropPiece("col3", 2);
};
function col4(){
    dropPiece("col4", 3);
};
function col5(){
    dropPiece("col5", 4);
};
function col6(){
    dropPiece("col6", 5);
};
function col7(){
    dropPiece("col7", 6);
};

function dropPiece(col, nr, discType){
    
   
    var rows = document.getElementsByClassName(col);
    rows[nr].src = color(discType);
            
           
   
};

function color(discType){
    
    if(discType == 0){

        //document.getElementById("p1Section").setAttribute("style", "color: white;");
        //document.getElementById("p2Section").setAttribute("style", "color: #f5756a;");
        return "images/connect4ImageGridYellow.png";
    }
    
    //document.getElementById("p1Section").setAttribute("style", "color: #f5756a;");
    //document.getElementById("p2Section").setAttribute("style", "color: white;");
    return "images/connect4ImageGridRed.png";
}

function win(winner){
    //block piece placing
    var fields = document.getElementById("grid").getElementsByTagName("img");
    for(var i = 0; i < fields.length; i++){
    
        
        fields[i].removeAttribute("onclick");
        
    }

    //find which player is the winner
    if(winner.localeCompare(game.player1.getUsername()) == 0){
    
        game.incrPlayer1Score();
        var string = document.createTextNode(game.player1.getUsername() + " is the winner!");
    } else if(winner.localeCompare(game.player2.getUsername()) == 0){
    
        game.incrPlayer2Score();
        var string = document.createTextNode(game.player2.getUsername() + " is the winner!");
    }
    else{

        var string = document.createTextNode("It is a draw!");

    }
    // update score board
    var score = document.getElementById("score");
    var scoreTxt = game.getPlayer1Score() + " - " + game.getPlayer2Score(); 
    
    var winSection = document.createElement("SECTION");
    winSection.setAttribute("id", "winSection");

    var p = document.createElement("P");
    p.setAttribute("id", "pText");
    
    
    var buttonRematch = document.createElement("img");
    
    buttonRematch.src = "images/connect4ImageRematchButton.png";
    buttonRematch.setAttribute("id", "ButtonRematch");
    buttonRematch.setAttribute("onclick", "startGame()");
    
    var buttonExit = document.createElement("img");

    buttonExit.src = "images/connect4ImageGameExitButton.png";
    buttonExit.setAttribute("id", "buttonExit");
    buttonExit.setAttribute("onclick", "exit()");

    var linkExit = document.createElement("A");
    linkExit.href = "Connect4MainMenu.html"; 

    
    linkExit.appendChild(buttonExit);
    p.appendChild(string);
    winSection.appendChild(p);
    winSection.appendChild(buttonRematch);
    winSection.appendChild(linkExit);
    document.body.appendChild(winSection);
    score.innerHTML = scoreTxt;
}

//simple timer for the elapsed time
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var timer = setInterval(setTime, 1000);
var timeElapsed = 0;

function setTime() {
++timeElapsed;
secondsLabel.innerHTML = pad(timeElapsed % 60);
minutesLabel.innerHTML = pad(parseInt(timeElapsed / 60));
}

function pad(val) {
var valString = val + "";
if (valString.length < 2) {
    return "0" + valString;
} else {
    return valString;
}
}

function Move(col, nr){

    this.gameID = gameID;
    this.type = "POSSIBLE_MOVE";
    this.col = col;
    this.nr = nr;

}