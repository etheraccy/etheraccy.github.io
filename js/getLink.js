const getLink = function() {
  
  function init() {
    if(window.location.href === "https://etheraccy.github.io/gamePage.html") { 
      let order = decodeURI(localStorage.getItem("order"));
      let URL = "https://etheraccy.github.io/?" + order; 
      $('#gameLink').text(URL);
    }  
  }

  return {
    init
  }
  
}()  
