$('#view').on('click', () => {
  $('#note').empty();
  let thisId = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: '/articles/' + thisId
  })
  .then(data => {
    console.log(data);
    data.render({
      title: data.title,
      body: data.body
    });
  });
});

$('#save').on('click', () => {
  let thisId = $(this).attr('data-id');
  
  const newNote = new Note(req.body);
  newNote.save();

  $.ajax({
    method: 'POST',
    url: '/articles/' + thisId,
    data: {
      title: $('#save-title').val(),
      body: $('#save-note').val()
    }
  })
  .then(data => {
    console.log(data);
    $('#note').empty();
  });

  $('#save-title').val('');
  $('#save-note').val('');
});
