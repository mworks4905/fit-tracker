$(document).ready(function(){
  $('.trash').click((e) => {
    e.preventDefault();
    var email = $('.trash').attr('id');
    console.log(email);
    $.ajax({
        url: `/users`,
        method: 'DELETE',
        dataType: 'json',
        data: {email}
      }).done(() => {
        window.location = '/users'
      }).fail((res) => {
          window.location = '/users'
      });
  })
})
