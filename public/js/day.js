$(document).ready(function(){
  $('.m_health').change(() => {
    var value = $('.m_health').prop('checked');
    if(value){
      var m_health = true;
      // ajaxCall();
      $.ajax({
        contentType: 'application/json',
        url: `/day`,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify({value, m_health}),
      }).done(() => {
        window.location = '/day'
      }).fail(err => {
        console.log(err)
      })
    }
  })

// function ajaxCall() {
//   $.ajax({
//     contentType: 'application/json',
//     url: `/day`,
//     method: 'PUT',
//     dataType: 'json',
//     data: JSON.stringify({value, m_health, m_water, a_health, a_water, n_health, n_water}),
//   }).done(() => {
//     window.location = '/day'
//   }).fail(err => {
//     console.log(err)
//   })
// }













})
