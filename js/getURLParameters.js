const getParameters = function() {
  
  function init() {
    let orderArr = window.location.href.split("?");
    if(orderArr.length > 1) { 
      localStorage.setItem("order",orderArr[1]);
      window.location.href = "https://etheraccy.github.io/gamePage.html";
      console.log(decodeURI(localStorage.getItem("order")));
    }  
  }

  return {
    init
  }
  
}()  
