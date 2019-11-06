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
  const thisId = $(this).attr('data-id');

  $('#save-article').attr('style', 'color: orange');
  
  $.ajax({
      method: 'PUT',
      url: '/saved/' + thisId,
      data: { saved: true }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
  });

// $(document).on('click', '#save-article', event => {
//   event.preventDefault();

//   let thisId = $(this).attr('data-id');

//   $.ajax({
//     method: 'PUT',
//     url: '/saved/' + thisId
//     })
//       .then(data => console.log(data))
//       .catch(err => console.log(err));
// });

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
  