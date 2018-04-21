const metamask = function() {
  
  function init() {
    setInterval(function() {
      web3.eth.getAccounts(function (err, accounts) {
        console.log(err);
        if(err) return
        console.log(accounts);
        let element = document.getElementById("metamask");
        if(accounts[0]) {
          element.style.color = "green";
          element.textContent = "Metamask Unlocked";
          localStorage.setItem("userAddress",accounts[0]);
        }
        else {
          element.style.color = "red";
          element.textContent = "Metamask Locked";
        } 
        
      })
      
    }, 5000)
    
  }

  return {
    init
  }
  
}()  
