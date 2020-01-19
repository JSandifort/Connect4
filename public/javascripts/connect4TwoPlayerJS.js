//@ts-check
var counter = 0;
p1 = new Player(0, "you")
p2 = new Player(1, "other player")
var game = new Game(0, p1, p2);

function Player(id, username){
    
    this.id = id;
    this.username = username;
    this.totalPoints = 0;

    this.getID = function(){ return this.id; };
    this.setID = function(id){ this.id = id; };
    this.addToTotal = function(points){this.totalPoints += points};
    this.getTotalScore = function(){return this.totalPoints};
    this.getUsername = function(){return this.username};
}

function Game(id, player1, player2){
    
    this.id = id;
    this.player1 = player1;
    this.player2 = player2;
    this.scorePlayer1 = 0;
    this.scorePlayer2 = 0;
    
    this.getID = function(){ return this.id; };
    this.setID = function(id){ this.id = id; };
    this.getPlayer1Score = function(){ return this.scorePlayer1;};
    this.getPlayer2Score = function(){ return this.scorePlayer2;};
    this.incrPlayer1Score = function(){ this.scorePlayer1++;};
    this.incrPlayer2Score = function(){ this.scorePlayer2++;};
    
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
    
    p1Section.appendChild(document.createTextNode(game.player1.getUsername()));
    document.body.appendChild(p1Section);
    
    var p2Section = document.createElement("section");
    p2Section.setAttribute("id","p2Section");

    p2Section.appendChild(document.createTextNode(game.player2.getUsername()));
    document.body.appendChild(p2Section);
    
    // set color

    if(counter%2 == 0){
        p1Section.setAttribute("style", "color: #f5756a;");
    }
    else{
    p2Section.setAttribute("style", "color: #f5756a;");
    }

}


function col1(){
    dropPiece("col1", 0);
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

function dropPiece(col, nr){
    
    var sound = new Audio("connect4Sound.M4A");
    sound.play();
    var rows = document.getElementsByClassName(col);
    
    var flag = true;
    for(var i = rows.length-1; i >= 0; i--){
        
        if(grid[nr][i].localeCompare("x") == 0){
            rows[i].src = color();
            
            if((counter-1)%2 == 0){
                Place("y", nr, i);
            }
            if((counter-1)%2 == 1){
                Place("r", nr, i);
            }
            flag = false;          
            break;

       } 
    }
    if(flag){
       alert("Invalid move. Try again.");
    }
   
};

function color(){
    
    if(counter%2 == 0){
        counter++;
        
        document.getElementById("p1Section").setAttribute("style", "color: white;");
        document.getElementById("p2Section").setAttribute("style", "color: #f5756a;");
        return "images/connect4ImageGridYellow.png";
    }
    
    counter++;
    document.getElementById("p1Section").setAttribute("style", "color: #f5756a;");
    document.getElementById("p2Section").setAttribute("style", "color: white;");
    return "images/connect4ImageGridRed.png";
}
function Place(c, x, y){
    
    grid[x][y] = c;
    check();
    
}
function check(){
    if(counter < 7){
        return;
    }

    if(counter == 42){
        win("draw");
    }

    //vertical check
    for(var i = 0; i < grid.length; i++){
        var yInCol = 0;
        var rInCol = 0;
        for(var j = 0; j < grid[i].length; j++){
            if(grid[i][j].localeCompare("y") == 0){
                yInCol++;
                rInCol = 0;
            }
            else if(grid[i][j].localeCompare("r") == 0){
                rInCol++;
                yInCol = 0;
            }
            else{
                rInCol = 0;
                yInCol = 0;
            }
            if(yInCol > 3){
                
                win(game.player1.getUsername());
                return;
            }
            if(rInCol > 3){
                
                win(game.player2.getUsername());
                return;
            }
            
        }    
        
    }
    // horizontal check

    // grid[x][y]
    // x = select column
    // y = select row

    for(var i = 0; i < grid[0].length; i++){
        var rInRow = 0;
        var yInRow = 0;
        for(var j = 0; j < grid.length; j++){
            if(grid[j][i].localeCompare("y") == 0){
                yInRow++;
                rInRow = 0;
            }
            if(grid[j][i].localeCompare("r") == 0){
                rInRow++;
                yInRow = 0;
            }
            if(grid[j][i].localeCompare("x") == 0){
                rInRow = 0;
                yInRow = 0;
            }
    
            if(yInRow > 3){
                win(game.player1.getUsername());
                return;   
            }
            
            if(rInRow > 3){
                win(game.player2.getUsername());
                return;   
            }
        }
    }

    // diagonal check
    
    for(var k = 0; k < 3; k++){
    for(var i = 0; i < 4; i++){
        yInDia = 0;
        rInDia = 0;
        for(var j = 0; j < 4; j++){
            if(grid[j+i][j+k].localeCompare("y") == 0){
                yInDia++;
                //rInDia = 0;
            }
            if(grid[j+i][j+k].localeCompare("r") == 0){
                rInDia++;
                
                //yInDia = 0;
            }  
            if(yInDia > 3){
                win(game.player1.getUsername());
                return;   
            }
            
            if(rInDia > 3){
                win(game.player2.getUsername());
                return;   
            }
        }
    }
    
    }
    for(var k = 0; k < 3; k++){
        for(var i = 0; i < 4; i++){
            yInDia = 0;
            rInDia = 0;
            for(var j = 0; j < 4; j++){
                if(grid[j+i][5-j-k].localeCompare("y") == 0){
                    yInDia++;
                    //rInDia = 0;
                }
                if(grid[j+i][5-j-k].localeCompare("r") == 0){
                    rInDia++;
                    
                    //yInDia = 0;
                }  
                if(yInDia > 3){
                    win(game.player1.getUsername());
                    return;   
                }
                
                if(rInDia > 3){
                    win(game.player2.getUsername());
                    return;   
                }
            }
       }   
    }
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
            var string = document.createTextNode(game.player1.getUsername() + " won the game!");
        } else if(winner.localeCompare(game.player2.getUsername()) == 0){
        
            game.incrPlayer2Score();
            var string = document.createTextNode(game.player2.getUsername() + " won the game!");
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

function exit(){

    player1.addToTotal(game.getPlayer1Score);
    player2.addToTotal(game.getPlayer2Score);

}

