$(document).ready(function() {
  $(".button-collapse").sideNav();
  $('.logout').click((e) => {
    e.preventDefault();
    $.ajax({
      url: `/`,
      method: 'DELETE',
      dataType: 'json',
    }).done(() => {}).fail((res) => {
      if (res.responseText === 'nulled') {
        window.location = '/'
      }
    });
  })
})
