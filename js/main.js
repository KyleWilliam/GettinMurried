
 var tag = "wedding";
 var _tag = "bride";
 var tagg = "cute";
 var weddingday = "weddingday";
 var count = "20";
 var client_id = 'e77d5b0c2fb24b32aa87b92d78d2dba4';
 var access_parameters = {client_id:client_id};

 var ids = [];
 var last_data;
 var max_tag_id = null;
 var min_tag_id = null;

// this one for #wedding
 function grabImages(access_parameters) {  
  var instagramUrl = 'https://api.instagram.com/v1/tags/' + tag 
    + '/media/recent?callback=?&count='+ count;
  if (max_tag_id) {
    instagramUrl += "max_tag_id=" + max_tag_id;
  }
  if (min_tag_id) {
    instagramUrl += "min_tag_id=" + min_tag_id;
  }
  $.getJSON(instagramUrl, access_parameters, onDataLoaded);
  $('div#loadmoreajaxloader').hide();
  }

// this one for #bride
  function grab_Images(access_parameters) {  
  var instagramUrl = 'https://api.instagram.com/v1/tags/' + _tag 
    + '/media/recent?callback=?&count='+ count;
  if (max_tag_id) {
    instagramUrl += "max_tag_id=" + max_tag_id;
  }
  if (min_tag_id) {
    instagramUrl += "min_tag_id=" + min_tag_id;
  }
  $.getJSON(instagramUrl, access_parameters, onDataLoaded);
  $('div#loadmoreajaxloader').hide();
  }
  
   //
    function grabImagess(access_parameters) {  
  var instagramUrl = 'https://api.instagram.com/v1/tags/' + tagg 
    + '/media/recent?callback=?&count='+ count;
  if (max_tag_id) {
    instagramUrl += "max_tag_id=" + max_tag_id;
  }
  if (min_tag_id) {
    instagramUrl += "min_tag_id=" + min_tag_id;
  }
  $.getJSON(instagramUrl, access_parameters, onDataLoaded);
  $('div#loadmoreajaxloader').hide();
  }

  function grabImagesss(access_parameters) {  
  var instagramUrl = 'https://api.instagram.com/v1/tags/' + weddingday 
    + '/media/recent?callback=?&count='+ count;
  if (max_tag_id) {
    instagramUrl += "max_tag_id=" + max_tag_id;
  }
  if (min_tag_id) {
    instagramUrl += "min_tag_id=" + min_tag_id;
  }
  $.getJSON(instagramUrl, access_parameters, onDataLoaded);
  $('div#loadmoreajaxloader').hide();
  }




  function onDataLoaded(instagram_data) { 

    if(instagram_data.meta.code == 200) {
      max_tag_id = instagram_data.pagination.max_tag_id;
      min_tag_id = instagram_data.pagination.min_tag_id;

      var photos = instagram_data.data;
      last_data = instagram_data;

      if(photos.length > 0) {

        for (var key in photos) {

          var photo = photos[key];
          // console.log('Id: ' + photo.id);
          // console.log('ids: ' + ids);
          // console.log('Comaprison' + $.inArray(photo.id, ids));
          if ($.inArray(photo.id, ids) < 0) {
            $('#target').append('<img src ="' + photo.images.thumbnail.url + '">');
            ids.push(photo.id);     
          }
        }
      } else {
        //if the photos varaible doesn't hold data
        $('#target').append("Hmm. I couldn't find anything!");
      }
    } else {
      //if we didn't get a 200 (success) request code from instagram
      //then we display instagram's error message instagram
      var error = instagram_data.meta.error_message;
      $('target').append('Something happened, Instagram said: ' + error);
    }
  }

  

$(document).ready(function() {
  grabImages(access_parameters);
  grab_Images(access_parameters);
  grabImagess(access_parameters);
  grabImagesss(access_parameters);

//infinite scroll
  $(window).scroll(function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        $('div#loadmoreajaxloader').show();

        grabImages(access_parameters);
        grab_Images(access_parameters);
        grabImagess(access_parameters);
        grabImagesss(access_parameters);


    }
});
});

