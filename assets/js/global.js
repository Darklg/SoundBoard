window.addEvent('domready', function() {
    var buttons = $$('[data-mp3]'),
        remixmode = $('remixmode');
    // Launch player
    buttons.each(function(el) {
        el.addEvent('click', function(e) {
            e.preventDefault();
            clickButton($(this), buttons);
        });
    });
    // Destroy all audio players
    $('shut').addEvent('click', function(e) {
        e.preventDefault();
        stopSounds(buttons);
    });
    // Keyboards event
    window.addEvent('keydown', function(e) {
        if (e.code && e.code == 27) {
            stopSounds(buttons);
        }
    });
    if (window.location.hash) {
        var hash = window.location.hash.replace('#','');
        buttons.each(function(el) {
            var data_mp3 = el.getAttribute('data-mp3');
            if (data_mp3 == hash) {
                clickButton(el, buttons);
            }
        });
    }
});

/* ----------------------------------------------------------
  Utilities
---------------------------------------------------------- */

/* Click Button
-------------------------- */

var clickButton = function(button, buttons) {
    if (!remixmode.checked) {
        stopSounds(buttons);
    }
    playMp3(button);
};

/* Stop all sounds
-------------------------- */

var stopSounds = function(buttons) {
    buttons.removeClass('current');
    $$('.audio-player').destroy();
};

/* Play a mp3
-------------------------- */

var playMp3 = function(self) {
    self.addClass('current');
    var url = self.getAttribute('data-mp3'),
        audioElement = new Element('audio');
    audioElement.addEventListener('ended', function() {
        self.removeClass('current');
    });
    audioElement.addClass('audio-player');
    audioElement.set('src', url);
    audioElement.play();
    audioElement.inject($(document.body), 'after');
    window.location.hash = url;
};