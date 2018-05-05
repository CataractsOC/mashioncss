$(document).ready(function() {
  $(".card1, .card2, .card3, .card4, .card5, .card6, .card7, .card8").click(
    function() {
      $(this).addClass("activeCard");
      $.ajax({
        type: "GET",
        url: "https://www.reddit.com/r/" + $(this).attr("id") + "/hot.json",
        data: {
          limit: 100,
          sr_detail: true
        },
        success: function(responseData) {
          if (responseData.data.children.length > 0) {
            var posts = [];
            var len = responseData.data.children.length;
            for (var i = 0; i < len; i++) {
              posts.push(responseData.data.children[i].data);
            }
            var post = posts[1];

            console.log("# of results: " + len);
            console.log("--- Title: " + post.title);
            $(".activeCard")
              .empty()
              .append("<a href=" + post.url + ' ">' + post.title + "</a>")
              .removeClass("activeCard");
            //console.log("test");
          } else {
            console.log("Nothing here.");
          }
        },
        error: function(error) {
          $("body").text("oops! " + error);
        }
      });
    }
  );
});