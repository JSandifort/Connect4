function Player(id, username){
    
    this.id = id;
    this.username = username;
    this.totalPoints = 0;

    this.getID = function(){ return this.id; };
    this.setID = function(id){ this.id = id; };
    this.addToTotal = function(points){this.totalPoints += points};
    this.getTotalScore = function(){return this.totalPoints};
}

function Game(id, player1, player2){
    
    this.id = id;
    this.player1 = player1;
    this.player2 = player2;
    this.scorePlayer1 = 0;
    this.scorePlayer2 = 0;
    
    this.getID = function(){ return this.id; };
    this.setID = function(id){ this.id = id; };
    this.getPlayer1Score = function(){ return this.player1Score};
    this.getPlayer2Score = function(){ return this.player2Score};
    this.incrPlayer1Score = function(){ this.player1Score++};
    this.incrPlayer2Score = function(){ this.player2Score++};
    
}

var player1 = new Player(0, "player1");
var player2 = new Player(1, "player2");

var game = new Game(3, player1, player2);

var counter = 0;
var column1 = ["x", "x", "x", "x", "x", "x"];
var column2 = ["x", "x", "x", "x", "x", "x"];
var column3 = ["x", "x", "x", "x", "x", "x"];
var column4 = ["x", "x", "x", "x", "x", "x"];
var column5 = ["x", "x", "x", "x", "x", "x"];
var column6 = ["x", "x", "x", "x", "x", "x"];
var column7 = ["x", "x", "x", "x", "x", "x"];

var grid = [column1, column2, column3, column4, column5, column6, column7];


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
        return "../images/connect4ImageGridYellow.png";
    }
    
    counter++;
    return "../images/connect4ImageGridRed.png";
}
function Place(c, x, y){
    
    grid[x][y] = c;
    check();
    
}
function check(){
    
    if(counter < 7){
        return;
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
            if(yInCol > 3){
                
                win(player1);
                return;
            }
            else if(rInCol > 3){
                
                win(player2);
                return;
            }
            else{}
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
            if(yInRow > 3){
                win(player1);
                return;   
            }
            
            if(rInRow > 3){
                win(player2);
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
                win(player1);
                return;   
            }
            
            if(rInDia > 3){
                win(player2);
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
                    win(player1);
                    return;   
                }
                
                if(rInDia > 3){
                    win(player2);
                    return;   
                }
            }
       }   
    }
}
    function win(winner){
        
        //find which player is the winner
        if(winner.localeCompare(player1) == 0){
        
            game.incrPlayer1Score();
        }
        else{
        
            game.incrPlayer2Score();
        }
        
        var score = document.getElementById("score");
        var scoreTxt = game.getPlayer1Score.toString() + " - " + game.getPlayer2Score.toString();
        
        var winSection = document.createElement("SECTION");
        winSection.setAttribute("id", "winSection");

        var p = document.createElement("P");
        p.setAttribute("id", "pText");
        var string = document.createTextNode(winner + " is the winner!");
        
        var buttonRematch = document.createElement("img");
        
        buttonRematch.src = "../images/connect4ImageRematchButton.png";
        buttonRematch.setAttribute("id", "ButtonRematch");
        buttonRematch.setAttribute("onclick", "resetGrid()");
        
        var buttonExit = document.createElement("img");

        buttonExit.src = "../images/connect4ImageGameExitButton.png";
        buttonExit.setAttribute("id", "buttonExit");
        buttonExit.setAttribute("onclick", "exit()");
    
        //var linkExit = document.createElement("A");
        //linkExit.href = "Connect4MainMenu.html"; 

        
        linkExit.appendChild(buttonExit);
        p.appendChild(string);
        winSection.appendChild(p);
        winSection.appendChild(buttonRematch);
        winSection.appendChild(linkExit);
        document.body.appendChild(winSection);
        score.innerHTML = scoreTxt;
}
function resetGrid(){
    
    grid = [["x", "x", "x", "x", "x", "x"], 
    ["x", "x", "x", "x", "x", "x"], 
    ["x", "x", "x", "x", "x", "x"], 
    ["x", "x", "x", "x", "x", "x"], 
    ["x", "x", "x", "x", "x", "x"], 
    ["x", "x", "x", "x", "x", "x"], 
    ["x", "x", "x", "x", "x", "x"]];
    
    var blanks = document.getElementById("grid").getElementsByTagName("img");
    
    for(var i = 0; i < blanks.length; i++){
        
        blanks[i].src = "../images/connect4ImageGridBlank.png";
        
    }
    document.body.removeChild(document.getElementById("winSection"));
    
}

function exit(){

    player1.addToTotal(game.getPlayer1Score);
    player2.addToTotal(game.getPlayer2Score);

}

