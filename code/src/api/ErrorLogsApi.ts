window.totalErrorPosted = 0;
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
        return fetch('/v1/error/logs', {
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