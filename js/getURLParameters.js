const getParameters = function() {
  
  function init() {
    let orderArr = window.location.href.split("?");
    if(orderArr.length > 1) 
    localStorage.setItem("order",encodeURI(orderArr[1]));
  }

  return {
    init
  }
  
}()  
