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
// $(document).on('click', '#save-article', (req, res) => {
//   let thisId = $(this).attr('data-id');

//   const thisTrue = {
//     _id: thisId,
//     saved: true
//   }

//   $('#save-article').attr('style', 'color: orange');
  
//   $.ajax({
//       method: 'PUT',
//       url: '/saved/' + thisId,
//       data: { thisTrue }
//     })
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
//   });

  $(document).on('click', '#save-article', () => {
    let selected = $(this);

    $.ajax({
      type: 'POST',
      url: '/saved/' + selected.attr('data-id'),
      dataType: 'json'
    })
      .then(data => console.log(data))
      .catch(err => console.log(err));
  });

  $(document).on('click', '#save', function() {
    let selected = $(this);

    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: '/articles/' + selected.attr('data-id'),
      data: {
        body: $('#save-note').val()
      }
    })
      .then(() => {
        $('#save-note').val('');
      });
  });
  