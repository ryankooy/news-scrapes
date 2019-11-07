// TODO:
// - make the #save-article button effectively update 'saved' to true
// - bind notes to individual articles

// view note
$('#view').on('click', () => {
  const thisId = $(this).data('id');

  $.ajax({
    method: 'GET',
    url: '/articles/' + thisId
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
});

// save article
$('#save-article').on('click', () => {
  $(this).attr('style', 'color: orange');
  const thisId = $(this).data('id');
  
  $.ajax({
      method: 'PUT',
      url: '/saved/' + thisId,
      data: {
        _id: thisId,
        saved: true
      }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
  });

// save note
$('#save').on('click', () => {
  const thisId = $(this).attr('data-id');
  const thisNote = $('textarea #save-note').val().trim();

  $.ajax({
    type: 'POST',
    url: '/articles/' + thisId,
    data: {
      _id: thisId,
      body: thisNote
    }
  })
    .then(data => console.log(data))
    .catch(err => console.log(err));
});
