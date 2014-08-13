;//JsBridge
(function(window) {

    var callbackList = {};

    window.JsBridge = {
        /* 参数说明
         * @evt {string} 调用接口名称 (必须)
         * @params {object} 配置参数 (可选)
         * @callback {function} 回调函数 (可选)
         */
        call: function(evt, params, callback) {
            //第一个参数必须为string
            if(typeof evt != 'string') return;

            if(typeof params == 'function') {
                callback = params;
                params = null;
            } else if(typeof params != 'object') {
                params = null;
            }

            var callbackId = new Date().getTime() + '';
            if (typeof callback == 'function') {
                callbackList[callbackId] = callback;
            }

            var msg = {
                callbackId: callbackId,
                action: evt,
                data: params || {}
            };
            prompt('JsBridgeCall', JSON.stringify(msg));
        },
        /* 参数说明
         * @params {object} 返回的数据 (必须)
         * 数据示例：{ callbackId: 'xxx', data: '' }
         */
        callback: function(params) {
            // params = JSON.parse(params);
            var callbackId = params.callbackId,
                data = params.data,
                callbackHandler = callbackList[callbackId];
            callbackHandler && callbackHandler.call(null, data);
            delete callbackList[callbackId]; //删除回调
        }
    }
})(window)
