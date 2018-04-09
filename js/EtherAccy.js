const EtherAccy = function() {

  function setBalance(value) {
    let balance = parseInt(value)/Math.pow(10,18);
    $('body > div > div > div > div.row.tp > div:nth-child(1) > div > div:nth-child(2) > input').attr('placeholder',balance);
    $('body > div > div > div > div.row.tp > div:nth-child(2) > div > div:nth-child(2) > input').attr('placeholder',balance);    
  }  
  
  function getBalance() {
    contractFunctions.getBalance(setBalance);  
  }  
  
  function deposit() {
    let value = $('body > div > div > div > div.row.tp > div:nth-child(1) > div > div:nth-child(3) > input').val();    
    contractFunctions.deposit(value);
  }

  function withdraw() {
    let value = $('body > div > div > div > div.row.tp > div:nth-child(2) > div > div:nth-child(3) > input').val();  
    contracFunctions.withdraw(value);
  }

  function init() {
    getBalance();
    $('body > div > div > div > div.row.tp > div:nth-child(1) > div > center > button').on('click',deposit);
    $('body > div > div > div > div.row.tp > div:nth-child(2) > div > center > button').on('click',withdraw);
  }
  
  return {
    init
  };
  
}();  
