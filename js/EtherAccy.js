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
    countDown(parseInt(arr[4]) + deadline,'#timeFrame');  
  }  
  
  function getNumberOfCardsDealt(arr) {
    $('#numberOfCardsDealt').text(arr[3])
  }
  
  function getAnte(arr) {
    $('#minBet').text((parseFloat(arr[1])/1e18).toString() + " ETH")
  }
  
  function getBetWindow(arr) {
    $('#betWindow').text((parseInt(arr[5])/3600).toString() + " mins" )     
  }

  function getGameBalance(arr) {
    $('#gameBalance').text(arr[0])
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
  
  function setCurrentPlayer(arr) {
      let currentPlayer = arr[6];
      let query = "[data-content='" + currentPlayer + "']"; 
      let userAddress = localStorage.getItem("userAddress");
      if(currentPlayer === userAddress || currentPlayer === "0x0000000000000000000000000000000000000000") {
        $('#mainGamePage').hide();
        $('#bettorPage').show();
        $('#getInitialCards').show();
      }  
      if($(query).attr('data-content') === currentPlayer) {      
        let currentPlayerNumber =  parseInt($(query).text().replace("Player ",""));
        let elementWidth = parseInt($('#mainGamePage > div > ul > li:nth-child(1)').outerWidth());            
        let scaledWidth = (elementWidth)*(currentPlayerNumber-1);       
        let paddingLeft = 35 + scaledWidth;        
        $('#mainGamePage > div > div').css('padding-left', paddingLeft.toString() + "px"); 
      }  
  }  

  function getCurrentPlayer() {
    setInterval(function() {
      console.log("Getting Current Player");
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
  function getGameState() {
    contractFunctions.getGameState(setGameState);
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
      getGameState();
      getCurrentPlayer();     
      $('#enterGame').hide();      
    }
    else if(state === 3) {
      game_state = "GAME_CANCELLED";  
      $('#enterGame').hide();    
      $('#withdrawAnte').show();
    }      
    else if(state === 4) {
      game_state = "GAME_FINISHED"; 
      $('#mainGamePage').show();
      $('#getInitialCards').hide();
      $('#bettorPage').hide();    
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
      $('#mainGamePage').show();      
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
    contractFunctions.getState(setState);
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
    let cardTypeNum = Math.random % 4;; 
    let cardType = localStorage.getItem(cardTypeNum);
    if(cardType < 12) {
      localStorage.setItem(cardTypeNum,cardType++);
    }
    if(cardType > 12) {
      localStorage.setItem(cardTypeNum,"none");
    }    
    if(cardType === null) {
      localStorage.setItem(cardTypeNum,1);
    }  
    while(cardType === "none") {
      cardTypeNum = Math.random % 4;
      cardType = localStorage.getItem(cardTypeNum);
    }  
    $('#bettorPage > ul > div > li:nth-child(1) > div.n > h4').text(cardValue);
    $('#bettorPage > ul > div > li:nth-child(3) > div.s > img').attr('src',"img/" + cardType + ".png");
  }  

  function toDecimal(hex) {  
    let decimalNumber = parseInt(hex.replace(/^[0]+/g,""),16)  
    return decimalNumber;
  }
  
  function setCards(arr) {
    displayCard(toDecimal(arr[0]));
    displayCard(toDecimal(arr[1]));
  }   
  
  function checkForThirdCardLogic(arr) {
    console.log(arr);
    if(arr.length == 3) {
      displayCard(arr[2]); 
      $('#mainGamePage > ul').show();      
    }
    if(arr.length == 2) {
      displayCard(arr[0]);
      displayCard(arr[1]);
    }  
  }   

  function logUserHand(arr) {
    console.log(arr[6]);
  }  
  
  function getCurrentUserHand(hash,arr) {
    let user = arr[6];
    console.log(hash,arr,user);
    contractFunctions.getUserHand(hash,user,logUserHand);
  }  
  
  function getGameStructWrapper(hash) {
    console.log(hash);
    contractFunctions.getGameStruct(hash,getCurrentUserHand);    
  }  
  
  function getCurrentUserCards() {
    contractFunctions.getGameHash(getGameStructWrapper);
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
    console.log(betValue)
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
      getCurrentUserCards();
      getStructElements();
      getInGameBalance();
      getState();
      getPlayerList();
    }
  
  }
  
  return {
    init
  };
  
}();  
