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
    let deadline = parseInt(parseFloat($('body > div > div > div > div.row.tp > div:nth-child(2) > div > div:nth-child(3) > input').val())*3600);
    let betWindow = parseInt(parseFloat($('body > div > div > div > div.row.tp > div:nth-child(2) > div > div:nth-child(4) > input').val())*3600);
    contractFunctions.create(ante,deadline,betWindow);
  }  
  
  function deposit() {
    let value = $('body > div > div > div > div.row.tp > div:nth-child(1) > div > div:nth-child(3) > input').val();    
    contractFunctions.deposit(value);
  }

  function withdraw() {
    let value = $('body > div > div > div > div.row.tp > div:nth-child(2) > div > div:nth-child(3) > input').val();  
    contractFunctions.withdraw(value);
  }
  
  function countDown(time,id) {
    var countDownDate = parseInt(time)*1000;
        
    var x = setInterval(function() {
      
    var now = Date.now();
      
    console.log(countDownDate,now);
      
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
    countDown(arr[3],'#timeFrame');  
  }  
  
  function getNumberOfCardsDealt(arr) {
    setInterval(function() {
      $('#numberOfCardsDealt').text(arr[5])
    }, 10800);  
  }
  
  function getAnte(arr) {
    $('#minBet').text(arr[2])
  }
  
  function getBetWindow(arr) {
    countDown(arr[6],'#betWindow');      
  }
  
  function getCurrentPlayer(arr) {
    setInterval(function() {
      $('#currentPlayer').text(arr[8])
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
      $('#gameState').text(arr[10])
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
   
  function getStructElements() {
    contractFunctions.getGameHash(contractFunctions.getGameStruct,[setPotSize,getStartTime,getAnte,getGameState,getPlayerList]);
  }  
  
  function moveBettorArrow() {
    let padding_left = parseInt($('.bettor').css('padding-left').replace("px","")) + 120;
    console.log(padding_left);
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
      getStructElements();
    }
  
  }
  
  return {
    init
  };
  
}();  
