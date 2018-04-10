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
  
  function countDown(time) {
    var countDownDate = parseInt(time)*1000;
    
    var x = setInterval(function() {
      
    var now = new Date().getTime();
    var distance = countDownDate - now;
    
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    $('#timeFrame').html(days + 'd ' + hours + 'h '
    + minutes + 'm ' + seconds + 's ');
    
    if (distance < 0) {
        $('#timeFrame').html('EXPIRED');
    }
}, 1000);  
  }  
  
  function getStartTime(arr) {
    countDown(arr[4]);  
  }  
  
  function startCountDown() {
    contractFunctions.getGameHash(contractFunctions.getGameStruct,getStartTime)
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
    if(window.location.href === "https://etheraccy.github.io/gamePage.html") {
      startCountDown();
    }
  
  }
  
  return {
    init
  };
  
}();  
