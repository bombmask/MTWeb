$(function() {
    window.request_user = function(user, optionCallback, channel){
        if (typeof channel === "undefined"){
            channel = "";
        }
        if (typeof optionCallback === "undefined"){
            optionCallback = function(){};
        }
        $.ajax({
            url:"http://bot.leagueofnewbs.com:8080/api/users",
            type:"GET",
            data: "&user="+user+"&channel="+channel,
            success: function(result, status, xhr){console.log("Hello world!?!"+result); optionCallback(result, status, xhr);}
        });
    }
})
