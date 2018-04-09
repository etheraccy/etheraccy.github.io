const getParameters = function() {
  
  function init() {
    localStorage.setItem("order",window.location.href.split("?")[1]);
  }

  return {
    init
  }
  
}()  
