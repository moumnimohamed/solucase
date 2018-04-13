document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady () {

}

  $(document).ready(function() {
    $(document).ajaxStart(function() {
      $('.spiner').show();
    }).ajaxStop(function() {
      $('.spiner').hide();
    });
    /* TODO:active spiner in load*/
    loadData();
  /*  $(window).scroll(function() {
      if ($(window).scrollTop() == $(document).height() - $(window).height()) {
      }
    });*/
  });
  // TODO: function that load all posts
  function loadData() {

    $('.recentposts .post').remove();
    
    $.ajax({
      method: 'GET',
      dataType: 'json',
      success: 'success',
      url: "http://solucase.com/wp-json/wp/v2/posts/?_embed",

    }).then(function(posts) {

      var output = '';
      //'+val._embedded['wp:featuredmedia']['0'].source_url+'
      $.each(posts, function(key, val) {


      $('.recentposts').append('<div  class="post"   data-icon="false" onclick=postDetails('+val.id+')><img src='+    val._embedded['wp:featuredmedia']['0'].media_details.sizes.thumbnail.source_url+' ></img><h1 class="post_h1">'+val.title.rendered +'</h1></div>');
      })
      $('.recentposts').listview('refresh');

// TODO: applied annimation to post
      $('.recentposts .post').animate({marginTop: "5px" }, { duration: 1000, queue: false });
$('.recentposts .post').fadeIn(1000);
    })
  }



  // TODO: display contents for evry post
  function postDetails (post_id) {
    $('.detail .post_afficher').remove();
    location.href="#page2";
    $.ajax({
      method: 'GET',
      dataType: 'json',
      cache : false,
      success: 'success',
      url: 'http://solucase.com/wp-json/wp/v2/posts/'+post_id+'/?_embed',
    }).then(function(post) {
    //  console.log("1 :"+post.title.rendered);
      $('.detail').append('<div class="post_afficher" ><img src='+post._embedded['wp:featuredmedia']['0'].source_url+' ></img><h1 class="post_h1">'+post.title.rendered +'</h1>'+post.content.rendered+'</div>');


  // TODO: applied annimation to post
    /*  $('.recentposts .post').animate({marginTop: "5px" }, { duration: 1000, queue: false });
  $('.recentposts .post').fadeIn(1000);*/
    })
  }


  /* TODO:apple les  cathegories*/
  $(document).ready(function() {
    $('#categories').append('<div  onclick=loadData() ><a href="#left-panel" data-rel="close" >Tout</a></div>');

    $.ajax({
      method: 'GET',
      dataType: 'json',
      cache : false,
      success: 'success',
      url: "http://solucase.com/wp-json/wp/v2/categories/",
    }).then(function(cat) {
      $.each(cat, function(key, val) {
          if(val.name !='Uncategorized')
        $('#categories').append('<div  onclick=postsPerCat('+ val.id +') ><a href="#left-panel" data-rel="close" >' + val.slug + '</a></div>');
      });
      $('#categories').listview('refresh');

    })
  })



// TODO: call  posts per cathegories*/

  function postsPerCat(cat_id)  {
    $('.recentposts .post').remove();

    $.ajax({
      method: 'GET',
      dataType: 'json',
      cache : false,
      success: 'success',
      url: "http://solucase.com/wp-json/wp/v2/posts/?_embed&categories="+cat_id,
    }).then(function(posts) {
      $.each(posts, function(key, val) {
          $('.recentposts').append('<div  class="post"  data-icon="false" onclick=postDetails(' + val.id + ')><a ><img src='+    val._embedded['wp:featuredmedia']['0'].media_details.sizes.thumbnail.source_url+' ></img></a><h1 class="post_h1">'+val.title.rendered +'</h1></div>');

        $('.recentposts').listview('refresh');
      });
      $('.recentposts .post').animate({marginTop: "5px" }, { duration: 500, queue: false });
       $('.recentposts .post').fadeIn(500);
    })
  }
