//@ts-check

var socket = new WebSocket("ws://localhost:3001");
var counter = 0;
var gameID;
var userID;
var opponentID;
var clickable = false;

alert("waiting for players");

socket.onmessage = function (e) {

	var object = JSON.parse(e.data);

	console.log(object["type"]);
	console.log(object);

	if (object["type"] === "GAME_STARTED") {

		alert("game has started");
		gameID = object["gameID"];
		userID = object["userID"];
		opponentID = object["opponentID"];
		console.log(gameID);

		startGame();

	} else if (object["type"] === "YOUR_TURN") {

		alert("your turn!");
		clickable = true;

	} else if (object["type"] === "VALID_MOVE") {

		dropPiece(object["col"], object["row"], object["disctype"]);

	} else if (object["type"] === "INVALID_MOVE") {

		alert("Invalid move, try again!");
		clickable = true;

	} else if (object["type"] === "GAME_WON_BY") {

		win(object["winner"], object["userScore"], object["opponentScore"]);

	} else if (object["type"] === "GAME_ABORTED") {

		alert("Game was aborted by opponent");
		document.location.replace("/Connect4MainMenu");
	
	}else if (object["type"] === "REMATCH_CONFIRMED"){

		startGame();

	}

}

socket.onopen = function () {


};

var grid = null;


// loading the page
function startGame() {
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
	for (var i = 0; i < blanks.length; i++) {

		blanks[i].src = "images/connect4ImageGridBlank.png";
		blanks[i].setAttribute("onclick", functions[i % functions.length]);

	}
	// reset win section
	if (document.getElementById("winSection") !== null) {
		document.body.removeChild(document.getElementById("winSection"));
	}

	//reset the name sections 
	if (document.getElementById("p1Section") !== null) {
		document.body.removeChild(document.getElementById("p1Section"));
	}
	if (document.getElementById("p2Section") !== null) {
		document.body.removeChild(document.getElementById("p2Section"));
	}
	// create new name sections
	var p1Section = document.createElement("section");
	p1Section.setAttribute("id", "p1Section");

	p1Section.appendChild(document.createTextNode(userID));
	document.body.appendChild(p1Section);

	var p2Section = document.createElement("section");
	p2Section.setAttribute("id", "p2Section");

	p2Section.appendChild(document.createTextNode(opponentID));
	document.body.appendChild(p2Section);


}


function col1() {

	if (clickable) {

		var sound = new Audio("connect4Sound.M4A");
		sound.play();

		var move = new Move("col1", 0, gameID);
		console.log(move);
		var messageMove = JSON.stringify(move);

		socket.send(messageMove);
		clickable = false;

	} else {

		alert("Wait for your turn!");
	}
};
function col2() {

	if (clickable) {

		var sound = new Audio("connect4Sound.M4A");
		sound.play();

		var move = new Move("col2", 1, gameID);
		console.log(move);
		var messageMove = JSON.stringify(move);

		socket.send(messageMove);
		clickable = false;

	} else {

		alert("Wait for your turn!");
	}
};
function col3() {

	if (clickable) {

		var sound = new Audio("connect4Sound.M4A");
		sound.play();

		var move = new Move("col3", 2, gameID);
		console.log(move);
		var messageMove = JSON.stringify(move);

		socket.send(messageMove);
		clickable = false;

	} else {

		alert("Wait for your turn!");
	}
};
function col4() {

	if (clickable) {

		var sound = new Audio("connect4Sound.M4A");
		sound.play();

		var move = new Move("col4", 3, gameID);
		console.log(move);
		var messageMove = JSON.stringify(move);

		socket.send(messageMove);
		clickable = false;

	} else {

		alert("Wait for your turn!");
	}
};
function col5() {

	if (clickable) {

		var sound = new Audio("connect4Sound.M4A");
		sound.play();

		var move = new Move("col5", 4, gameID);
		console.log(move);
		var messageMove = JSON.stringify(move);

		socket.send(messageMove);
		clickable = false;

	} else {

		alert("Wait for your turn!");
	}
};
function col6() {

	if (clickable) {

		var sound = new Audio("connect4Sound.M4A");
		sound.play();

		var move = new Move("col6", 5, gameID);
		console.log(move);
		var messageMove = JSON.stringify(move);

		socket.send(messageMove);
		clickable = false;

	} else {

		alert("Wait for your turn!");
	}
};
function col7() {

	if (clickable) {

		var sound = new Audio("connect4Sound.M4A");
		sound.play();

		var move = new Move("col7", 6, gameID);
		console.log(move);
		var messageMove = JSON.stringify(move);

		socket.send(messageMove);
		clickable = false;

	} else {

		alert("Wait for your turn!");
	}
};

function dropPiece(col, nr, discType) {

	var rows = document.getElementsByClassName(col);
	rows[nr].src = color(discType);


};

function color(discType) {

	console

	if (discType) {

		//document.getElementById("p1Section").setAttribute("style", "color: white;");
		//document.getElementById("p2Section").setAttribute("style", "color: #f5756a;");
		return "images/connect4ImageGridYellow.png";
	}

	//document.getElementById("p1Section").setAttribute("style", "color: #f5756a;");
	//document.getElementById("p2Section").setAttribute("style", "color: white;");
	return "images/connect4ImageGridRed.png";
}

function win(winner, userScore, opponentScore) {
	//block piece placing
	var fields = document.getElementById("grid").getElementsByTagName("img");
	for (var i = 0; i < fields.length; i++) {


		fields[i].removeAttribute("onclick");

	}

	//find which player is the winner
	if (winner === userID) {

		var string = document.createTextNode(userID + " is the winner!");
	} else if (winner === opponentID) {

		var string = document.createTextNode(opponentID + " is the winner!");
	}
	else {

		var string = document.createTextNode("It is a draw!");

	}
	// update score board
	var score = document.getElementById("score");
	var scoreTxt = userScore + " - " + opponentScore;

	var winSection = document.createElement("SECTION");
	winSection.setAttribute("id", "winSection");

	var p = document.createElement("P");
	p.setAttribute("id", "pText");


	var buttonRematch = document.createElement("img");

	buttonRematch.src = "images/connect4ImageRematchButton.png";
	buttonRematch.setAttribute("id", "ButtonRematch");
	buttonRematch.setAttribute("onclick", "rematch()");

	var buttonExit = document.createElement("img");

	buttonExit.src = "images/connect4ImageGameExitButton.png";
	buttonExit.setAttribute("id", "buttonExit");
	buttonExit.setAttribute("onclick", "exit()");

	var linkExit = document.createElement("A");
	linkExit.href = "Connect4MainMenu.html";

	var clock = document.createElement("div");
	clock.setAttribute("id","clockCountDown");
	clock.innerHTML = ":";

	var minutes = document.createElement("label");
	minutes.setAttribute("id", "winMinutes");

	var seconds = document.createElement("label");
	seconds.setAttribute("id", "winSeconds");

	linkExit.appendChild(buttonExit);
	p.appendChild(string);
	winSection.appendChild(p);
	winSection.appendChild(buttonRematch);
	winSection.appendChild(linkExit);
	winSection.appendChild(clock);
	winSection.appendChild(minutes);
	winSection.appendChild(seconds);
	document.body.appendChild(winSection);
	score.innerHTML = scoreTxt;

	//simple timer for the elapsed time
var pause = false;
var timer = setInterval(setTime, 1000);
var timeElapsed = 30;

function setTime() {

	if(!pause){
		--timeElapsed;
		seconds.innerHTML = pad(timeElapsed % 60);
		minutes.innerHTML = pad(parseInt(timeElapsed / 60));

		if(timeElapsed <= 0){

			pause = true;
			timeElapsed = 30;
			rematch();
			
		}
	}
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

function Move(col, nr, gameID) {

	this.gameID = gameID;
	this.type = "POSSIBLE_MOVE";
	this.col = col;
	this.nr = nr;

}

function Rematch(gameID){

	this.gameID = gameID;
	this.type = "POSSIBLE_REMATCH"

}

function rematch(){

	alert("Waiting for other player to confirm");
	var rematch = new Rematch(gameID);
	var messageRematch = JSON.stringify(rematch);
	socket.send(messageRematch);


}