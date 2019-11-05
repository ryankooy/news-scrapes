// save note
$('#save').on('click', () => {
  const thisId = $(this).attr('data-id');
  
  $.ajax({
    method: 'POST',
    url: `/articles/${thisId}`,
    data: {
      title: $('#save-title').val(),
      body: $('#save-note').val()
    }})
    .then(data => console.log(data));

    $('#save-title').val('');
    $('#save-note').val('');
});

// view note
$('#view').on('click', () => {
  let thisId = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: `/articles/${thisId}`
  })
  .then(data => console.log(data));
});

// save article
$('#save-article').on('click', (req, res) => {
  let thisId = $(this).attr('data-id');
  
  $.ajax({
    method: 'POST',
    url: '/saved',
    data: { 
      _id: thisId,
      saved: true
    }})
    .then(data => console.log(data));
});
