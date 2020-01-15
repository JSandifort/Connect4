var userName ="fail";
var counter = 0;

function setUserName(){
    var userNameSection = document.createElement("SECTION");
    userNameSection.setAttribute("id","userNameSection"); 
    
    var userNameText = document.createTextNode(userName);
     
    userNameSection.appendChild(userNameText);
    document.body.appendChild(userNameSection);
        
}
function openSettings(){
    if((counter)%2 == 0){
        var source = "images/connect4ImageFullScreenButtonOff.png";
        var txt = " fullscreen: off";
    }
    else{
        var source = "images/connect4ImageFullScreenButtonOn.png";
        var txt = " fullscreen: on";
    }

    var fullScreenButton = document.createElement("img");
    fullScreenButton.src = source;
    fullScreenButton.setAttribute("onclick", "fullScreen()");

    var settingsExit = document.createElement("img");
    settingsExit.src = "images/connect4ImageSettingsExitButton.png";
    settingsExit.setAttribute("id", "exitButton");
    settingsExit.setAttribute("onclick", "closeSettings()");
    
    var paraFullScreen = document.createElement("P");
    
    var fullScreenText = document.createTextNode(txt);
    paraFullScreen.setAttribute("id", 'paraFullScreen');
    paraFullScreen.appendChild(fullScreenButton);
    paraFullScreen.appendChild(fullScreenText);    
    
    var sectionSettings = document.createElement("SECTION");
    sectionSettings.setAttribute("id", "settings");
    

    sectionSettings.appendChild(settingsExit);
    sectionSettings.appendChild(paraFullScreen);
    document.body.appendChild(sectionSettings);
    return;
}
function closeSettings(){
    document.body.removeChild(document.getElementById("settings"));
}
function openTournament(){
    
    var tournamentExit = document.createElement("img");
    tournamentExit.src = "images/connect4ImageSettingsExitButton.png";
    tournamentExit.setAttribute("id", "exitButton");
    tournamentExit.setAttribute("onclick", "closeTournament()");
    
    var sectionTournament = document.createElement("SECTION");
    sectionTournament.setAttribute("id", "tournament");
    
    sectionTournament.appendChild(tournamentExit);
    document.body.appendChild(sectionTournament);
    return;
}
function closeTournament(){
    document.body.removeChild(document.getElementById("tournament"));
}
function fullScreen(){
    if(counter%2 == 0){
        document.documentElement.requestFullscreen();
        counter++;
        document.getElementById("settings").removeChild(document.getElementById("paraFullScreen"));
        
        var fullScreenButton = document.createElement("img");
        fullScreenButton.src = "images/connect4ImageFullScreenButtonOn.png";
        fullScreenButton.setAttribute("onclick", "fullScreen()");

        var paraFullScreen = document.createElement("P");
    
        var fullScreenText = document.createTextNode(" fullscreen: on");
        paraFullScreen.setAttribute("id", "paraFullScreen");
        paraFullScreen.appendChild(fullScreenButton);
        paraFullScreen.appendChild(fullScreenText);
        document.getElementById("settings").appendChild(paraFullScreen);    
    }

    else{
        document.exitFullscreen();
        counter++;    
        document.getElementById("settings").removeChild(document.getElementById("paraFullScreen"));
        
        var fullScreenButton = document.createElement("img");
        fullScreenButton.src = "images/connect4ImageFullScreenButtonOff.png";
        fullScreenButton.setAttribute("onclick", "fullScreen()");

        var paraFullScreen = document.createElement("P");
    
        var fullScreenText = document.createTextNode(" fullscreen: off");
        paraFullScreen.setAttribute("id", "paraFullScreen");
        paraFullScreen.appendChild(fullScreenButton);
        paraFullScreen.appendChild(fullScreenText);
        document.getElementById("settings").appendChild(paraFullScreen); 
    }
}