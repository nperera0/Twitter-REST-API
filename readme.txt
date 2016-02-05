

- server.js is a Node.js Server capable of reading a JSON file deployed on a
 server and returning information by using a collection of simple HTTP requests.

- index.html single HTML web page in which the requests to the APIs will be
invoked and the retrieved information will be displayed.


How to Test

1. deploy the node.js server using the command node server.js
2. access the server from http://127.0.0.1:3000/  in your browser, you will see the loaded index.html
3. Use the UI instructions bellow to explore the json file

- click button "Show All Tweets" to show all users
  or go to url URL http://127.0.0.1:3000/tweets

- click button "Show All Users" to view all users
  or go to url URL http://127.0.0.1:3000/users

- click button "Show All External Links" to see all external links
  or go to url URL http://127.0.0.1:3000/links

- use drop down menu "Select a Tweet to View Details" to pick a tweet id to view details
  or go to url URL http://127.0.0.1:3000/tweet/<id>
  <id> - substitute with a valid tweet id

- use drop down menu "Select User to get Detailed Profile Information" to select a user to view profile
  or go to url URL http://127.0.0.1:3000/tweet/<id>
  <id> - substitute with a valid user id

- use drop down menu "Select a Tweet to View Mentions" to select a tweet id to view mentions in the tweet
  or go to url URL http://127.0.0.1:3000/mention/<id>
  <id> - substitute with a valid tweet id

In any case if the request is invalid or the id does not exist, null will be returned 
