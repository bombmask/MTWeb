$(document).ready(function(){
  var params = location.search.slice(1).split("&")
  for (var i = 0; i < params.length; i++){
    if (params[i].startsWith("user=")){
      var user = params[i].split('=')[1];
      GetUser(user);
      break;
    }
  }
});

$(function() {
    window.request_user = function(){
      user = $("#search-text").val()
      if (user === ""){return undefined;}
      console.log(user)
      GetUser(user);
    }
});

var GetUser = function(user){
  clean_table();
  update_progress(100, "Fetching User", "!");

  if(!user){
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
      add_row(currentMessage.time, currentMessage.channel, currentMessage.message);

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
      console.log(style);
      bar.addClass(style);
    };
};

var update_header = function(heading) {
  var header = $("#results-header");
  header.text("User: "+heading);
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
  var table = $("#data-table");
  table.empty();

};
