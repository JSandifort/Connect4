var userName ="fail";
var fullScreenCounter = 0;
var soundCounter = 0;
function setUserName(){
    var userNameSection = document.createElement("SECTION");
    userNameSection.setAttribute("id","userNameSection"); 
    
    var userNameText = document.createTextNode(userName);
     
    userNameSection.appendChild(userNameText);
    document.body.appendChild(userNameSection);
        
}
function openSettings(){
    if((fullScreenCounter)%2 == 0){
        var fullScreenSource = "images/connect4ImageToggleButtonOff.png";
        var fullScreenTxt = " fullscreen: off";
    }
    else{
        var fullScreenSource = "images/connect4ImageToggleButtonOn.png";
        var fullScreenTxt = " fullscreen: on";
        
    }
    if((soundCounter)%2 == 0){
        var soundSource = "images/connect4ImageToggleButtonOn.png";
        var soundText = " sound: on";
    }
    else{
        var soundSource = "images/connect4ImageToggleButtonOff.png";
        var soundText = " sound: off";
    }

    var fullScreenButton = document.createElement("img");
    fullScreenButton.src = fullScreenSource;
    fullScreenButton.setAttribute("onclick", "fullScreen()");

    var soundButton = document.createElement("img");
    soundButton.src = soundSource;
    soundButton.setAttribute("onclick", "sound()");

    var settingsExit = document.createElement("img");
    settingsExit.src = "images/connect4ImageSettingsExitButton.png";
    settingsExit.setAttribute("id", "exitButton");
    settingsExit.setAttribute("onclick", "closeSettings()");
    
    var paraFullScreen = document.createElement("P");

    paraFullScreen.setAttribute("id", 'paraFullScreen');
    paraFullScreen.appendChild(fullScreenButton);
    paraFullScreen.appendChild(document.createTextNode(fullScreenTxt));    
    
    var paraSound = document.createElement("P");
    
    paraSound.setAttribute("id", 'paraSound');
    paraSound.appendChild(soundButton);
    paraSound.appendChild(document.createTextNode(soundText));    

    var howToPlayButton = document.createElement("img");
    howToPlayButton.src = "images/connect4ImageHTPButton.png";
    howToPlayButton.setAttribute("id", "HTPButton");
    howToPlayButton.setAttribute("onclick", "openHTP()");

    var sectionSettings = document.createElement("SECTION");
    sectionSettings.setAttribute("id", "settings");
    
    sectionSettings.appendChild(settingsExit);
    sectionSettings.appendChild(paraFullScreen);
    sectionSettings.appendChild(paraSound); 
    sectionSettings.appendChild(howToPlayButton);
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
    if(fullScreenCounter%2 == 0){
        document.documentElement.requestFullscreen();
        fullScreenCounter++;
        document.getElementById("settings").removeChild(document.getElementById("paraFullScreen"));
        
        var fullScreenButton = document.createElement("img");
        fullScreenButton.src = "images/connect4ImageToggleButtonOn.png";
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
        fullScreenCounter++;    
        document.getElementById("settings").removeChild(document.getElementById("paraFullScreen"));
        
        var fullScreenButton = document.createElement("img");
        fullScreenButton.src = "images/connect4ImageToggleButtonOff.png";
        fullScreenButton.setAttribute("onclick", "fullScreen()");

        var paraFullScreen = document.createElement("P");
    
        var fullScreenText = document.createTextNode(" fullscreen: off");
        paraFullScreen.setAttribute("id", "paraFullScreen");
        paraFullScreen.appendChild(fullScreenButton);
        paraFullScreen.appendChild(fullScreenText);
        document.getElementById("settings").appendChild(paraFullScreen); 
        
    }
}
function sound(){
    if(soundCounter%2 == 0){
        soundCounter++;
        document.getElementById("settings").removeChild(document.getElementById("paraSound"));
        
        var soundButton = document.createElement("img");
        soundButton.src = "images/connect4ImageToggleButtonOff.png";
        soundButton.setAttribute("onclick", "sound()");

        var paraSound = document.createElement("P");
    
        var soundText = document.createTextNode(" sound: off");
        paraSound.setAttribute("id", "paraSound");
        paraSound.appendChild(soundButton);
        paraSound.appendChild(soundText);
        document.getElementById("settings").appendChild(paraSound);  
    }
    else{
        soundCounter++;
        document.getElementById("settings").removeChild(document.getElementById("paraSound"));
        
        var sound = new Audio("connect4Sound.M4A");
        sound.play();

        var soundButton = document.createElement("img");
        soundButton.src = "images/connect4ImageToggleButtonOn.png";
        soundButton.setAttribute("onclick", "sound()");

        var paraSound = document.createElement("P");
    
        var soundText = document.createTextNode(" sound: on");
        paraSound.setAttribute("id", "paraSound");
        paraSound.appendChild(soundButton);
        paraSound.appendChild(soundText);
        document.getElementById("settings").appendChild(paraSound); 
    }
}
function openHTP(){
    var sectionHowToPlay = document. createElement("SECTION");
    sectionHowToPlay.setAttribute("id", "sectionHowToPlay");
    
    var sectionHTPExit = document.createElement("img");

    sectionHTPExit.setAttribute("id", "exitButton");
    sectionHTPExit.setAttribute("onclick", "closeHTP()");
    sectionHTPExit.src = "images/connect4ImageSettingsExitButton.png";

    sectionHowToPlay.appendChild(sectionHTPExit);
    document.body.appendChild(sectionHowToPlay);
    
}
function closeHTP(){
    document.body.removeChild(document.getElementById("sectionHowToPlay"))
}