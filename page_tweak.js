(function(){
  document.addEventListener('DOMSubtreeModified', injectCSS, false);

  function injectCSS(){
    if(document.head){
      document.removeEventListener('DOMSubtreeModified', injectCSS, false);

      var style = document.createElement("style");
      style.innerHTML = '#gb {display: none !important;} #gba {display: none !important;}' + // Hide header
        '#gt-ft {display: none !important;} #gt-ft-res {display: none !important;}'; // Hide footer
      document.head.appendChild(style);
    }
  }

  window.addEventListener('keyup', function (e) {
    if(e.keyCode == 27) {
      window.close();
    }
  });
})();