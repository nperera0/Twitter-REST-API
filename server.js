var	http	=	require('http');
var fs = require('fs');
var url = require('url');

// read all the files needed during server start up
var contents = fs.readFileSync('favs.json');
var index = fs.readFileSync('index.html');
var indexjs = fs.readFileSync('index.js');
var jquery = fs.readFileSync('jquery-1.11.3.min.js');

//parse the jason content
var jsonContent = JSON.parse(contents);

// setup the server
var	server	=
http.createServer(function(req,	res)	{

    // parse the url to a array for indexing
    console.log(req.url);
    var urlArray = req.url.split("/");
    console.log(urlArray);

    //url handlers

    // this is the intial call to load the html
    if (urlArray[1] === '') {
		console.log("came to root 1");
		res.writeHead(200, {"Content-Type": "text/html"});
    res.write(index);
		res.end();
	  }

    //load the javascript on client side
    else if (urlArray[1] === "index.js") {
		 		res.setHeader("Content-Type", "text/javascript");
	   		res.writeHead(200);
	   		res.write(indexjs);
	   		res.end();
		}

    //import the jquery library
    else if (urlArray[1] === "jquery-1.11.3.min.js") {
		 		res.setHeader("Content-Type", "text/javascript");
	   		res.writeHead(200);
	   		res.write(jquery);
	   		res.end();
		}

    // show all tweets request
		else if (urlArray[1] === "tweets") {
				var data = new Array();
		 		var data = data.concat(listTweets()); // call the helper function listTweets here
		 		console.log(data);
		 		res.setHeader("Content-Type", "application/json");
	   		res.writeHead(200);
	   		res.write(JSON.stringify(data));
	   		res.end();
		}

    // show detailed info on a tweet
    else if (urlArray[1] === "tweet") {
				var data = new Array();
		 		var data = data.concat(getTweet(urlArray[2]));// call the helper function getTweet here with tweet id
		 		console.log(data);
		 		res.setHeader("Content-Type", "application/json");
	   		res.writeHead(200);
	   		res.write(JSON.stringify(data));
	   		res.end();
		}

    // show all users request
    else if (urlArray[1] === "users") {
        var data = new Array();
        var data = data.concat(listUsers());// call the helper function listUsers here
        console.log(data);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.write(JSON.stringify(data));
        res.end();
    }

    // show details about a user request
    else if (urlArray[1] === "user") {
        var data = new Array();
        var data = data.concat(getUser(urlArray[2]));
        console.log(data);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.write(JSON.stringify(data));
        res.end();
    }

    // show externel links request
    else if (urlArray[1]  === "links") {
        var data = new Array();
        var data = data.concat(listLinks()); // call the helper function listLinks here
        console.log(data);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.write(JSON.stringify(data));
        res.end();
    }

    // show mentions on a given tweet id
    else if (urlArray[1] === "mention") {
        var data = new Array();
        var data = data.concat(getTweetMentions(urlArray[2])); // call the helper function getTweetMentions here with twitter id
        console.log(data);
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.write(JSON.stringify(data));
        res.end();
    }
});

// start up server on port 3000 of local host
server.listen(3000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:3000/ \nuse control+c to kill');


// helper functions

// returns an array of tweets
function listTweets() {
  var data = new Array();
  for (var i=0; i<jsonContent.length; i++) {
    item = {
      "Id"    : jsonContent[i].id_str,
      "Tweet" : jsonContent[i].text,
      "User"  : jsonContent[i].user.screen_name
    }
    data.push(item);
  }
  return data;
}

// returns an array of unique user names
function listUsers() {
  var data = new Array();
  for (var i=0; i<jsonContent.length; i++) {
    var found = false;
    item = {
      "Id"         : jsonContent[i].user.id_str,
      "Name"       : jsonContent[i].user.name,
      "Screen_Name": jsonContent[i].user.screen_name,
    }
      for (var j=0; j<data.length; j++) { // check array for item
        if(data[j].Id == jsonContent[i].user.id_str){
        console.log("user already found");
        found = true;
       }
      }
    if(!found)
    data.push(item);
  }
  return data;
}

// show externel links in all tweets
function listLinks() {
    var data = new Array();
    for (var i=0; i<jsonContent.length; i++) {
        item = {
          "Tweet_Id": jsonContent[i].id_str
        }
        var urls = jsonContent[i].entities.urls;
        for (var n=0; n<urls.length; n++) {
          item["Link " + (n+1)] = urls[n].url;
        }
        data.push(item);
    }
    return data;
}

// returns the user with given id
function getUser(id) {
  for (var i=0; i<jsonContent.length; i++) {
    if (jsonContent[i].user.id_str === id) {
      item = {
        "Id"         : jsonContent[i].user.id_str,
        "Name"       : jsonContent[i].user.name,
        "Screen_Name": jsonContent[i].user.screen_name,
        "Description": jsonContent[i].user.description,
        "Location":jsonContent[i].user.location,
        "URL"     : jsonContent[i].user.url,
        "Followers_Count": jsonContent[i].user.followers_count,
  		  "Friends_Count"  : jsonContent[i].user.friends_count,
        "Statuses_Count" : jsonContent[i].user.statuses_count,
        "Profile_Image_URL": jsonContent[i].user.profile_image_url,
        "User_TimeZone"  : jsonContent[i].user.time_zone,
        "Account Created":jsonContent[i].user.created_at
      }
      console.log(item);
      return item;
    }
  }
}


// returns the tweet with given id
function getTweet(id) {
  for (var i=0; i<jsonContent.length; i++) {
    if (jsonContent[i].id_str === id) {
      item = {
        "Tweet_Id"  : jsonContent[i].id_str,
        "Tweet_Text": jsonContent[i].text,
        "Tweet_Source" : jsonContent[i].source,
        "Tweet_User"   : jsonContent[i].user.screen_name,
        "Tweet_Date"   : jsonContent[i].created_at.split(" ").slice(0, 4).join(" "),
        "Retweet_Count": jsonContent[i].retweet_count,
        "Tweet_Language": jsonContent[i].lang,
        "Favorited": jsonContent[i].favorited,
      	"Retweeted": jsonContent[i].retweeted
      }
      console.log(item);
      return item;
    }
  }
}

// this function returns an array of tweet mentions for a given tweet
function getTweetMentions(id) {
  var data = new Array();
  for (var i=0; i<jsonContent.length; i++) {
    if (jsonContent[i].id_str === id) {
      item = {
        "Tweet_Id": jsonContent[i].id_str
      }
      var mentions = jsonContent[i].entities.user_mentions;
      console.log(mentions);
      for (var n=0; n<mentions.length; n++) {
        item["Mention " + (n+1)] = mentions[n].name;
      }
      data.push(item);
    }
  }
  return data;
}
