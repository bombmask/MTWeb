$(function() {
    window.request_user = function(){
      user = $("#serch-text").val()
      if (user === ""){return undefined;}

      update_progress("0", "Fetching User")

      GetUser(user, "");

    }
})

var GetUser = function(user, channel){
  if(!channel){channel="";}

  $.ajax({
      url:"https://bot.leagueofnewbs.com:8443/api/users",
      type:"GET",
      data: "&user="+user.toLowerCase()+"&channel="+channel.toLowerCase(),
      success: function(result, status, xhr){RecieveData(result, status, xhr); },
      error: function(response) { update_progress(100, "Error retriveing user (Status: "+response.status+")") }
  });
};

var RecieveData = function(result, status, xhr){
  var userData = xhr.responseJSON;
  clean_table();
  update_header(userData.username);
  table_header();

  for (var i = 0; i < userData.messages.length; i++)
  {
    var currentMessage = userData.messages[i];
    add_row(currentMessage.time, currentMessage.channel, currentMessage.message);
    update_progress((i/userData.messages.length)*100, "Parsing Messages ( ", i + "/" + userData.messages.length + " )");
  }

  update_progress(100, "Done...");

};

var update_progress = function(percentage, new_text) {
    var bar = $("#request-progress");
    bar.attr("style", "mid-width: 2em; width: " + percentage + "%;");
    bar.attr("aria-valuenow", percentage + "%");
    if (new_text) {
        bar.text(new_text);
    };
};

var update_header = function(heading) {
  var header = $("#results-header");
  header.text = heading;
};

var table_header = function(time, channel, message){
  // Defaults
  if(!time){
    time = "Time";
  }
  if(!channel){
    channel = "Channel";
  }
  if(!message){
    message = "Message";
  }
  add_row(time,channel,message);
};

var add_row = function(time, channel, message) {
  var table = $("#data-table");
  table.append("<tr>"+"<td>"+time+"</td>"+"<td>"+channel+"</td>"+"<td>"+message+"</td>"+"</tr>");
};

var clean_table = function(){
  // apperently this is faster
  var table = $("data-table");
  while(table.firstChild){
    table.removeChild(table.firstChild);
  }
};

// function getUser(){
// 	var text = document.getElementById('searchbar');
// 	if (text === "")
// 	{return;}
// 	console.log(text.value);
// 	inputstuff = function(a,b,c){
// 		$("#userdata")[0].innerHTML = "<h1><p>"+c.responseJSON.username+"</p></h1>";
// 		for (var i = 0; i < c.responseJSON.messages.length; i++)
// 		{
// 			$("#userdata")[0].innerHTML += "<p>CONTENT</p>".replace("CONTENT", c.responseJSON.messages[i].message);
// 		}
// 	}
// 	request_user(text.value, inputstuff);
// }
