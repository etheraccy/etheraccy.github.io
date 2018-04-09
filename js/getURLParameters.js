const getParameters = function() {
  
  function init() {
    try {
      localStorage.setItem("order",window.location.href.split("?")[1]);
    } catch(err) {}  
  }

  return {
    init
  }
  
}()  
