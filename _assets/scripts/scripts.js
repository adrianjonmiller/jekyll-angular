Js.Behaviors.load = function(container){
  var hash = window.location.hash;
  var state = hash.slice(1, window.location.hash.length);
  console.log(state);

  Js._request(Js.States[state].templateUrl, function(result){
    Js.Views.successTwo.render(result);
  });
}

Js.Behaviors.openMenu = function(container) {
  var $this = $(container);
  var target = $this.attr('data-target');
  var header = document.getElementsByClassName('js-header');
  target = $('.' + target);
  var body = $('body');

  $(container).on('click', function(){
    target.addClass('is-open');
    body.addClass('is-fixed');
  });
}

Js.Behaviors.menu = function(container) {
  var body = $('body');

  $(container).on('click', '.js-close', function(){
    $(container).removeClass('is-open');
    body.removeClass('is-fixed');
  });
}


Js.Behaviors.inView = function(container) {
  $this = $(container);
  var target = $('.' + $this.attr('data-target'));

  $(container).on('inview', function(event, inview){
    if(inview) {
      target.removeClass('not-inview');
    } else {
      target.addClass('not-inview');
    }
  })
}


Js.Behaviors.links = function(container) {
  var children = $(container).children('li');

  $.each(children, function(index, item){
    var child = $(item).children()[0];
    if(window.location.pathname == $(child).attr('href')) {
      $(item).addClass('is-current');
    } else if(window.location.pathname == '' || window.location.pathname == undefined) {
      $(children[0]).addClass('is-current');
    }
  })
}


Js.Behaviors.faqScroll = function(container) {
  var children = $(container).children();
  $.each(children, function(index, item){
    $(item).on("click", function(e){
      e.preventDefault();
      var id = $(e.target).attr('href');

      $('html, body').animate({
        scrollTop: $(id).offset().top - 100
      }, 500);
    })
  })
}

Js.Behaviors.welcomeLink = function(container){
  window.userIsLoggedIn = false;
  xhr.insecurePost("/login", {}, function (response) {
     userIsLoggedIn = response.loggedIn;

     $(container).on('click', function(e){
       e.preventDefault();

       if(userIsLoggedIn) {
         window.location.href = "/?noredirect";
       } else {
         window.location.href = "/"
       }
     });
  });
}

Js.Behaviors.facebookShare = function(container){
  var $this = $(container);
  $this.on('click', function(e){
    e.preventDefault();
    facebookFeedDialog(window.userIsLoggedIn);
  })
};

Js.Behaviors.twitterShare = function(container){
  var $this = $(container);
  $this.on('click', function(e){
    e.preventDefault();
    twitterFeedDialog(window.userIsLoggedIn);
  })
};

Js.Behaviors.loggedInHide = function(container) {
  window.userIsLoggedIn = false;
  xhr.insecurePost("/login", {}, function (response) {
     userIsLoggedIn = response.loggedIn;
     
     if (userIsLoggedIn) {
       $(container).addClass('is-hidden');
     }
  });
}

Js.Behaviors.OlympicsTimer = function(container) {
  function zeroPad(x) {
    var text = (x + '');
    return text.length > 1 ? text : '0' + text; 
  }
  function setTicker() {
    var leftMillis = moment.utc('2016-08-22 06:00:00').diff(moment());
    if ( leftMillis > 0 ) {
      var leftTo = moment.duration(leftMillis);
      $('.js-days').text(zeroPad(leftTo.days()));
      $('.js-hours').text(zeroPad(leftTo.hours()));
      $('.js-minutes').text(zeroPad(leftTo.minutes()));
      $('.js-seconds').text(zeroPad(leftTo.seconds()));
    } else {
      $('.js-days').text('00');
      $('.js-hours').text('00');
      $('.js-minutes').text('00');
      $('.js-seconds').text('00');
    }
  }
  setTicker(); 
  setInterval(setTicker, 500);
}
