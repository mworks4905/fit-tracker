'use strict'

$(document).ready(() => {
  updateUserLevel()
})

function updateUserLevel(){
  $('.update-level').click((e) => {
    // console.log('updating level')
    e.preventDefault()
    const level = $(e.target).val()
    $.ajax({
      contentType: 'application/json',
      url: `/levels`,
      method: 'PUT',
      dataType: 'json',
      data: JSON.stringify({level}),
    }).done(() => {
      window.location = '/levels'
    }).fail(err => {
      console.log(err)
    })
  })
}
