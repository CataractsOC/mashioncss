$(document).ready(function() {
  $('.card1, .card2, .card3, .card4, .card5, .card6, .card7, .card8')
  .mouseenter(function() {
      $(this).addClass('activeCard');
      $.ajax({
          type: 'GET',
          url: "https://www.reddit.com/r/" + $(this).attr('id') +"/hot.json",
          data: { limit: 100, 
                  sr_detail: true },
          success: function(responseData) {
              if (responseData.data.children.length > 0) { 
                  var posts = [];
                  var len = responseData.data.children.length;
                  for (var i = 0; i < len; i++) {
                        posts.push(responseData.data.children[i].data);
                      }
                  var pick = Math.floor(Math.random()*responseData.data.children.length);
                  var post = posts[pick];

                  console.log('# of results: ' + len);
                  console.log("--- Title: " + post.title);
                  $('.activeCard').empty();
                  $('.activeCard').append("<a href=" + post.url + " \">" + post.title + "</a>");
                  //console.log("test");
              } else {
                console.log("Nothing here.");
              }
          },
          error: function(error) {
            $('body').text("oops! " + error);
          }
      });
  })
  .mouseleave(function() {
    $(this).removeClass('activeCard')
    $(this).empty();
    $(this).append("r/" + $(this).attr('id'));
  });
});
