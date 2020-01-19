(function(exports) {

    exports.O_GAME_STARTED = {
      type: "GAME-STARTED",
      data: null
    };
    exports.S_GAME_STARTED = JSON.stringify(exports.O_GAME_STARTED);
    /*
     * Client to server: game is complete, the winner is ...
     */
    exports.T_GAME_WON_BY = "GAME-WON-BY";
    exports.O_GAME_WON_BY = {
      type: exports.T_GAME_WON_BY,
      data: null
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

    /* client to server
     * piece dropped
     */
    exports.O_MOVE_MADE = {
      type: "MOVE_MADE",
      data: null
    }

    //server to client
    
    exports.O_VALID_MOVE = {
       type: "VALID_MOVE",
       data: null
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
  })(typeof exports === "undefined" ? (this.Messages = {}) : exports);
  //if exports is undefined, we are on the client; else the server