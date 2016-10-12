$('.logout').click((e) => {
  var sesh = true;
  e.preventDefault();
  $.ajax({
      url: `/`,
      method: 'GET',
      dataType: 'json',
      data: JSON.stringify({sesh})
    }).done(() => {
      console.log('dog');
    }).fail(() => {
      console.log('meow');
    });
})
