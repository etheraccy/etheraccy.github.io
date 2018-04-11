const EtherAccy = function() {

  function setBalance(value) {
    let balance = parseInt(value)/Math.pow(10,18);
    $('body > div > div > div > div.header > div:nth-child(1) > div > div.meta.float-right.text-center > h5:nth-child(2) > span').text(balance);
  }  
  
  function getBalance() {
    setInterval(function() {       
      contractFunctions.getBalance(setBalance);  
    },5000);  
  }  
  
  function create() {
    let ante = $('body > div > div > div > div.row.tp > div:nth-child(2) > div > div:nth-child(2) > input').val();
    let deadline = parseInt(parseFloat($('body > div > div > div > div.row.tp > div:nth-child(2) > div > div:nth-child(3) > input').val())*60*60);
    let betWindow = parseInt(parseFloat($('body > div > div > div > div.row.tp > div:nth-child(2) > div > div:nth-child(4) > input').val())*60*60);
    contractFunctions.create(ante,deadline,betWindow);
  }  
  
  function deposit() {
    let value = $('body > div > div > div > div.row.tp > div:nth-child(1) > div > div > input').val();    
    contractFunctions.deposit(value);
  }

  function withdraw() {
    let value = $('body > div > div > div > div.row.tp > div:nth-child(2) > div > div > input').val();  
    contractFunctions.withdraw(value);
  }
  
  function joinTable() {
    contractFunctions.joinTable();
  }
  
 function withdrawAnte() {
    contractFunctions.withdrawAnte();
 }
  
  function countDown(time,id) {
    var countDownDate = time*1000;
        
    var x = setInterval(function() {
      
    var now = Date.now();
          
    var distance = countDownDate - now;
    
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    $(id).html(days + 'd ' + hours + 'h '
    + minutes + 'm ' + seconds + 's ');
    
    if (distance < 0) {
        $(id).html('EXPIRED');
    }
}, 1000);  
  }  
    
  function setPotSize(arr) {
    $('#potAmount').text(parseInt(arr[0])/Math.pow(10,18));   
  }  
  
  function getStartTime(arr) {
    let order = JSON.parse(decodeURI(localStorage.getItem("order"))); 
    let deadline = parseInt(order['deadline']);
    countDown(parseInt(arr[6]) + deadline,'#timeFrame');  
  }  
  
  function getNumberOfCardsDealt(arr) {
    $('#numberOfCardsDealt').text(arr[5])
  }
  
  function getAnte(arr) {
    $('#minBet').text((parseFloat(arr[2])/1e18).toString() + " ETH")
  }
  
  function getBetWindow(arr) {
    countDown(arr[5],'#betWindow');      
  }
  
  function getCurrentPlayer(arr) {
      let query = "[address='" + arr[8] + "']"; 
      let elementWidth = $('body > div > div > div > div.row.tp > div > div > div.col-lg-8.player-parent.clearfix > ul > li:nth-child(3)').outerWidth();    
      let currentPlayerNumber =  parseInt($(query).attr('id').replace("player",""));
      let scaledWidth = elementWidth*currentPlayerNumber;
      let padding_left = parseInt(parseInt($('.bettor').css('padding-left').replace("px","")) + scaledWidth);
  }
  
  function getUserHand(arr) {
    $('#userHand').text(arr[13])
  }
  
  function getGameBalance(arr) {
    $('#gameBalance').text(arr[14])
  }
  
  function setInGameBalance(val) {
    $('#inGameBalance').text((val/1e18).toString() + " ETH");
  }  
  
  function getInGameBalance() {
    setInterval(function() {       
      contractFunctions.getGameHash(contractFunctions.getInGameBalance,[setInGameBalance]);
    },5000);    
  } 
  
  function getStructElements() {
    setInterval(function() {   
      contractFunctions.getGameHash(contractFunctions.getGameStruct,[setPotSize,getStartTime,getAnte]);
    },5000);        
  }  
  
  function setPlayerList(arr) {
    localStorage.setItem("playerList",arr);
    for(i=0;i<arr.length;i++) {
      let playerElement = '#player' + (i+1).toString() + '> a';
      $(playerElement).attr("data-content",arr[i]);      
    }  
  }
  
  function getPlayerList() {
    setInterval(function() {   
      contractFunctions.getGameHash(contractFunctions.getPlayerList,setPlayerList);    
    },5000);  
  }  
  
  function setUserHand(arr) {
    console.log(arr);
  }  
  
  function getUserHand() { 
    contractFunctions.getGameHash(contractFunctions.getUserHand,[]);    
  }    
    
  function setState(state) {
    state = parseInt(state)
    let game_state = "";
    if(state === 0) {
      game_state = "WAITING_FOR_PLAYERS";
    }  
    else if(state === 1) {
      game_state = "GAME_LIVE";      
    }  
    else if(state === 2) {
      game_state = "DEALING_CARDS";            
    }  
    else if(state === 3) {
      game_state = "CARDS_DEALT";                  
    }  
    else if(state === 4) {
      game_state = "GAME_CANCELLED";  
      $('#enterGame').hide();             
      $('#withdrawAnte').show();
    }      
    else if(state === 5) {
      game_state = "GAME_FINISHED";                              
    }     
    else if(state === 6) {
      game_state = "INVALID";                                    
    }         
    $('#gameState').text(game_state);
  }
  
  function setGameState(state) {
    $('#dealState').text(parseInt(state));
  }    
  
  function getState() {
    contractFunctions.getState(setState);
  }
  
  function getGameState() {
    setInterval(function() {
      contractFunctions.getGameState(setGameState);
    }, 5000);  
  }  
    
  function moveBettorArrow() {
    let elementWidth = $('body > div > div > div > div.row.tp > div > div > div.col-lg-8.player-parent.clearfix > ul > li:nth-child(3)').outerWidth();    
    let padding_left = parseInt(parseInt($('.bettor').css('padding-left').replace("px","")) + elementWidth);
    $('.bettor').css('padding-left',padding_left.toString() + "px");
  }  
  
  function init() {
    getBalance();  
    $('.bettor').on('click',moveBettorArrow); 
    if(window.location.href === "https://etheraccy.github.io/depositWithdraw.html") {
      $('body > div > div > div > div.row.tp > div:nth-child(1) > div > center > button').on('click',deposit);
      $('body > div > div > div > div.row.tp > div:nth-child(2) > div > center > button').on('click',withdraw);  
    }  
    if(window.location.href === "https://etheraccy.github.io/index.html" || window.location.href === "https://etheraccy.github.io/") {
      $('body > div > div > div > div.row.tp > div:nth-child(2) > div > center > button').on('click',create);      
    }
    if(~window.location.href.indexOf("https://etheraccy.github.io/gamePage.html")) {
      $('[data-toggle="popover"]').popover();            
      $('#withdrawAnte').on('click',withdrawAnte);
      $('#enterGame').on('click',joinTable);      
      getStructElements();
      getInGameBalance();
      getState();
      getGameState();
      getPlayerList();
    }
  
  }
  
  return {
    init
  };
  
}();  
