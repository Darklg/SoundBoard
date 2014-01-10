window.addEvent('domready', function() {
    var buttons = $$('[data-mp3]');
    // Launch player
    buttons.each(function(el) {
        el.addEvent('click', function(e) {
            e.preventDefault();
            playMp3($(this));
        });
    });
    // Destroy all audio players
    $('shut').addEvent('click', function(e) {
        e.preventDefault();
        stopSounds(buttons);
    });
    window.addEvent('keydown', function(e) {
        if (e.code && e.code == 27) {
            stopSounds(buttons);
        }
    });
});

/* ----------------------------------------------------------
  Utilities
---------------------------------------------------------- */

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
    var url = self.getAttribute('data-mp3');
    var audioElement = new Element('audio');
    audioElement.addEvent('ended', function() {
        self.removeClass('current');
    });
    audioElement.addClass('audio-player');
    audioElement.set('src', url).set('autoplay', 'autoplay');
    audioElement.inject($(document.body), 'after');
};