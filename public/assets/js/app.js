// TODO:
// - make the #save-article button effectively update 'saved' to true
// - bind notes to individual articles

// view note
$(document).on('click', '#view', () => {
  const thisId = $(this).parent();

  $.ajax({
    method: 'GET',
    url: `/articles/${thisId.attr('data-id')}`
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
});

// save article
$(document).on('click', '#save-article', () => {
  const thisId = $(this).parent();
  
  $.ajax({
      method: 'PUT',
      url: `/saved/${thisId.attr('data-id')}`,
      data: { $set: { saved: true } }
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
  });

// save note
$(document).on('click', '#save', () => {
  const thisId = $(this).parent();

  $.ajax({
    type: 'POST',
    url: `/articles/${thisId.attr('data-id')}`,
    data: {
      body: $('#save-note').val()
    }
  })
    .then(data => console.log(data))
    .catch(err => console.log(err));
});
