$(document).ready(function(){
// Morning Health Slider
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
    }
  })
// Morning Water Slider
  $('.m_water').change(() => {
    var value = $('.m_water').prop('checked');
    if(value){
      var m_water = true;

      $.ajax({
        contentType: 'application/json',
        url: `/day`,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify({value, m_water}),
      }).done(() => {
        window.location = '/day'
      }).fail(err => {
        console.log(err)
      })
    }
  })
// Afternoon Health Slider
  $('.a_health').change(() => {
    var value = $('.a_health').prop('checked');
    if(value){
      var a_health = true;

      $.ajax({
        contentType: 'application/json',
        url: `/day`,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify({value, a_health}),
      }).done(() => {
        window.location = '/day'
      }).fail(err => {
        console.log(err)
      })
    }
  })
// Afternoon Water Slider
  $('.a_water').change(() => {
    var value = $('.a_water').prop('checked');
    if(value){
      var a_water = true;

      $.ajax({
        contentType: 'application/json',
        url: `/day`,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify({value, a_water}),
      }).done(() => {
        window.location = '/day'
      }).fail(err => {
        console.log(err)
      })
    }
  })
// Night Health Slider
  $('.n_health').change(() => {
    var value = $('.n_health').prop('checked');
    if(value){
      var n_health = true;

      $.ajax({
        contentType: 'application/json',
        url: `/day`,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify({value, n_health}),
      }).done(() => {
        window.location = '/day'
      }).fail(err => {
        console.log(err)
      })
    }
  })
// Night Water Slider
  $('.n_water').change(() => {
    var value = $('.n_water').prop('checked');
    if(value){
      var n_water = true;

      $.ajax({
        contentType: 'application/json',
        url: `/day`,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify({value, n_water}),
      }).done(() => {
        window.location = '/day'
      }).fail(err => {
        console.log(err)
      })
    }
  })
})
