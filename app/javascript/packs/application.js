console.log("Synapse UI application.js is loaded")

$(document).on('turbolinks:load', function() {
  // hide spinner when a page is loaded
  $(".spinner").hide();
});
$(document).on('turbolinks:click', function() {
  // show spinner when a Turbolinks link is clicked
  $(".spinner").show();
});

// Show spinner during AJAX requests
$(document).on('turbolinks:load', function() {
  // hide spinner to start
  $(".spinner").hide();
  // show spinner on AJAX start
  $(document).ajaxStart(function(){
    $(".spinner").show();
  });
  // hide spinner on AJAX stop
  $(document).ajaxStop(function(){
    $(".spinner").hide();
  });
});
