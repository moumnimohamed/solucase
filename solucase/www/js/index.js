document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady () {

  $(document).ajaxStart(function() {
    $('.spiner').show();
  }).ajaxStop(function() {
    $('.spiner').hide();
  });
  /* TODO:active spiner in load*/
  loadData();
  getcategories () ;

}

/*  $(document).ready(function() {
 /*$(window).scroll(function() {
      if ($(window).scrollTop() == $(document).height() - $(window).height()) {
      }
    });
    console.log('document ready');
    $(document).ajaxStart(function() {
      $('.spiner').show();
    }).ajaxStop(function() {
      $('.spiner').hide();
    });
    /* TODO:active spiner in load
    loadData();
    getcategories () ;
  });*/


  // TODO: function that load all posts
  function loadData() {

    $('.recentposts .post').remove();
  $('#page1  #header1 h1').text('tout les blogs');
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


  // TODO: lozd post for searsh
  function loadsershedpost() {

    $('.serchedposts .post2').remove();

    $.ajax({
      method: 'GET',
      dataType: 'json',
      success: 'success',
      url: "http://solucase.com/wp-json/wp/v2/posts/?_embed",

    }).then(function(posts) {

      var output = '';
      //'+val._embedded['wp:featuredmedia']['0'].source_url+'
      $.each(posts, function(key, val) {

      $('.serchedposts').append('<div  class="post2"   data-icon="false" onclick=postDetails('+val.id+')><img src='+    val._embedded['wp:featuredmedia']['0'].media_details.sizes.thumbnail.source_url+' ></img><h1 class="post_h1">'+val.title.rendered +'</h1></div>');
      })
      $('.serchedposts').listview('refresh');

// TODO: applied annimation to post
      $('.serchedposts .post2').animate({marginTop: "5px" }, { duration: 1000, queue: false });
$('.serchedposts .post2').fadeIn(1000);

    })

  }


  // TODO: display contents for evry post
  var linkToShare;
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
    linkToShare=post.link;
      $('.detail').append('<div class="post_afficher" ><img src='+post._embedded['wp:featuredmedia']['0'].source_url+' ></img><h1 class="post_h1">'+post.title.rendered +'</h1>'+post.content.rendered+'</div>');
  $('.detail .post_afficher').fadeIn(1000);
    })
  }


  /* TODO:apple les  cathegories*/
     function getcategories () {
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
        $('#categories').append('<div  onclick=postsPerCat('+ val.id +',"'+val.slug+'") ><a href="#left-panel" data-rel="close" >' + val.slug + '</a></div>');
      });

    })
    $('#categories').listview('refresh');

  }



// TODO: call  posts per cathegories*/

  function postsPerCat(cat_id,cath_name)  {
    $('.recentposts .post').remove();

    $('#page1  #header1 h1').text(cath_name);
    $.ajax({
      method: 'GET',
      dataType: 'json',
      cache : false,
      success: 'success',
      url: "http://solucase.com/wp-json/wp/v2/posts/?_embed&categories="+cat_id,
    }).then(function(posts) {
      $.each(posts, function(key, val) {

          $('.recentposts').append('<div  class="post"  data-icon="false" onclick=postDetails(' + val.id + ')><a ><img src='+    val._embedded['wp:featuredmedia']['0'].media_details.sizes.thumbnail.source_url+' ></img></a><h1 class="post_h1">'+val.title.rendered +'</h1></div>');

      });

      $('.recentposts .post').animate({marginTop: "5px" }, { duration: 200, queue: false });
       $('.recentposts .post').fadeIn(100);
       $('.recentposts').listview('refresh');

    })
  }
// TODO: function that allow  gavePDF
function gavePDF (){

      var htmlString = $(".post_afficher").html();

  let options = {
                documentSize: 'A4',
                type: 'share',
                fileName: 'myFile.pdf',
              }

pdf.fromData(htmlString, options)
    .then((stats)=> console.log('status', stats) )   // ok..., ok if it was able to handle the file to the OS.
    .catch((err)=>console.err(err))

}
// TODO: share in social media
function sharePost () {
  var image = $(".post_afficher").find('img:first').attr('src');
  console.log(linkToShare);
  window.plugins.socialsharing.share('',
      'PhoneGap share plugin',
      'image', // check the repo for other usages
      'linkToShare')
}
