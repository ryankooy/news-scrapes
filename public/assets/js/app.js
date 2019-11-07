// view note
$('#view').on('click', () => {
  let thisId = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: '/articles/' + thisId
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
});

// save article
$('#save-article').on('click', () => {
  const thisDataId = $(this).attr('data-id');
  const thisId = $(this).attr('id', 'save-article');
  
  $(thisId).attr('style', 'color: orange');
  
  $.ajax({
      method: 'PUT',
      url: '/saved/' + thisDataId,
      data: { saved: true }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
  });

// save note
$('#save').on('click', () => {
  const thisId = $(this).attr('data-id');
  const thisNote = $('#save-note').val().trim();

  $.ajax({
    type: 'POST',
    url: '/articles/' + thisId,
    data: {
      body: thisNote
    }
  })
    .then(data => console.log(data))
    .catch(err => console.log(err));
});
  
