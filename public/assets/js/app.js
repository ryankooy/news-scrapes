$(document).on('click', 'p', () => {
  $('#notes').empty();
  let thisId = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: '/articles/' + thisId
  })
  .then((data) => {
    console.log(data);
    $('#notes').append('<h2>' + data.title + '</h2>');
    $('#notes').append('<input id="titleinput" name="title" >');
    $('#notes').append('<textarea id="bodyinput" name="body"></textarea>');
    $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');

    if (data.note) {
      $('#titleinput').val(data.note.title);
      $('#bodyinput').val(data.note.body);
    }
  });
});

$(document).on('click', '#savenote', () => {
  let thisId = $(this).attr('data-id');

  $.ajax({
    method: 'POST',
    url: '/articles/' + thisId,
    data: {
      title: $('#titleinput').val(),
      body: $('#bodyinput').val()
    }
  })
  .then((data) => {
    console.log(data);
    $('#notes').empty();
  });

  $('#titleinput').val('');
  $('#bodyinput').val('');
});
