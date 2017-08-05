$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  var index = 0;

  var showTweets = function() {
    while(index < streams.home.length) {
      var tweet = streams.home[index];
      var $tweet = $('<div class=\'tweet\'></div>');
      $tweet.prependTo($body);

      var $user = $('<div class=\'user\'></div>');
      $user.text('@' + tweet.user);
      $user.appendTo($tweet);

      var $message = $('<div class=\'message\'></div>');
      $message.text(tweet.message);
      $message.appendTo($tweet);

      var $date = $('<div class=\'date\'></div>');
      $date.text(tweet.created_at);
      $date.appendTo($tweet);

      index++;
    }
  };
  showTweets();

  var refreshTweets = function()
  {
    showTweets();
    setTimeout(refreshTweets, 2000);
  }
  refreshTweets();
});