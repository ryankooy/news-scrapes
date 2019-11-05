// save note
$('#save').on('click', () => {
  const thisId = $(this).attr('data-id');
  const thisNote = $('#save-note').val();
  $.ajax({
    method: 'POST',
    url: `/articles/${thisId}`,
    data: {
      body: thisNote
    }})
    .then(data => console.log(data))
    .catch(err => console.log(err));

  $('#save-note').val('');
});

// view note
$('#view').on('click', () => {
  let thisId = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: `/articles/${thisId}`
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
});

// save article
$('#save-article').on('click', (req, res) => {
  let thisId = $(this).attr('data-id');
  
  $.ajax({
      method: 'POST',
      url: `/saved/${thisId}`
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
  });
