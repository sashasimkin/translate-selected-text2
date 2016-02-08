(function(){
  document.addEventListener('DOMSubtreeModified', injectCSS, false);

  function injectCSS(){
    if(document.head){
      document.removeEventListener('DOMSubtreeModified', injectCSS, false);

      var style = document.createElement("style");
      style.innerHTML = '#gb {display: none !important;} #gba {display: none !important;}' + // Hide header
          '#gt-ft {display: none !important;} #gt-ft-res {display: none !important;}' + // Hide footer
          '#gt-promo-lr {display: none !important;}'; // Hide promo. We don't need it in our pop-up
      document.head.appendChild(style);
    }
  }
})();
