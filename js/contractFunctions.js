const contractFunctions = function() {

  const ABI = JSON.parse('[{"constant":true,"inputs":[],"name":"defaultDeck","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userBalance","outputs":[{"name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"}],"name":"withdrawAnte","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_gameHash","type":"bytes32"},{"name":"_player","type":"address"}],"name":"getInGameBalance","outputs":[{"name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_gameHash","type":"bytes32"},{"name":"_player","type":"address"}],"name":"getUserHand","outputs":[{"name":"","type":"bytes1[3]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"}],"name":"joinTable","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeInWei","outputs":[{"name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"}],"name":"getGameHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_gameHash","type":"bytes32"},{"name":"_player","type":"address"}],"name":"getPlayerIndex","outputs":[{"name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"},{"name":"_amount","type":"uint96"}],"name":"bet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeBlockQueried","outputs":[{"name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"}],"name":"getInitialCards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"table","outputs":[{"name":"potSize","type":"uint96"},{"name":"playerBet","type":"uint96"},{"name":"ante","type":"uint64"},{"name":"gameTimeStamp","type":"uint64"},{"name":"previousDeckLength","type":"uint64"},{"name":"numberOfCardsDealt","type":"uint64"},{"name":"betWindow","type":"uint64"},{"name":"deck","type":"bytes"},{"name":"currentPlayer","type":"address"},{"name":"roundState","type":"uint8"},{"name":"dealState","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_admin","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"}],"name":"createGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"hasGameAlreadyBeenCreated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint96"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"}],"name":"adminWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]');
  const contractAddress = "0x976b95e0e70f8e29b43ab9a8b51264d1db5058dc";
  const contract = web3.eth.contract(ABI).at(contractAddress);
  const gasPrice = 5000000000;
     
  function toFixedNumber(i) {
    if(~i.toString().indexOf("e")) {
        let num = parseInt(i);
        while(i > 1) {
            num += "0";
            i /= 10;
        }
        return num;
    }
    return i.toString();
  }
 
  function getGameHash(callback,callback1) {
    let order = JSON.parse(decodeURI(localStorage.getItem("order"))); 
    let ante = order['ante'];
    let deadline = order['deadline'];
    let betWindow = order['betWindow'];
    let nonce = order['nonce'];
    console.log(order)
    contract.getGameHash(ante,deadline,betWindow,nonce, function(err,val) {
      if(!err)
      if(callback && callback1)  
      callback(val,callback1);
    })
  }
  
  function getGameStruct(hash,callbackArr) {
    contract.table.call(hash, function(err,val) {
      if(!err)
      if(callbackArr.length > 1)
      console.log(hash,val);  
      callbackArr.forEach(function(callback) {
        callback(val);
      });  
    })
  }
  
  function getOtherGameData(hash,funcArr) {
    let userAddress = localStorage.getItem("userAddress");    
    funcArr.forEach(function(func) {
      if(func)
      func(hash,userAddress);  
    });  
  }  
  
  function getInGameBalance(hash,address) {
    contract.getInGameBalance(hash,address, function(err,val) {
      if(!err)
      console.log(val);  
    });  
  }  
  
  function getUserHand(hash,address) {
    contract.getUserHand(hash,address, function(err,val) {
      if(!err)
      console.log(val);  
    });  
  }   
  
  function getPlayerIndex(hash,address) {
    contract.getPlayerIndex(hash,address, function(err,val) {
      if(!err)
      console.log(val);  
    });  
  }     
  
  function getBalance(callback) {    
    let userAddress = localStorage.getItem("userAddress");
    contract.userBalance.call(userAddress, function(err,val) {
      if(!err)
      callback(val);  
    })    
  }
  
  function createGameLink(args) {
    let ante = toFixedNumber(parseFloat(args[0])*Math.pow(10,18));
    let deadline = args[1];
    let betWindow = args[2];
    let nonce = args[3];
    let orderJSON = {'ante':ante,'deadline':deadline,'betWindow':betWindow,'nonce':nonce};
    let orderString = JSON.stringify(orderJSON);
    prompt("Copy Your Game Link","https://etheraccy.github.io/?" + orderString);
  }  
  
  function create(_ante,_deadline,_betWindow) {
    let userAddress = localStorage.getItem("userAddress");  
    console.log(_ante);
    let ante = toFixedNumber(parseFloat(_ante)*Math.pow(10,18));
    let deadline = _deadline.toString();
    let betWindow = _betWindow.toString();
    let nonce = Math.random().toString().slice(2);
    let orderJSON = {'ante':ante,'deadline':deadline,'betWindow':betWindow,'nonce':nonce};
    console.log(orderJSON);
    let data = contract.createGame.getData(ante,deadline,betWindow,nonce);
    let Tx = {
       from: userAddress,
       to: contractAddress,
       data: data,
       gasPrice: gasPrice
    };
    transaction.send(Tx,createGameLink,[ante,deadline,betWindow,nonce]);      
  }
  
  function deposit(value) {
    let userAddress = localStorage.getItem("userAddress");
    let ethValue = toFixedNumber(parseFloat(value)*Math.pow(10,18));
    let data = contract.deposit.getData();
    let Tx = {
       from: userAddress,
       to: contractAddress,
       value:ethValue,
       data: data,
       gasPrice: gasPrice
    };
    transaction.send(Tx);
  }
  
  function withdraw(value) {
    let userAddress = localStorage.getItem("userAddress");
    let ethValue = toFixedNumber(parseFloat(value)*Math.pow(10,18));    
    let data = contract.withdraw.getData(ethValue);
    let Tx = {
       from: userAddress,
       to: contractAddress,
       data: data,
       gasPrice: gasPrice
    };
    transaction.send(Tx);  
  }
  
  function joinTable() {
    let userAddress = localStorage.getItem("userAddress");    
    let order = JSON.parse(decodeURI(localStorage.getItem("order"))); 
    let ante = order['ante'];
    let deadline = order['deadline'];
    let betWindow = order['betWindow'];
    let nonce = order['nonce'];
    let data = contract.joinTable.getData(ante,deadline,betWindow,nonce);
    let Tx = {
       from: userAddress,
       to: contractAddress,
       data: data,
       gasPrice: gasPrice
    };
    transaction.send(Tx);   
  }  
  
  function withdrawAnte() {
    let userAddress = localStorage.getItem("userAddress");    
    let order = JSON.parse(decodeURI(localStorage.getItem("order"))); 
    let ante = order['ante'];
    let deadline = order['deadline'];
    let betWindow = order['betWindow'];
    let nonce = order['nonce'];
    let data = contract.withdrawAnte.getData(ante,deadline,betWindow,nonce);
    let Tx = {
       from: userAddress,
       to: contractAddress,
       data: data,
       gasPrice: gasPrice
    };
    transaction.send(Tx);   
  }  
  
  function getInitialCards() {
    let userAddress = localStorage.getItem("userAddress");    
    let order = JSON.parse(decodeURI(localStorage.getItem("order"))); 
    let ante = order['ante'];
    let deadline = order['deadline'];
    let betWindow = order['betWindow'];
    let nonce = order['nonce'];
    let data = contract.getInitialCards.getData(ante,deadline,betWindow,nonce);
    let Tx = {
       from: userAddress,
       to: contractAddress,
       data: data,
       gasPrice: gasPrice
    };
    transaction.send(Tx);   
  } 
  
  function bet() {
    let userAddress = localStorage.getItem("userAddress");    
    let order = JSON.parse(decodeURI(localStorage.getItem("order"))); 
    let ante = order['ante'];
    let deadline = order['deadline'];
    let betWindow = order['betWindow'];
    let nonce = order['nonce'];
    let data = contract.bet.getData(ante,deadline,betWindow,nonce);
    let Tx = {
       from: userAddress,
       to: contractAddress,
       data: data,
       gasPrice: gasPrice
    };
    transaction.send(Tx);   
  } 
  
  return {
    getBalance,
    createGameLink,
    create,
    deposit,
    withdraw,
    joinTable,
    withdrawAnte,
    getInitialCards,
    getGameHash,
    bet,
    getGameStruct
  };
  
}();
