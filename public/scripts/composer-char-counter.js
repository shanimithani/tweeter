$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    var textareaValue = $(this).val();
    var textareaLength = textareaValue.length;
    var remainingChars = 140 - textareaLength;
    var counter = $('output[name="counter"]');

    // Update the counter on the page
    counter.text(remainingChars);

    // Log the remaining characters
    console.log("Remaining characters: " + remainingChars);

    if (textareaLength > 140) {
      counter.addClass("red");
    } else {
      counter.removeClass("red");
    }
  });
  $(".tweet").hover(
    function() {
      $(this).addClass("tweet-hover");
      $(this).find("img").css("filter", "invert(50%)");
    },
    function() {
      $(this).removeClass("tweet-hover");
      $(this).find("img").css("filter", "inherit");
    }
  );
});
