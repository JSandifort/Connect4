//game object
function Game(id, player1, player2){

    this.id = id;
    this.player1 = player1;
    this.player2 = player2;
    this.player1score = 0;
    this.player2score = 0;
    this.board = new Board();
    timeElapsed = 0;
    
    //simple timer for the elapsed time
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var timer = setInterval(setTime, 1000);

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

}

function Board(){

    // the connect4 board as a 2D array
    var board = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
    ];

    //put disc into the array
    this.putDisc = function(x, y, discId){

        board[x][y] = discId;

    }

    // check after every move to see if player already has won
    this.checkBoard = function(){


    }

}

// show player names on the screen
function playerNames(name1, name2){

    document.getElementById('player1').innerHTML = name1;
    document.getElementById('player2').innerHTML = name2;


}

//create a game when the page loads 
var game = new Game(1, "Jelle", "Kayleigh");

var new_disc ;
var board ;
 
function disc1(){
 
    new_disc = document.createElement( 'div' ); 

    new_disc.style.backgroundImage="url(images/blue_disc.png)";
    new_disc.className = "disc";
    
    board = document.getElementById( 'discs' );
    board.appendChild( new_disc );  
    

}

function placeDisc(columnId){

    new_disc = document.createElement( 'div' ); 

    new_disc.style.backgroundImage="url(images/blue_disc.png)";
    new_disc.className = "disc";
    
    board = document.getElementById( 'board-column-' + columnId );
    board.appendChild( new_disc );  

}

disc1();
playerNames("Jelle", "Kayleigh");