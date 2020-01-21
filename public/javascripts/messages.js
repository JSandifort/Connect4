(function (exports) {

  exports.O_GAME_STARTED = {
    type: "GAME_STARTED",
    gameID: null,
    userID: null,
    opponentID: null
  };

  //server to client 
  exports.O_DRAW = {
    type: "DRAW"
  }
  exports.S_DRAW = JSON.stringify(exports.O_DRAW);
  /*
   * Client to server: game is complete, the winner is ...
   */
  exports.T_GAME_WON_BY = "GAME_WON_BY";
  exports.O_GAME_WON_BY = {
    type: exports.T_GAME_WON_BY,
    winner: null,
    userScore: 0,
    opponentScore: 0
  };

  /*
   * Server to client: abort game (e.g. if second player exited the game)
   */
  exports.O_GAME_ABORTED = {
    type: "GAME_ABORTED"
  };
  exports.S_GAME_ABORTED = JSON.stringify(exports.O_GAME_ABORTED);

  //server to client
  //your turn

  exports.O_YOUR_TURN = {
    type: "YOUR_TURN",
    data: null

  }

 
  //server to client

  exports.O_VALID_MOVE = {
    type: "VALID_MOVE",
    col: null,
    row: null,
    disctype: null
  }

  //server to cient 

  exports.O_INVALID_MOVE = {
    type: "INVALID_MOVE",
    data: null

  }

  /*
   * Server to Player A & B: game over with result won/loss
   */
  exports.T_GAME_OVER = "GAME-OVER";
  exports.O_GAME_OVER = {
    type: exports.T_GAME_OVER,
    data: null
  };


  exports.O_REMATCH_CONFIRMED = {
    
    type: "REMATCH_CONFIRMED",
    data: null
  };


})(typeof exports === "undefined" ? (this.Messages = {}) : exports);
  //if exports is undefined, we are on the client; else the server