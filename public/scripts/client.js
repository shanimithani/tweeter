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
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    }
  };
  
 
  $('#tweet-form').submit(function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = $(this).serialize(); // Serialize the form data as a string
    const tweetContent = $(this).find('textarea[name="text"]').val();

    // Check if the tweet content is empty or exceeds the maximum length
    if (!tweetContent) {
      alert("Tweet cannot be empty.");
    } else if (tweetContent.length > 140) {
      alert("Tweet is too long");
    } else {
      // Make an AJAX POST request to send the form data to the server
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8080', 
        data: formData,
        success: function (response) {
          console.log('Form data sent successfully!');
          console.log(response);
          // Clear the form 
          $('#tweet-form')[0].reset();
        },
        error: function (error) {
          // Handle any errors
          console.error('Error sending form data:', error);
        }
      });
    }
  });


  const createTweetElement = function (tweet) {
    const { user, content, created_at } = tweet;

    const $tweet = $('<article>').addClass('tweet');
    const $header = $('<header>');
    const $avatar = $('<img>').addClass('avatar').attr('src', user.avatars);
    const $name = $('<span>').addClass('name').text(user.name);
    const $handle = $('<span>').addClass('handle').text(user.handle);
    const $content = $('<div>').addClass('content').text(content.text);
    const $footer = $('<footer>');
    const $timestamp = $('<span>').addClass('timestamp').text(timeago.format(new Date(created_at)));

    $header.append($avatar, $name, $handle);
    $footer.append($timestamp);
    $tweet.append($header, $content, $footer);

    return $tweet;
  };

  loadTweets();
});
