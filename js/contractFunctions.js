const contractFunctions = function() {

  const ABI = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userBalance","outputs":[{"name":"","type":"uint128"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint128"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"}],"name":"withdrawAnte","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_gameHash","type":"bytes32"},{"name":"_player","type":"address"}],"name":"getInGameBalance","outputs":[{"name":"","type":"uint128"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_gameHash","type":"bytes32"},{"name":"_player","type":"address"}],"name":"getUserHand","outputs":[{"name":"","type":"uint8[3]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"}],"name":"getGameState","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"}],"name":"joinTable","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_gameHash","type":"bytes32"},{"name":"_player","type":"address"}],"name":"getBetWindow","outputs":[{"name":"","type":"uint128"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"feeInWei","outputs":[{"name":"","type":"uint128"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"}],"name":"getGameHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_gameHash","type":"bytes32"},{"name":"_player","type":"address"}],"name":"getPlayerIndex","outputs":[{"name":"","type":"uint128"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"}],"name":"getInitialCards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"game","outputs":[{"name":"pot","type":"uint128"},{"name":"ante","type":"uint128"},{"name":"numberOfCardsDealt","type":"uint64"},{"name":"previousDeckLength","type":"uint64"},{"name":"gameTimeStamp","type":"uint96"},{"name":"currentPlayer","type":"address"},{"name":"deck","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_admin","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"}],"name":"createGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"},{"name":"_amount","type":"uint128"}],"name":"bet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"hasGameAlreadyBeenCreated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"}],"name":"getState","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],"name":"player","outputs":[{"name":"lastBet","type":"uint128"},{"name":"betWindow","type":"uint128"},{"name":"index","type":"uint128"},{"name":"gameBalance","type":"uint128"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint64"},{"name":"_deadline","type":"uint64"},{"name":"_betWindow","type":"uint64"},{"name":"_nonce","type":"uint64"}],"name":"adminWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_gameHash","type":"bytes32"}],"name":"getPlayerList","outputs":[{"name":"","type":"address[4]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]');
  const contractAddress = "0x9180fe94f5af33cb66fa602ba994ed73839eabf5";
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
    contract.getGameHash(ante,deadline,betWindow,nonce, function(err,val) {
      if(!err)
      console.log(val);  
      if(callback && !callback1) {
        callback(val);
      }  
      else if(callback && callback1) {
        callback(val,callback1);
      }  
    })
  }
  
  function getGameStruct(hash,callbackArr) {
    contract.game.call(hash, function(err,val) {
      if(!err)
      if((typeof callbackArr) === "function") {
        callbackArr(hash,val);
      }  
      else if(callbackArr.length > 1) {
        callbackArr.forEach(function(callback) {
          callback(val);
        });  
      }  
    })
  }
  
  function getOtherGameData(hash,funcArr) {
    let userAddress = localStorage.getItem("userAddress");    
    funcArr.forEach(function(func) {
      if(func)
      func(hash,userAddress);  
    });  
  }  
  
  function getInGameBalance(hash,callbackArr) {
    let userAddress = localStorage.getItem("userAddress");        
    contract.getInGameBalance(hash,userAddress, function(err,val) {
      if(!err)
      callbackArr[0](val);  
    });  
  }  

  function getState(callback) {
    let order = JSON.parse(decodeURI(localStorage.getItem("order"))); 
    let ante = order['ante'];
    let deadline = order['deadline'];
    let betWindow = order['betWindow'];
    let nonce = order['nonce'];  
    contract.getState(ante,deadline,betWindow,nonce, function(err,val) {
      if(!err)
      if(callback)
      callback(val);  
    });  
  } 
  
  function getGameState(callback) {
    let order = JSON.parse(decodeURI(localStorage.getItem("order"))); 
    let ante = order['ante'];
    let deadline = order['deadline'];
    let betWindow = order['betWindow'];
    let nonce = order['nonce'];
    contract.getGameState(ante,deadline,betWindow,nonce, function(err,val) {
      if(!err)
      if(callback)  
      callback(val);  
    });  
  }  
  
  function getPlayerList(hash,callback) {
    contract.getPlayerList.call(hash, function(err,val) {
      if(!err)
      if(callback) 
      callback(val);  
    });  
  }    
  
  function getUserHand(hash,address,callback) {
    contract.getUserHand.call(hash,address, function(err,val) {
      if(!err)
      console.log(val);  
      if(callback)
      callback(val);  
    });  
  }   

  function getBetWindow(hash,callback) {
    let address = localStorage.getItem("userAddress");    
    contract.getBetWindow.call(hash,address, function(err,val) {
      if(!err)
      if(callback)  
      callback(val);  
    });  
  }    
  
  function getPlayerIndex(hash,callback) {
    let address = localStorage.getItem("userAddress");    
    contract.getPlayerIndex.call(hash,address, function(err,val) {
      if(!err)
      if(callback)  
      callback(val);  
    });  
  }     
  
  function getBalance(callback) {    
    let userAddress = localStorage.getItem("userAddress");
    contract.userBalance.call(userAddress, function(err,val) {
      if(!err)
      if(callback)  
      callback(val);  
    })    
  }
  
  function createGameLink(args) {
    let ante = args[0];
    let deadline = args[1];
    let betWindow = args[2];
    let nonce = args[3];
    let orderJSON = {'ante':ante,'deadline':deadline,'betWindow':betWindow,'nonce':nonce};
    let orderString = JSON.stringify(orderJSON);
    prompt("Copy Your Game Link","https://etheraccy.github.io/?" + orderString);
  }  
  
  function create(_ante,_deadline,_betWindow) {
    let userAddress = localStorage.getItem("userAddress");  
    let ante = toFixedNumber(parseFloat(_ante)*Math.pow(10,18));
    let deadline = _deadline.toString();
    let betWindow = _betWindow.toString();
    let nonce = Math.random().toString().slice(2);
    let orderJSON = {'ante':ante,'deadline':deadline,'betWindow':betWindow,'nonce':nonce};
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
  
  function getInitialCards(callback) {
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
    transaction.sendAwaitConfirmations(Tx,callback);   
  } 
  
  function bet(value) {
    let userAddress = localStorage.getItem("userAddress");    
    let order = JSON.parse(decodeURI(localStorage.getItem("order"))); 
    let ante = order['ante'];
    let deadline = order['deadline'];
    let betWindow = order['betWindow'];
    let nonce = order['nonce'];
    let amount = toFixedNumber(value);
    let data = contract.bet.getData(ante,deadline,betWindow,nonce,amount);
    let Tx = {
       from: userAddress,
       to: contractAddress,
       data: data,
       gasPrice: gasPrice
    };
    transaction.send(Tx);   
  } 
  
  function adminWithdrawal() {
    let userAddress = localStorage.getItem("userAddress");    
    let order = JSON.parse(decodeURI(localStorage.getItem("order"))); 
    let ante = order['ante'];
    let deadline = order['deadline'];
    let betWindow = order['betWindow'];
    let nonce = order['nonce'];
    let data = contract.adminWithdrawal.getData(ante,deadline,betWindow,nonce);
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
    adminWithdrawal,
    getGameStruct,
    getInGameBalance,
    getState,
    getGameState,
    getPlayerList,
    getUserHand,
    getPlayerIndex
  };
  
}();
