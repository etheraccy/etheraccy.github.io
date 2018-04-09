function contractFunctions = function() {

  const ABI = JSON.parse('[{"constant":true,"inputs":[],"name":"defaultDeck","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userBalance","outputs":[{"name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint96"},{"name":"_deadline","type":"uint96"},{"name":"_betWindow","type":"uint96"},{"name":"_nonce","type":"uint96"}],"name":"withdrawAnte","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint96"},{"name":"_deadline","type":"uint96"},{"name":"_betWindow","type":"uint96"},{"name":"_nonce","type":"uint96"}],"name":"createGame","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"feeInWei","outputs":[{"name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint96"},{"name":"_deadline","type":"uint96"},{"name":"_betWindow","type":"uint96"},{"name":"_nonce","type":"uint96"}],"name":"getInitialCards","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeBlockQueried","outputs":[{"name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint96"},{"name":"_deadline","type":"uint96"},{"name":"_betWindow","type":"uint96"},{"name":"_nonce","type":"uint96"},{"name":"_amount","type":"uint96"}],"name":"bet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"table","outputs":[{"name":"potSize","type":"uint96"},{"name":"playerBet","type":"uint96"},{"name":"ante","type":"uint64"},{"name":"gameTimeStamp","type":"uint64"},{"name":"previousDeckLength","type":"uint64"},{"name":"numberOfCardsDealt","type":"uint64"},{"name":"betWindow","type":"uint64"},{"name":"deck","type":"bytes"},{"name":"currentPlayer","type":"address"},{"name":"roundState","type":"uint8"},{"name":"dealState","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_admin","type":"address"}],"name":"changeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"hasGameAlreadyBeenCreated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint96"},{"name":"_deadline","type":"uint96"},{"name":"_betWindow","type":"uint96"},{"name":"_nonce","type":"uint96"}],"name":"adminWithdrawal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint96"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ante","type":"uint96"},{"name":"_deadline","type":"uint96"},{"name":"_betWindow","type":"uint96"},{"name":"_nonce","type":"uint96"}],"name":"joinTable","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]');
  const contract = web3.eth.contract(ABI).at("0x7129bcFe2bddc74AADc661B913133E6Bf74C71C3");
  const contractAddress = contract.address;
  let gasPrice = 5000000000;

  function deposit(value) {
    let userAddress = localStorage.getItem("userAddress");
    let ethValue = parseInt(value)*Math.pow(10,18);
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
    let ethValue = parseInt(value)*Math.pow(10,18);    
    let data = contract.withdraw.getData();
    let Tx = {
       from: userAddress,
       to: contractAddress,
       data: data,
       gasPrice: gasPrice
    };
    transaction.send(Tx);  
  }
  
  function bet(){}

  function settle(){}

  return {
    deposit,
    withdraw
  };
  
}();
