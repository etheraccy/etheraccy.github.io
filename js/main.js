window.onload = function () {
  metamask.init();
  getParameters.init();
  EtherAccy.init();
  if(window.location.href === "https://etheraccy.github.io/gamePage.html") { 
    contractFunctions.hasGameAlreadyBeenCreated();
    contractFunctions.getGameStruct();    
  }
};  
