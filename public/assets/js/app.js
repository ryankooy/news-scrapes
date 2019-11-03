$('#view').on('click', () => {
  let thisId = $(this).attr('data-id');

  $.get('/articles/' + thisId, (req, res) => {
     console.log(res);
     res.render({ note: res });
   });
});

$('#save').on('click', () => {
  let thisId = $(this).attr('data-id');

  const newNote = new Note({
    title: $('#save-title').val(),
    body: $('#save-note').val()
  });
  newNote.save();
  
  $.post('/articles/' + thisId, newNote, (req, res) => {
    console.log(res);
    $('#note').empty();
  });

  $('#save-title').val('');
  $('#save-note').val('');
});
