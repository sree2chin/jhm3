export const scrollToFirstError = function () {
      setTimeout(function(){
      var bodyRectTop = document.body.getBoundingClientRect().top;  
      var elemRect = document.getElementsByClassName('c-subheader-text error visibility-show');
      if(elemRect.length > 0){
            var top = elemRect[0].getBoundingClientRect().top;
            var offset   = top - bodyRectTop;
            window.scroll(0,offset-80);    
      }
},200);
}