$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  // load initial tweets
  var current = 0;

  var showTweets = function() {
    while(current < streams.home.length) {
      var tweet = streams.home[current];
      var $tweet = $('<div></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message + ' ' + tweet.created_at);
      $tweet.appendTo($body);
      current++;
    }
  };

  showTweets();

  var refreshTweets = function()
  {
    showTweets();

    // perpetually refresh
    setTimeout(refreshTweets, 2000);
  }
  refreshTweets();
});