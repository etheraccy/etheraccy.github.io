const EtherAccy = function() {

  function setBalance(value) {
    let balance = parseInt(value)/Math.pow(10,18);
    $('body > div > div > div > div.header > div:nth-child(1) > div > div.meta.float-right.text-center > h5:nth-child(2) > span').text(balance);
  }  
  
  function getBalance() {
    contractFunctions.getBalance(setBalance);  
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
  
  function countDown(time,id) {
    var countDownDate = time*1000;
        
    var x = setInterval(function() {
      
    var now = Date.now();
    
    console.log(countDownDate,now)  
      
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
    setInterval(function() {
      $('#numberOfCardsDealt').text(arr[5])
    }, 10800);  
  }
  
  function getAnte(arr) {
    $('#minBet').text((parseFloat(arr[2])/1e18).toString() + " ETH")
  }
  
  function getBetWindow(arr) {
    countDown(arr[5],'#betWindow');      
  }
  
  function getCurrentPlayer(arr) {
    setInterval(function() {
      let query = "[address='" + arr[8] + "']"; 
      let elementWidth = $('body > div > div > div > div.row.tp > div > div > div.col-lg-8.player-parent.clearfix > ul > li:nth-child(3)').outerWidth();    
      let currentPlayerNumber =  parseInt($(query).attr('id').replace("player",""));
      let scaledWidth = elementWidth*currentPlayerNumber;
      console.log(scaledWidth);
      let padding_left = parseInt(parseInt($('.bettor').css('padding-left').replace("px","")) + scaledWidth);
    }, 10800);     
  }
  
  function getPlayerList(arr) {
    setInterval(function() {
      for(i=0;i<arr[9].length - 1;i++) {
        let playerElement = '#player' + (i+1).toString();
        $(playerElement).text(arr[9][i]);
      }  
    }, 5000);       
  }

  function getGameState(arr) {
    setInterval(function() {
      let state;
      let val = parseFloat(arr[10]);
      if(val === 0) {
        state = "WAITING_FOR_PLAYERS" 
      }  
      else if(val === 1) {
        state = "GAME_LIVE"
      }  
      else if(val === 2) {
        state = "DEALING_CARDS"
      }  
      else if(val === 3) {
        state = "CARDS_DEALT"
      }  
      else if(val === 4) {
        state = "GAME_CANCELLED" 
      }  
      else if(val === 5) {
        state = "GAME_FINISHED"
      }  
      else if(val === 6) {
        state = "INVALID GAME"      
      }  
      $('#gameState').text(state);
    }, 5000);    
  }
  
  function getDealState(arr) {
    setInterval(function() {
      $('#dealState').text(arr[11])
    }, 5000);        
  }
  
  function getUserHand(arr) {
    setInterval(function() {
      $('#userHand').text(arr[13])
    }, 5000);      
  }
  
  function getGameBalance(arr) {
    setInterval(function() {
      $('#gameBalance').text(arr[14])
    }, 5000);   
  }
  
  function setInGameBalance(val) {
    setInterval(function() {
      $('#inGameBalance').text(val);
    }, 5000);  
  }  
  
  function getInGameBalance() {
     contractFunctions.getGameHash(contractFunctions.getInGameBalance,setInGameBalance);
  }  
  
  function getStructElements() {
    contractFunctions.getGameHash(contractFunctions.getGameStruct,[setPotSize,getStartTime,getAnte,getGameState,getPlayerList]);
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
      console.log("deposit","withdraw")
    }  
    if(window.location.href === "https://etheraccy.github.io/index.html" || window.location.href === "https://etheraccy.github.io/") {
      $('body > div > div > div > div.row.tp > div:nth-child(2) > div > center > button').on('click',create);      
    }
    if(~window.location.href.indexOf("https://etheraccy.github.io/gamePage.html")) {
      getStructElements();
      $('#enterGame').on('click',joinTable);
    }
  
  }
  
  return {
    init
  };
  
}();  
