var $inputTitle = $('.input-title');
var $inputBody = $('.input-body');

$('.user-input').on('input', '.input-title, .input-body', enableSaveButton);
$('.save-idea').on('click', createIdeaCard);
$('.section-bottom').on('click', '.delete-idea', deleteIdeaCard);
$('.section-bottom').on('click', '.up-vote', upvoteQuality);
$('.section-bottom').on('click', '.down-vote', downvoteQuality);

function createIdeaCard (event){
  event.preventDefault();  
  $('.section-bottom').append(`<article class="idea-card">
      <button class="delete-idea"></button>
      <h2 class="idea-title" contenteditable="true"> ${$inputTitle.val()}</h2>
      <p class="idea-content" contenteditable="true"> ${$inputBody.val()}</p>
      <button class="up-vote"></button>
      <button class="down-vote"></button>
      <p class="idea-quality">quality; <span class="quality">swill</span></p>
    </article>`)
  var $qualityCounter = 0;
  $inputTitle.val('');
  $inputBody.val('');
  $('.save-idea').attr('disabled', true)
}

function enableSaveButton (){
  if( $inputTitle.val() == '' || $inputBody.val() == '') {
    $('.save-idea').attr('disabled', true);
  }else {
    $('.save-idea').attr('disabled', false);
  }
}

function deleteIdeaCard() {
  $(this).parent().remove();
}

function upvoteQuality() {
  if ($(this).siblings('.idea-quality').children('.quality').text() == 'genius'){
  }else if ($(this).siblings('.idea-quality').children('.quality').text() == 'plausible') {
    $(this).siblings('.idea-quality').children('.quality').text('genius');
  }else if ($(this).siblings('.idea-quality').children('.quality').text() == 'swill') {
    $(this).siblings('.idea-quality').children('.quality').text('plausible');
  }
}

function downvoteQuality() {
  if($(this).siblings('.idea-quality').children('.quality').text() == 'swill') {
  }else if ($(this).siblings('.idea-quality').children('.quality').text() == 'plausible') {
    $(this).siblings('.idea-quality').children('.quality').text('swill');
  }else {
    $(this).siblings('.idea-quality').children('.quality').text('plausible');
  }
}