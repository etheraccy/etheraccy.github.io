const contractFunctions = function() {

  const ABI = JSON.parse('[{"constant":true,"inputs":[],"name":"defaultDeck","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userBalance","outputs":[{"name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint96"},{"name":"_deadline","type":"uint96"},{"name":"_betWindow","type":"uint96"},{"name":"_nonce","type":"uint96"}],"name":"withdrawAnte","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint96"},{"name":"_deadline","type":"uint96"},{"name":"_betWindow","type":"uint96"},{"name":"_nonce","type":"uint96"}],"name":"createGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeInWei","outputs":[{"name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint96"},{"name":"_deadline","type":"uint96"},{"name":"_betWindow","type":"uint96"},{"name":"_nonce","type":"uint96"}],"name":"getInitialCards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeBlockQueried","outputs":[{"name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint96"},{"name":"_deadline","type":"uint96"},{"name":"_betWindow","type":"uint96"},{"name":"_nonce","type":"uint96"},{"name":"_amount","type":"uint96"}],"name":"bet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"table","outputs":[{"name":"potSize","type":"uint96"},{"name":"playerBet","type":"uint96"},{"name":"ante","type":"uint64"},{"name":"gameTimeStamp","type":"uint64"},{"name":"previousDeckLength","type":"uint64"},{"name":"numberOfCardsDealt","type":"uint64"},{"name":"betWindow","type":"uint64"},{"name":"deck","type":"bytes"},{"name":"currentPlayer","type":"address"},{"name":"roundState","type":"uint8"},{"name":"dealState","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_admin","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"hasGameAlreadyBeenCreated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint96"},{"name":"_deadline","type":"uint96"},{"name":"_betWindow","type":"uint96"},{"name":"_nonce","type":"uint96"}],"name":"adminWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint96"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint96"},{"name":"_deadline","type":"uint96"},{"name":"_betWindow","type":"uint96"},{"name":"_nonce","type":"uint96"}],"name":"joinTable","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]');
  const contract = web3.eth.contract(ABI).at("0x7129bcFe2bddc74AADc661B913133E6Bf74C71C3");
  const contractAddress = contract.address;
  let gasPrice = 5000000000;
  
    
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
  
  function keccak256(...args) {
    args = args.map(arg => {
      if (typeof arg === 'string') {
         if (arg.substring(0, 2) === '0x') {
           return arg.slice(2)
        } else {
            return web3.toHex(arg).slice(2)
        }
      }

      if (typeof arg === 'number') {
        return leftPad((arg).toString(16), 64, 0)
      } else {
        return ''
      }
    })

    args = args.join('')

    return web3.sha3(args, { encoding: 'hex' })
  }   
  
  function getBalance(callback) {    
    let userAddress = localStorage.getItem("userAddress");
    contract.userBalance.call(userAddress, function(err,val) {
      if(!err)
      callback(val);  
    })    
  }
  
  function getGameStruct() {
    let order = JSON.parse(decodeURI(localStorage.getItem("order"))); 
    let ante = order['ante'];
    let deadline = order['deadline'];
    let betWindow = order['betWindow'];
    let nonce = order['nonce'];
    let contractAddress = contract.address;
    let hash = web3.sha3(contractAddress.slice(2),web3.toHex(ante),web3.toHex(deadline),web3.toHex(betWindow),web3.toHex(nonce));
    console.log(hash);
    contract.table.call(hash, function(err,val) {
      if(!err)
      console.log(val);  
    })    
  }
  
  function createGameLink(args) {
    let ante = toFixedNumber(parseFloat(args[0])*Math.pow(10,18));
    let deadline = args[1];
    let betWindow = args[2];
    let nonce = args[3];
    let orderJSON = {'ante':ante,'deadline':deadline,'betWindow':betWindow,'nonce':nonce};
    let orderString = JSON.stringify(orderJSON);
    alert("https://etheraccy.github.io/?" + orderString);
  }  
  
  function create(_ante,_deadline,_betWindow) {
    let userAddress = localStorage.getItem("userAddress");    
    let ante = toFixedNumber(parseFloat(_ante)*Math.pow(10,18));
    let deadline = _deadline;
    let betWindow = _betWindow;
    let nonce = Math.random().toString().slice(2);
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
  
  function joinTable(_ante,_deadline,_betWindow,_nonce) {
    let userAddress = localStorage.getItem("userAddress");    
    let ante = _ante;
    let deadline = _deadline;
    let betWindow = _betWindow;
    let nonce = _nonce;
    let data = contract.joinTable.getData(ante,deadline,betWindow,nonce);
    let Tx = {
       from: userAddress,
       to: contractAddress,
       data: data,
       gasPrice: gasPrice
    };
    transaction.send(Tx);   
  }  
  
  function withdrawAnte(_ante,_deadline,_betWindow,_nonce) {
    let userAddress = localStorage.getItem("userAddress");    
    let ante = _ante;
    let deadline = _deadline;
    let betWindow = _betWindow;
    let nonce = _nonce;
    let data = contract.withdrawAnte.getData(ante,deadline,betWindow,nonce);
    let Tx = {
       from: userAddress,
       to: contractAddress,
       data: data,
       gasPrice: gasPrice
    };
    transaction.send(Tx);   
  }  
  
  function getInitialCards(_ante,_deadline,_betWindow,_nonce) {
    let userAddress = localStorage.getItem("userAddress");    
    let ante = _ante;
    let deadline = _deadline;
    let betWindow = _betWindow;
    let nonce = _nonce;
    let data = contract.getInitialCards.getData(ante,deadline,betWindow,nonce);
    let Tx = {
       from: userAddress,
       to: contractAddress,
       data: data,
       gasPrice: gasPrice
    };
    transaction.send(Tx);   
  } 
  
  function bet(_ante,_deadline,_betWindow,_nonce) {
    let userAddress = localStorage.getItem("userAddress");    
    let ante = _ante;
    let deadline = _deadline;
    let betWindow = _betWindow;
    let nonce = _nonce;
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
    bet,
    getGameStruct
  };
  
}();
