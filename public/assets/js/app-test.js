// $('#view').on('click', () => {
//   $('#note').empty();
//   let thisId = $(this).attr('data-id');

//   $.ajax({
//     method: 'GET',
//     url: '/articles/' + thisId
//   })
//   .then(data => {
//     console.log(data);
//     data.render({ note: data.note });
//   });
// });

// $('#save').on('click', () => {
//   let thisId = $(this).attr('data-id');

//   $.ajax({
//     method: 'POST',
//     url: '/articles/' + thisId,
//     data: {
//       title: $('#save-title').val(),
//       body: $('#save-note').val()
//     }
//   })
//   .then(data => {
//     console.log(data);
//     $('#note').empty();
//   });

//   $('#save-title').val('');
//   $('#save-note').val('');
// });
