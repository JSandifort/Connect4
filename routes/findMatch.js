//@ts-check
var express = require("express");
var router = express.Router();

var http = require("http");
var websocket = require("ws");

var port = 3001;
var app = express();

var messages = require("../public/javascripts/messages");

app.get("/Connect4FindMatch", function (req, res) {

  res.render('Connect4FindMatch', { title: 'Find Match' });


});

var server = http.createServer(app);

const wss = new websocket.Server({ server });

//keeps track of active games
var numberOfGames = 0;
var games = {};

//the game that isn't filled at this moment
var currentGame = new Game(numberOfGames);
var userID = 0;

wss.on("connection", function (ws) {

  //con.id = connectionID++;
  currentGame.addPlayer(ws, userID++);
  const gameId = currentGame.id;

  ws.on("close", function () {

    var soc1 = games[gameId].getWS1();
    var soc2 = games[gameId].getWS2();

    if(ws === soc1){

      soc2.send(messages.S_GAME_ABORTED);
    }else{

      soc1.send(messages.S_GAME_ABORTED);
    }
    
  });

  if (currentGame.isFull() == true) {

    var ws1 = currentGame.getWS1();
    var ws2 = currentGame.getWS2();

    var object = messages.O_GAME_STARTED;
    object["gameID"] = currentGame.getID();
    object["userID"] = currentGame.getPlayer1ID();
    object["opponentID"] = currentGame.getPlayer2ID();
    var messageGame = JSON.stringify(object);
    ws1.send(messageGame);

    object["userID"] = currentGame.getPlayer2ID();
    object["opponentID"] = currentGame.getPlayer1ID();
    var messageGame2 = JSON.stringify(object);
    ws2.send(messageGame2);

    ws1.send(JSON.stringify(messages.O_YOUR_TURN));

    ++numberOfGames;
    currentGame = new Game(numberOfGames);

  };

  games[numberOfGames] = currentGame;
  console.log(games);

  ws.on("message", function incoming(message) {

    console.log(message);
    var object = JSON.parse(message);
    console.log(object);

    if (object["type"] === "POSSIBLE_MOVE") {

      var gameID = object["gameID"];

      var nr = object["nr"];
      var col = object["col"];

      var counter = games[gameID].getCounter();

      var row = dropPiece(col, nr, gameID);

      if (row == null) {

        ws.send(JSON.stringify(messages.O_INVALID_MOVE));

      } else {

        if ((games[gameID].getCounter() - 1) % 2 == 0) {

          games[gameID].placePiece(nr, row, "y");
        }

        if ((games[gameID].getCounter() - 1) % 2 == 1) {

          games[gameID].placePiece(nr, row, "r");

        }

        var checking = check(games[gameID].getCounter(), gameID);
        var ws1 = games[gameID].getWS1();
        var ws2 = games[gameID].getWS2();

        if (checking === "DRAW") {

          ws1.send(messages.S_DRAW);
          ws2.send(messages.S_DRAW);

        } else if (checking === "VALID_MOVE") {

          console.log(games[gameID].getBoard());
          var valid = messages.O_VALID_MOVE;
          valid["col"] = col;
          valid["row"] = row;

          if ((games[gameID].getCounter() - 1) % 2 == 0) {

            //ws1
            valid["disctype"] = false;
          } else {

            //ws2
            valid["disctype"] = true;
          }

          ws1.send(JSON.stringify(valid));
          ws2.send(JSON.stringify(valid));

          //counter-1 
          if ((games[gameID].getCounter() - 1) % 2 == 0) {

            ws2.send(JSON.stringify(messages.O_YOUR_TURN))
            games[gameID].turn(games[gameID].getPlayer2ID());

          }

          if ((games[gameID].getCounter() - 1) % 2 == 1) {

            ws1.send(JSON.stringify(messages.O_YOUR_TURN));
            games[gameID].turn(games[gameID].getPlayer1ID());

          }

        } else {

          var won = messages.O_GAME_WON_BY;

          console.log(checking);
          if (checking === "WS1") {

            won["winner"] = games[gameID].getPlayer1ID();
            games[gameID].incrPlayer1Score();


          } else {

            won["winner"] = games[gameID].getPlayer2ID();
            games[gameID].incrPlayer2Score();
          }

          won["userScore"] = games[gameID].getPlayer1Score();
          won["opponentScore"] = games[gameID].getPlayer2Score();

          var messageWon = JSON.stringify(won);

          ws1.send(messageWon);

          won["userScore"] = games[gameID].getPlayer2Score();
          won["opponentScore"] = games[gameID].getPlayer1Score();

          var messageWon2 = JSON.stringify(won);

          ws2.send(messageWon);

        }

      }


    }else if(object["type"] === "POSSIBLE_REMATCH"){

      var count = games[object["gameID"]].getRematchCount();
      count++;
      games[object["gameID"]].setRematch(count);
      
      if(games[object["gameID"]].getRematchCount() === 2){

        var rematch = JSON.stringify(messages.O_REMATCH_CONFIRMED);
        games[object["gameID"]].resetBoard();
        games[object["gameID"]].getWS1().send(rematch);
        games[object["gameID"]].getWS2().send(rematch);

        games[object["gameID"]].ressetCounter();
        games[object["gameID"]].setRematch(0);
        games[object["gameID"]].getWS1().send(JSON.stringify(messages.O_YOUR_TURN));


      }

    }



  });

});

server.listen(port);

function Game(id) {

  this.id = id;
  this.player1 = null;
  this.player1ID = null;
  this.player2 = null;
  this.player2ID = null;
  this.scorePlayer1 = 0;
  this.scorePlayer2 = 0;
  this.counter = 0;

  this.isPaused = true;
  this.onTurn = null;

  this.rematchCount = 0;

  this.turn = function (player) { this.onTurn = player };

  this.board = [["x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x"]];

  this.resetBoard = function(){ this.board = [["x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x"],
  ["x", "x", "x", "x", "x", "x"]];};
  
  this.getBoard = function(){return this.board};

  this.addPlayer = function (socket, id) {

    if (this.player1 == null && this.player2 == null) {

      this.player1 = socket;
      this.player1ID = id;

    } else if (this.player1 != null && this.player2 == null) {

      this.player2 = socket;
      this.player2ID = id;

    }
  }

  this.isFull = function () {

    if (this.player1 != null && this.player2 != null) {
      return true
    }
    else {
      return false
    }
  }

  this.setRematch = function(count){this.rematchCount = count};
  this.getRematchCount = function(){return this.rematchCount};

  this.getWS1 = function () { return this.player1 };
  this.getWS2 = function () { return this.player2 };

  this.getID = function () { return this.id; };
  this.setID = function (id) { this.id = id; };

  this.getPlayer1ID = function () { return this.player1ID };
  this.getPlayer2ID = function () { return this.player2ID };

  this.getPlayer1Score = function () { return this.scorePlayer1; };
  this.getPlayer2Score = function () { return this.scorePlayer2; };
  this.incrPlayer1Score = function () { this.scorePlayer1++; };
  this.incrPlayer2Score = function () { this.scorePlayer2++; };

  this.dropPiece = function (x, y, piece) { this.board[x][y] = piece };
  this.getPiece = function (x, y) { return this.board[x][y] };

  this.ressetCounter = function () { this.counter = 0 };
  this.getCounter = function () { return this.counter };
  this.incrCounter = function () { this.counter++ };

  this.getPiece = function (col, row) { return this.board[col][row] };
  this.placePiece = function (col, row, value) { this.board[col][row] = value };
  this.getLength = function () { return this.board.length };
  this.getColLength = function (col) { return this.board[col].length };

}

module.exports = router;

function dropPiece(col, nr, gameID) {

  var rows = 5;

  var flag = true;
  var number = 0;

  for (var i = rows; i >= 0; i--) {

    if (games[gameID].getPiece(nr, i).localeCompare("x") == 0) {

      number = i;
      flag = false;
      games[gameID].incrCounter();
      break;

    }
  }
  if (flag) {

    console.log("invalid move");
    return null;
  }

  return number;

};


function check(counter, gameID) {

  if (counter < 7) {

    return "VALID_MOVE";
  }

  if (counter == 42) {

    return "DRAW";
  }

  //vertical check
  for (var i = 0; i < games[gameID].getLength(); i++) {
    var yInCol = 0;
    var rInCol = 0;
    for (var j = 0; j < games[gameID].getColLength(i); j++) {
      if (games[gameID].getPiece(i, j).localeCompare("y") == 0) {
        yInCol++;
        rInCol = 0;
      }
      else if (games[gameID].getPiece(i, j).localeCompare("r") == 0) {
        rInCol++;
        yInCol = 0;
      }
      else {
        rInCol = 0;
        yInCol = 0;
      }
      if (yInCol > 3) {

        return games[gameID].getWS1();
      }
      if (rInCol > 3) {

        return games[gameID].getWS2();
      }

    }

  }
  // horizontal check

  // grid[x][y]
  // x = select column
  // y = select row

  for (var i = 0; i < games[gameID].getColLength(0); i++) {
    var rInRow = 0;
    var yInRow = 0;
    for (var j = 0; j < games[gameID].getLength(); j++) {
      if (games[gameID].getPiece(j, i).localeCompare("y") == 0) {
        yInRow++;
        rInRow = 0;
      }
      if (games[gameID].getPiece(j, i).localeCompare("r") == 0) {
        rInRow++;
        yInRow = 0;
      }
      if (games[gameID].getPiece(j, i).localeCompare("x") == 0) {
        rInRow = 0;
        yInRow = 0;
      }

      if (yInRow > 3) {

        return games[gameID].getWS1();

      }

      if (rInRow > 3) {

        return games[gameID].getWS2();

      }
    }
  }

  // diagonal check

  for (var k = 0; k < 3; k++) {
    for (var i = 0; i < 4; i++) {
      yInDia = 0;
      rInDia = 0;
      for (var j = 0; j < 4; j++) {
        if (games[gameID].getPiece(j + i, j + k).localeCompare("y") == 0) {
          yInDia++;
          //rInDia = 0;
        }
        if (games[gameID].getPiece(j + i, j + k).localeCompare("r") == 0) {
          rInDia++;

          //yInDia = 0;
        }
        if (yInDia > 3) {

          return games[gameID].getWS1();

        }

        if (rInDia > 3) {

          return games[gameID].getWS2();

        }
      }
    }

  }
  for (var k = 0; k < 3; k++) {
    for (var i = 0; i < 4; i++) {
      yInDia = 0;
      rInDia = 0;
      for (var j = 0; j < 4; j++) {
        if (games[gameID].getPiece(j + i, 5 - j - k).localeCompare("y") == 0) {
          yInDia++;
          //rInDia = 0;
        }
        if (games[gameID].getPiece(j + i, 5 - j - k).localeCompare("r") == 0) {
          rInDia++;

          //yInDia = 0;
        }
        if (yInDia > 3) {

          return games[gameID].getWS1();

        }

        if (rInDia > 3) {

          return games[gameID].getWS2();

        }
      }
    }
  }

  return "VALID_MOVE";

}


/*function exit(){

    player1.addToTotal(game.getPlayer1Score);
    player2.addToTotal(game.getPlayer2Score);

}
*/

