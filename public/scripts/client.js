$(document).ready(function () {

  const loadTweets = function () {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/tweets',
      dataType: 'json', 
      success: function (tweets) {
        renderTweets(tweets);
      },
      error: function (error) {
        console.error('Error loading tweets:', error); 
      }
    });
  };

  const renderTweets = function (tweets) {
    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty(); // Clear the container before appending new tweets
  
    // Reverse
    tweets.sort((a, b) => b.created_at - a.created_at);
  
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    }
  };
  
 
  $('#tweet-form').submit(function (event) {
    event.preventDefault();
  
    const formData = $(this).serialize();
    const tweetContent = $(this).find('textarea[name="text"]').val().trim(); 
    const $errorMessage = $('.error-message');
  
    // Hide the error message before validation
    $errorMessage.slideUp();
  
    if (!tweetContent) {
      $errorMessage.text('Tweet cannot be empty.').slideDown();
    } else if (tweetContent.length > 140) {
      $errorMessage.text('Tweet is too long.').slideDown();
    } else {
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/tweets',
        data: formData,
        success: function (response) {
          //console.log('Form data sent successfully!'); Clearing console logs as per request of Yashsvi 
          //console.log(response); Clearing console logs as per request of Yashsvi 
  
          // Clear the textarea
          $('#tweet-text').val('');
  
          // Reset the character counter back to 140
          $('.counter').text('140');
  
          // Reload
          loadTweets();
        },
        error: function (error) {
          console.error('Error sending form data:', error);
        }
      });
    }
  });




  const createTweetElement = function (tweet) {
    const { user, content, created_at } = tweet;
  
    const $tweet = $('<article>').addClass('tweet');
    const $header = $('<header>').addClass('tweet-header');
    const $avatar = $('<img>').addClass('avatar').attr('src', user.avatars);
    const $name = $('<span>').addClass('name').text(user.name);
    const $handle = $('<span>').addClass('handle').text(user.handle);
    const $content = $('<div>').addClass('content').text(content.text);
    const $footer = $('<footer>');
    const $timestamp = $('<span>').addClass('timestamp').text(timeago.format(new Date(created_at)));
    const $actions = $('<div>').addClass('tweet-actions');
    const $likeIcon = $('<i>').addClass('far fa-heart');
    const $retweetIcon = $('<i>').addClass('fas fa-retweet');
    const $flagIcon = $('<i>').addClass('fas fa-flag');
  
    $header.append($avatar, $name);
    $header.append($handle);
    $footer.append($timestamp);
    $tweet.append($header, $content, $footer);
    $actions.append($likeIcon, $retweetIcon, $flagIcon);
    $footer.append($timestamp, $actions); // Add the actions to the footer
  
    return $tweet;
  };

  loadTweets();
});
