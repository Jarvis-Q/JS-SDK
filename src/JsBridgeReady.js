;//JsBridgeReady
(function(document) {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('JsBridgeReady', false, false);
    document.dispatchEvent(evt)
})(document);
