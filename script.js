var $inputTitle = $('.input-title');
var $inputBody = $('.input-body');

$('.user-input').on('input', '.input-title, .input-body', enableSaveButton);
$('.save-idea').on('click', createIdeaCard);
$('.section-bottom').on('click', '.delete-idea', deleteIdeaCard);
$('.section-bottom').on('click', '.up-vote', upvoteQuality);
$('.section-bottom').on('click', '.down-vote', downvoteQuality);
$('.section-bottom').on('focusout', '.idea-title', modifiedTitle);
$('.section-bottom').on('focusout', '.idea-content', modifiedBody);
$('.search-input').on('keyup', searchIdeaCards);

restoreSavedIdeas();

function createIdeaCard (event){
  event.preventDefault();
  var $id = (new Date).getTime();
  var $quality = 'swill';
  var newIdea = new IdeaCardObject($inputTitle.val(), $inputBody.val(), $id, $quality);
  var stringNewIdea = JSON.stringify(newIdea);
  localStorage.setItem(`${$id}`, stringNewIdea);
  $('.section-bottom').prepend(`<article id="${$id}" class="idea-card">
      <button class="delete-idea"></button>
      <h2 class="idea-title" contenteditable="true"> ${$inputTitle.val()}</h2>
      <p class="idea-content" contenteditable="true"> ${$inputBody.val()}</p>
      <button class="up-vote"></button>
      <button class="down-vote"></button>
      <p class="idea-quality">quality: <span class="quality">${$quality}</span></p>
    </article>`)
  $('.idea-card').data('title', `${$inputTitle.val()}`);
  $('.idea-card').data('body', `${$inputBody.val()}`);
  $('.idea-card').data('id', `${$id}`);
  $('.idea-card').data('quality', `${$quality}`);
  $inputTitle.val('');
  $inputBody.val('');
  $('.save-idea').attr('disabled', true)
}

function IdeaCardObject (title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.quality = quality;
}

function restoreSavedIdeas () {
  for (var i = 0; i < localStorage.length; i ++) {
    var storedIdea = localStorage.getItem(localStorage.key(i));
    var parsedIdea = JSON.parse(storedIdea);
    $('.section-bottom').prepend(`<article id="${parsedIdea.id}" class="idea-card">
      <button class="delete-idea"></button>
      <h2 class="idea-title" contenteditable="true"> ${parsedIdea.title}</h2>
      <p class="idea-content" contenteditable="true"> ${parsedIdea.body}</p>
      <button class="up-vote"></button>
      <button class="down-vote"></button>
      <p class="idea-quality">quality: <span class="quality">${parsedIdea.quality}</span></p>
    </article>`)
    $('.idea-card').data('title', `${parsedIdea.title}`);
    $('.idea-card').data('body', `${parsedIdea.body}`);
    $('.idea-card').data('id', `${parsedIdea.id}`);
    $('.idea-card').data('quality', `${parsedIdea.quality}`)
  }
}

function enableSaveButton () {
  if( $inputTitle.val() == '' || $inputBody.val() == '') {
    $('.save-idea').attr('disabled', true);
  }else {
    $('.save-idea').attr('disabled', false);
  }
}

function deleteIdeaCard() {
  var $key = ($(this).parent().attr('id'));
  localStorage.removeItem($key);
  $(this).parent().remove();
}

function upvoteQuality() {
  var $key = ($(this).parent().attr('id'));
  if ($(this).siblings('.idea-quality').children('.quality').text() == 'genius'){
  }else if ($(this).siblings('.idea-quality').children('.quality').text() == 'plausible') {
    $(this).siblings('.idea-quality').children('.quality').text('genius');
    $(this).parent().data('quality', 'genius');
    var quality = $(this).parent().data('quality');
    modifiedQuality($key, quality);
  }else if ($(this).siblings('.idea-quality').children('.quality').text() == 'swill') {
    $(this).siblings('.idea-quality').children('.quality').text('plausible');
    $(this).parent().data('quality', 'plausible');
    var quality = $(this).parent().data('quality');
    modifiedQuality($key, quality);
  }
}

function downvoteQuality() {
  var $key = ($(this).parent().attr('id'));
  if($(this).siblings('.idea-quality').children('.quality').text() == 'swill') {
  }else if ($(this).siblings('.idea-quality').children('.quality').text() == 'plausible') {
    $(this).siblings('.idea-quality').children('.quality').text('swill');
    $(this).parent().data('quality', 'swill');
    var quality = $(this).parent().data('quality');
    modifiedQuality($key, quality);
  }else {
    $(this).siblings('.idea-quality').children('.quality').text('plausible');
    $(this).parent().data('quality', 'plausible');
    var quality = $(this).parent().data('quality');
    modifiedQuality($key, quality);
  }
}


function modifiedQuality(x, y) {
  var getObject = localStorage.getItem(x);
  var parsedObject = JSON.parse(getObject);
  parsedObject.quality = y;
  var stringObject = JSON.stringify(parsedObject);
  localStorage.setItem(`${x}`, stringObject);
}

function modifiedTitle() {
  var $key = ($(this).parent().attr('id'));
  var title = $(this).text();
  var getObject = localStorage.getItem($key);
  var parsedObject = JSON.parse(getObject);
  parsedObject.title = title;
  var stringObject = JSON.stringify(parsedObject);
  localStorage.setItem(`${$key}`, stringObject);
}

function modifiedBody() {
  var $key = ($(this).parent().attr('id'));
  var body = $(this).text();
  var getObject = localStorage.getItem($key);
  var parsedObject = JSON.parse(getObject);
  parsedObject.body = body;
  var stringObject = JSON.stringify(parsedObject);
  localStorage.setItem(`${$key}`, stringObject);
}

function searchIdeaCards() {
  var searchInput = $('.search-input').val();
  var title = $('.idea-title');
  var body = $('.idea-content');
  for (var i = 0; i < title.length; i ++){
    for (var x = 0; x < body.length; x ++){
      if (($(title[i]).text().toLowerCase().includes(searchInput.toLowerCase())) || ($(body[i]).text().toLowerCase().includes(searchInput.toLowerCase()))) {
        $(title[i]).parent().show();
      } else {
        $(title[i]).parent().hide();
      }
    }
  }
}