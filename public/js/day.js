$(document).ready(function(){
  $('.m_health').change(() => {
    var value = $('.m_health').prop('checked');
    if(value){
      var m_health = true;
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
  }else{

  }
  })














})
