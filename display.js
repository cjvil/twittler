$(document).ready(function(){
  var $body = $('body');

  var $tweetContainer = $body.find('#tweetContainer');

  var index = 0;
  var filter ='';
  var maxTweets = 10;

  var showTweets = function() {
    while(index < streams.home.length) {
      var tweet = streams.home[index];
      var $tweet = $('<div class=\'tweet\'></div>');
      $tweet.addClass(tweet.user);
      $tweet.prependTo($tweetContainer);

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


  var filterByUser = function(filter) {
    if (filter !== '') {
      $('.tweet').filter(':not(' + filter + ')').addClass('hidden');
    }
  }

  var refreshTweets = function()
  {
    showTweets();
    filterByUser(filter); // filter newly added tweets
    setTimeout(refreshTweets, 2000);
    // limit number of visible tweets
    $tweetContainer.find('.tweet:visible').slice(maxTweets).remove();

  }
  
  refreshTweets();

  // load users into nav bar
  Object.keys(streams.users).forEach( function(user) {
    $('<li class="' + user + '">@' + user + '</div>').appendTo('#nav');
  });

  var clearFilter = function() {
    filter = '';
    $tweetContainer.find('.hidden').removeClass('hidden');
  };

  // filter tweets by user
  // need to use delegated binding to work on newly 
  // generated elements
  $tweetContainer.on('click', '.user', function() {
    filter = '.' + ($(this).text().substring(1));
    filterByUser(filter);
  });

  $('#nav').on('click', 'li', function() {
    clearFilter();
    filter = '.' + ($(this).text().substring(1));
    filterByUser(filter);
  });

  $('#all').on('click', function() {
    clearFilter();
  })
});