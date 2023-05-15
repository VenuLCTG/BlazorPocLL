function Register(ServerText, UserName, Password) {
    if (webphone_api.webphone_loaded == true) {
        console.log("Test2");
        /* if (state === 'loaded') {*/
        webphone_api.setparameter('serveraddress', ServerText);
        webphone_api.setparameter('username', UserName);
        webphone_api.setparameter('password', Password);
        webphone_api.start();
        setTimeout(3000);
        var res = webphone_api.isregistered();
        return res;
    }
}

function pageLoad() {
    webphone_api.onCallStateChange(function (status, direction, peer, peername) {
        if (direction == 2 && status == "ringing") {
            alert(status);
            //alert("Please answer Incoming Call");
        }
    });
}

function makeACall(NUMBER) {
    webphone_api.call(NUMBER);
    pageLoad();
}

function acceptCall() {
    webphone_api.accept();
}
function disconnectCall() {
    webphone_api.hangup();
}

