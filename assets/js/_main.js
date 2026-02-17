/* ==========================================================================
   jQuery plugin settings and other scripts
   ========================================================================== */

$(document).ready(function(){
   // Sticky footer
  var bumpIt = function() {
      $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
    },
    didResize = false;

  bumpIt();

  $(window).resize(function() {
    didResize = true;
  });
  setInterval(function() {
    if (didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);
  // FitVids init
  $("#main").fitVids();

  // init sticky sidebar
  $(".sticky").Stickyfill();

  // init sticky sidebar - DISABLED to always show social links
  // var stickySideBar = function(){
  //   var show = $(".author__urls-wrapper button").length === 0 ? $(window).width() > 1024 : !$(".author__urls-wrapper button").is(":visible");
  //   if (show) {
  //     // fix
  //     Stickyfill.rebuild();
  //     Stickyfill.init();
  //     $(".author__urls").show();
  //   } else {
  //     // unfix
  //     Stickyfill.stop();
  //     $(".author__urls").hide();
  //   }
  // };

  // stickySideBar();

  // $(window).resize(function(){
  //   stickySideBar();
  // });

  // Follow menu drop down - DISABLED to always show social links
  // $(".author__urls-wrapper button").on("click", function() {
  //   $(".author__urls").fadeToggle("fast");
  //   $(".author__urls-wrapper button").toggleClass("open");
  // });

  // init smooth scroll
  $("a").smoothScroll({offset: -20});

  // add lightbox class to all image links
  $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

  // Magnific-Popup options
  $(".image-popup").magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1]
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.'
    },
    removalDelay: 500,
    mainClass: 'mfp-zoom-in',
    callbacks: {
      beforeOpen: function() {
        // add animation class to markup
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
      }
    },
    closeOnContentClick: true,
    midClick: true
  });

  // Dark Mode Toggle
  function initDarkModeToggle() {
    // Only create if it doesn't exist
    if ($('#dark-mode-toggle').length === 0) {
      var $darkModeBtn = $('<button id="dark-mode-toggle" aria-label="Toggle Dark Mode"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></button>');
      $('body').append($darkModeBtn);
    }

    // Load theme preference
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      $('html').addClass('dark');
    } else {
      $('html').removeClass('dark');
    }
  }

  // Initialize on ready
  initDarkModeToggle();

  // Handle click on toggle
  $(document).on('click', '#dark-mode-toggle', function(e) {
    e.preventDefault();
    $('html').toggleClass('dark');
    if ($('html').hasClass('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

});
