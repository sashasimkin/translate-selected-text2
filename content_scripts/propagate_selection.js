// stolen here: http://stackoverflow.com/a/2645306/2134936
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection")
    sendResponse({data: window.getSelection().toString()});
  else
    sendResponse({}); // snub them.
});
