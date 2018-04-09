const transaction = function() {

  function send(Tx,callback) {
    web3.eth.sendTransaction(Tx, function(err,transactionHash) {
      if (err || !transactionHash) return;
      if(callback) {
        callback();
      }  
    });
  }
  
  return {
    send
  };

}();
