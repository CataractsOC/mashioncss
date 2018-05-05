$(function(){
  
  $('#subreddit').change(function(){
    
    /*everything from lines 6-24 is to make the custom subreddit field
    interact nicely with the dropdown menu*/
    var selection = $('option:selected',this).attr('class');
    
    if(selection==="editable"){
      /*if the user selects the custom subreddit option, the search field
      and search button get moved for some reason so these two lines are
      to move them back to where they should be*/
      $('#subreddit').css("display","none");
      $('#customSub').css("visibility","visible")
      .keyup(function(){
        
        var customText = $('#customSub').val();
        $('.editable').val(customText)
        .html(customText);
      });
      
    }else{
      /*if the user picks an item in the dropdown other than the custom field,
      the search field and button have to be moved back (I realize this is extremely wonky)*/
    }
  });
  
  
  //now we're getting into the actual ajax shit
  var button = $('#searchBtn');
  
  button.click(function(){
    $('#placeholders').css("display","none");
    var subreddit = $('#subreddit').val();
    
    /*basically, the ajax function will only run if the user either picks one of the predefined subreddits
    in the dropdown or chooses the custom option and actually changes the value and changes it to something other
    than a blank string; also, the ajax function will only run if the search field is not blank, this can be changed*/
    if(subreddit!=='' && subreddit!=='custom' && subreddit!=='enter custom subreddit...' && $('#searchTerm').val()!==''){
      
      $.ajax({
        type: 'GET',
        //grab the subreddit from whatever the user selected from the dropdown
        url: 'https://www.reddit.com/r/'+subreddit+'/search.json',
        data: {
          //and use whatever they put in the other text field as their search query
          q: $('#searchTerm').val(),
          restrict_sr: true
        },
        success: function(response){

          var posts = $(response.data.children);
          $('.searchResults').empty();
          
          posts.each(function(i,post){
            /*for each post, if it has a thumbnail that is visible and can be accessed, post it on the
            page in div.searchResults with the .padded class and wrap it in an anchor tag pointing to
            the post on reddit that the thumbnail corresponds to*/
            if(post.data.thumbnail!=='self' && post.data.thumbnail!=='default' && post.data.thumbnail!=='spoiler' && post.data.thumbnail!==''){
//               console.log(post.data.thumbnail);
              $('.searchResults').append('<a href="https://www.reddit.com'+post.data.permalink+'"><img class="padded" src="'+post.data.thumbnail+'"/></a>');
            }
          });
        },
        
        //error checking
        error: function(response){
          alert('There was a problem with the ajax call');
          console.log(response);
        }
      });
    }
  });
  
});
