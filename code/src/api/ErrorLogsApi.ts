window.totalErrorPosted = 0;
var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})

findIP.then(ip => {window.currentBrowserIpAddress = ip;}).catch(e => console.error(e));
window.currentBrowserTimezoneOffset = new Date().getTimezoneOffset();
window.currentBrowserTimezoneOffsetFormatted = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];

var queryParms = "?ipAddress=" + window.currentBrowserIpAddress + "&timezoneOffset=" + window.currentBrowserTimezoneOffset + + "&timezoneFormatted=" + window.currentBrowserTimezoneOffsetFormatted + "&currentTime=";

window.onerror = function(errorMsg, url, lineNumber, column, errorObj) {
    var payLoad = {};
    payLoad.apiName = url;
    payLoad.errorMessage = errorMsg;
    payLoad.inputParams = {
                    lineNumber: lineNumber,
                    column: column
                };
    payLoad.expection = errorObj.stack;
    if (window.totalErrorPosted < 10 && new Date().getTime() - window.lastErrorPostedTime > 1 * 60 * 1000) {
        window.errorLogsApiIns.submit(payLoad);
    }
};

class ErrorLogsApi {
    submit(payload) {
        window.totalErrorPosted++;
        window.lastErrorPostedTime = new Date().getTime();
        var q = queryParms;
        q += new Date().getTime();
        return fetch('/v1/error/logs' + q, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(function(res) {
            return res.json().then(function (response: any) {
                return new Promise(function(resolve, reject) {
                    resolve(response)
                });
            })
      });
    };
}

const errorLogsApiIns = new ErrorLogsApi();
export default ErrorLogsApi;