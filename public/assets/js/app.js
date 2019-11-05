// save note
$(document).on('click', 'save', () => {
  const thisId = $(this).attr('data-id');

  $.ajax({
    method: 'POST',
    url: '/articles/' + thisId,
    data: {
      body: $('#save-note' + thisId).val()
    }})
    .then(data => console.log(data))
    .catch(err => console.log(err));

  $('#save-note').val('');
});

// view note
$(document).on('click', '#view', () => {
  let thisId = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: '/articles/' + thisId
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
});

// save article
$(document).on('click', '#save-article', (req, res) => {
  let thisId = $(this).attr('data-id');
  $('#save-article').attr('style', 'color: orange');

  $.ajax({
      method: 'PUT',
      url: '/saved/' + thisId
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
  });
