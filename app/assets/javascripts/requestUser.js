$(document).ready(function(){
  var params = location.search.slice(1).split("&")
  for (var i = 0; i < params.length; i++){
	if (params[i].startsWith("user=")){
	  var user = params[i].split('=')[1];
      $("#search-text").val(user);
	  GetUser(user);
	  break;
	}
  }
});

$(function() {
	window.request_user = function(){
	  user = $("#search-text").val()
      //   if (user === ""){return undefined;}
	  console.log(user)
	  GetUser(user);
	}
});

var GetUser = function(user){
  clean_table();
  clean_header();
  update_progress(100, "Fetching User", "!");

  if(!user || user===""){
	update_progress(100, "No Username Supplied", "progress-bar-danger");
	return;
  };
  user = user.replace(/\s+/g, '');


  $.ajax({
	  url:"https://bot.leagueofnewbs.com:8443/api/users",
	  type:"GET",
	  data: "&user="+user,
	  success: function(result, status, xhr){RecieveData(result, status, xhr); },
	  error: function(response) { update_progress(100, "Error retriveing user (Status: "+response.status+")", "progress-bar-danger") }
  });
};

var RecieveData = function(result, status, xhr){
  var userData = xhr.responseJSON;

  update_header(userData.username);
  table_header();
  DisplayData(userData);
  update_progress(100, "Success", "progress-bar-success");

};

var DisplayData = function(data){
	this.data = data;

	for (var i = 0; i < this.data.messages.length; i++)
	{
        var currentMessage = this.data.messages[i];
        currentMessage.time = new Date(currentMessage.time).toUTCString();

        if (currentMessage.type==="message"){
            if (currentMessage.channel[0]!="#"){
                add_row(currentMessage.time, "Whispered: "+currentMessage.channel, currentMessage.message, "warning");
            }
            else {
                add_row(currentMessage.time, currentMessage.channel, currentMessage.message);
            }
        }
        else if (currentMessage.type === "ban") {
            //add_custom_row("<tr class=\"danger\">"+"<td>"+currentMessage.time+"</td>"+"<td>"+currentMessage.channel+"</td>"+"<td>User was Banned or Timed out</td>"+"</tr>")
            add_row(currentMessage.time, currentMessage.channel, "Was Banned or Timed Out");
        }
        var progress = "Parsing Messages ( "+ i + "/" + this.data.messages.length + " )"
        update_progress((i/this.data.messages.length)*100, progress, "progress-bar-info");
    }
};

var update_progress = function(percentage, new_text, style) {
	var bar = $("#request-progress");
	bar.attr("style", "mid-width: 2em; width: " + percentage + "%;");
	bar.attr("aria-valuenow", percentage + "%");

	if (new_text != undefined) {
		bar.text(new_text);
	};

	if (style != undefined){
	  // If nothing changed finish DOM changes and return
	  if(this.lastStyle === style){return;}
	  else{this.lastStyle = style;}

	  var secondClass = bar.attr("class").split(' ');
	  if (secondClass.length >= 2 ){
		bar.attr("class", secondClass[0]);
		//for (var i = 1; i < secondClass.length; i ++){bar.removeClass(secondClass[i]);}
	  };

	  bar.addClass(style);
	};
};

var update_header = function(heading) {
  var header = $("#results-header");
  header.text("User: "+heading+);
  
};

var table_header = function(time, channel, message, classes){
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
  if(!classes){
      classes=""
  }
  add_row(time,channel,message,classes);
};

var add_row = function(time, channel, message, classes) {
  var table = $("#data-table");

  if (!classes){classes="";}

  table.append("<tr class=\""+classes+"\">"+"<td class=\"col-md-1\">"+time+"</td>"+"<td class=\"col-md-1\">"+channel+"</td>"+"<td class=\"col-md-6 wrap-text-hard\">"+message+"</td>"+"</tr>");
};

var add_custom_row = function(string){
    var table = $("#data-table");
    table.append(string);
}

var clean_table = function(){
  // apperently this is faster
  var table = $("#data-table");
  table.empty();

};

var clean_header = function(text){
    var header = $("#results-header")
    header.text("")
    if(text){
        header.text(text)
    }
}
