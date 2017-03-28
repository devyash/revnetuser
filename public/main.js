/* globals fetch */

var del = document.getElementById('delete')
var todeleteuser= document.getElementById('todeleteuser').value

del.addEventListener('click', function () {
  fetch('users', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': todeleteuser
    })
  }).then(function (response) {
    window.location.reload()
  })
})