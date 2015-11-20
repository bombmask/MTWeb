$(function() {
    window.request_user = function(user, optionCallback, channel){
        if (typeof channel === "undefined"){
            channel = "";
        }
        if (typeof optionCallback === "undefined"){
            optionCallback = function(){};
        }
        $.ajax({
            url:"http://192.168.1.145:8080",
            type:"GET",
            data: "&user="+user+"&channel="+channel,
            success: function(result, status, xhr){console.log("Hello world!?!"+result); optionCallback(result, status, xhr);}
        });
    }
})
