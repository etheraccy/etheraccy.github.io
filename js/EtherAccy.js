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
  
 function adminWithdrawal() {
    contractFunctions.adminWithdrawal();
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
    $('#betWindow').text((parseInt(arr[5])/3600).toString() + " mins" );      
  }
  
  function setCurrentPlayer(arr) {
      let currentPlayer = arr[8];
      let query = "[data-content='" + currentPlayer + "']"; 
      if($(query).attr('data-content') === currentPlayer) {      
        let currentPlayerNumber =  parseInt($(query).text().replace("Player ",""));
        let elementWidth = $('#mainGamePage > div > ul > li:nth-child(1)').outerWidth();            
        let scaledWidth = (elementWidth/2)*(currentPlayerNumber-1);  
        console.log(elementWidth,scaledWidth);
        $('#mainGamePage > div > div').css('padding-left', scaledWidth.toString() + "px");
      }  
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
      contractFunctions.getGameHash(contractFunctions.getGameStruct,[setPotSize,getStartTime,getAnte,getBetWindow]);
    },5000);        
  }  

  function getCurrentPlayer() {
    setInterval(function() {
      contractFunctions.getGameHash(contractFunctions.getGameStruct,[setCurrentPlayer]);
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
  
  function redirectPlayerToGamePage() {
    let playerList = localStorage.getItem("playerList").split(",");
    let user = localStorage.getItem("userAddress");
    for(let i in playerList) {
      if(playerList[i] === user) {
        $('#enterGame').hide();
        $('#mainGamePage').hide();
        if($('#bettorPage').css('display') === 'none') {
          $('#getInitialCards').show();          
        }  
        return;
      }
    }
    $('#gameJoined').show();
  }   
  
  function setState(state) {
    state = parseInt(state)
    let game_state = "";
    if(state === 0) {
      game_state = "NONE";
    }    
    else if(state === 1) {
      game_state = "WAITING_FOR_PLAYERS";
      $('#enterGame').show();
    }  
    else if(state === 2) {
      game_state = "GAME_LIVE"; 
    }
    else if(state === 3) {
      game_state = "GAME_CANCELLED";  
      $('#enterGame').hide();             
      $('#withdrawAnte').show();
    }      
    else if(state === 4) {
      game_state = "GAME_FINISHED"; 
    }     
    else if(state === 5) {
      game_state = "INVALID";                                    
    }         
    $('#gameState').text(game_state); 
  }
  
  function setGameState(state) {
    $('#roundState').text(parseInt(state));
    state = parseInt(state)
    let game_state = "";
    if(state === 0) {
      game_state = "DEALING_CARDS";
      $('#getInitialCards').hide();          
      $('#bettorPage').show();
      checkThirdCard();
    }    
    else if(state === 1) {
      game_state = "CARDS_DEALT";
    }  
    else if(state === 2) {
      game_state = "NEXT_PLAYER"; 
    }  
    else if(state === 3) {
      game_state = "INVALID";            
    }
    $('#roundState').text(game_state);
 }    
  
  function getState() {
    setInterval(function() {
      contractFunctions.getState(setState);
    }, 5000);  
  }
  
  function getGameState() {
    setInterval(function() {
      contractFunctions.getGameState(setGameState);
    }, 5000);  
  }    
  
  function selectMinBet() {
    $('#bettorPage > div > ul > div.col-lg-9 > li.min > h5 > span').addClass('selectedBox');
    $('#bettorPage > div > ul > div.col-lg-9 > li.max > h5 > span').removeClass('selectedBox');
    $('#bettorPage > div > ul > div.col-lg-9 > li.cus > h5 > span').css('border-color','#afafaf');  
    localStorage.setItem("betChoice","minBet");
  }  
  
  function selectMaxBet() {
    $('#bettorPage > div > ul > div.col-lg-9 > li.max > h5 > span').addClass('selectedBox');
    $('#bettorPage > div > ul > div.col-lg-9 > li.min > h5 > span').removeClass('selectedBox');
    $('#bettorPage > div > ul > div.col-lg-9 > li.cus > h5 > span').css('border-color','#afafaf'); 
    localStorage.setItem("betChoice","maxBet");   
  }
  
  function selectCustomBet() {
    $('#bettorPage > div > ul > div.col-lg-9 > li.min > h5 > span').removeClass('selectedBox');  
    $('#bettorPage > div > ul > div.col-lg-9 > li.max > h5 > span').removeClass('selectedBox');    
    $('#bettorPage > div > ul > div.col-lg-9 > li.cus > h5 > span').css('border-color','black'); 
    localStorage.setItem("betChoice","customBet");    
  }  
  
  function displayCard(val) {
    let cardValue = (parseInt(val)/12) + 1;
    let cardTypeNum = Math.random.slice(2) % 4;; 
    let cardType = localStorage.getItem(cardTypeNum);
    while(cardType === null) {
      cardTypeNum = Math.random.slice(2) % 4;
      cardType = localStorage.getItem(cardTypeNum);
    }  
    if(cardType < 12) {
      localStorage.setItem(cardTypeNum,cardType++);
    }
    else {
      localStorage.setItem(cardTypeNum,null);
    } 
    $('#bettorPage > ul > div > li:nth-child(1) > div.n > h4').text(cardValue);
    $('#bettorPage > ul > div > li:nth-child(3) > div.s > img').attr('src',"img/" + cardType + ".png");
  }  
  
  function checkForThirdCardLogic(arr) {
    if(arr.length == 3) {
      displayCard(arr[2]);  
    }    
  }  
 
  function checkThirdCard() {
    setInterval(function() {    
      contractFunctions.getUserHand(checkForThirdCardLogic);
    },5000);
  }  
  
  function setCards(arr) {
    displayCard(arr[0]);
    displayCard(arr[1]);
  }  
 
  function getCards() {
    contractFunctions.getUserHand(setCards);
  }
  
  function getInitialCards() {
    $('#getInitialCards').hide();    
    $('#bettorPage').show();
    contractFunctions.getInitialCards(getCards);        
  }  
  
  function placeBet() {
    let betChoice = localStorage.getItem("betChoice");
    localStorage.removeItem("betChoice");   
    let betValue;
    if(betChoice === "minBet") {
      betValue = parseFloat($('#minBet').text().replace(" ETH",""))*1e18;
    }  
    else if(betChoice === "maxBet") {
      betValue = parseFloat($('#potAmount').text().replace(" ETH",""))*1e18;
    }  
    else if(betChoice === "customBet") {
      betValue = parseFloat($('#bettorPage > div > ul > div.col-lg-9 > li.cus > h5 > span > input').val());
    }
    contractFunctions.bet(betValue);
  }  
  
  function init() {
    getBalance();  
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
      $('#adminWithdrawal').on('click',adminWithdrawal);
      $('#bettorPage > div > ul > div.col-lg-9 > li.min > h5 > span').on('click',selectMinBet);
      $('#bettorPage > div > ul > div.col-lg-9 > li.max > h5 > span').on('click',selectMaxBet);
      $('#bettorPage > div > ul > div.col-lg-9 > li.cus > h5 > span > input').on('click',selectCustomBet);
      $('#getInitialCards').on('click',getInitialCards);
      $('#placeBet').on('click',placeBet);
      getCurrentPlayer(); 
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
