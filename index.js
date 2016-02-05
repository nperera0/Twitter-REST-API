// fill out the profile select drop down
$.getJSON("/users", function(users) {
  var userProfileSelect = $("#profileSelect");
  $.each(users, function(index, user) {
    var option = $("<option />");
    option.val(user.Id);
    option.text(user.Screen_Name);
    userProfileSelect.append(option);
  });
});

// fill out detailedTweetSelect and tweetMentionSelect drop downs
$.getJSON("/tweets", function(tweets) {
  var tweetSelect = $("#detailedTweetSelect");
  var mentionSelect = $("#tweetMentionSelect");
  $.each(tweets, function(index, tweet) {
    var option = $("<option />");
    option.val(tweet.Id)
    option.text(tweet.Id);
    mentionSelect.append(option.clone());
    tweetSelect.append(option);
  });
});

// this function call the server and parse and display the server response
function changeStage(url) {
  var stage = $("#titlecontent");
  stage.empty();
  var newStage = stage.clone(true);
  newStage.offsetWidth;

  $.getJSON(url, function(data) { //make the call to server here
    $.each(data, function(key, val) {
      para = document.createElement("p");
      content = "";
      $.each(val, function(k, v) {
        content += k + ": " + v + "<br>"
      });
      para.innerHTML = content;
      console.log(para);
      newStage.append(para);
    });
  });
  stage.after(newStage);
  stage.remove();
};

// setup on click listners for buttons
$("#tweetSelect").on('click',function(event) {
  var selectURL = "/tweets";
  changeStage(selectURL);
});

$("#userSelect").on('click',function(event) {
  var selectURL = "/users";
  changeStage(selectURL);
});

$("#linkSelect").on('click',function(event) {
  var selectURL = "/links";
  changeStage(selectURL);
});

// drop down list handlers 
$("#profileSelect").change(function() {
  var selectURL = "/user";
  var id = $("#profileSelect option:selected").val();
  if (id === "") {
    return;
  } else {
    changeStage(selectURL + "/" + id);
  }
});

$("#detailedTweetSelect").change(function() {
  var selectURL = "/tweet";
  var id = $("#detailedTweetSelect option:selected").val();
  if (id === "") {
    return;
  } else {
    changeStage(selectURL + "/" + id);
  }
});

$("#tweetMentionSelect").change(function() {
  var selectURL = "/mention";
  var id = $("#tweetMentionSelect option:selected").val();
  if (id === "") {
    return;
  } else {
    changeStage(selectURL + "/" + id);
  }
});
