window.addEvent('domready', function() {
    var buttons = $$('[data-mp3]'),
        remixmode = $('remixmode'),
        frenchKeyboard = 'azertyuiopqsdfghjklmwxcvbn'.split('');
    // Launch player
    buttons.each(function(el) {
        el.addEvent('click', function(e) {
            e.preventDefault();
            clickButton($(this), buttons);
        });
    });
    // Destroy all audio players on shut
    $('shut').addEvent('click', function(e) {
        e.preventDefault();
        stopSounds(buttons);
    });
    // Autoplay from hash
    autoplayFromHash(buttons);
    // Keyboard Events
    launchKeyboardEvents(buttons, frenchKeyboard);
});

/* ----------------------------------------------------------
  Functions
---------------------------------------------------------- */

/* Autoplay from hash
-------------------------- */

var autoplayFromHash = function(buttons) {
    if (window.location.hash) {
        var hash = window.location.hash.replace('#', '');
        buttons.each(function(el) {
            var data_mp3 = el.getAttribute('data-mp3');
            if (data_mp3 == hash) {
                clickButton(el, buttons);
            }
        });
    }
};

/* Keyboard events
-------------------------- */

var launchKeyboardEvents = function(buttons, frenchKeyboard) {
    // Keyboards event
    window.addEvent('keydown', function(e) {
        if (!e.code) {
            return;
        }
        // Echap : stop sound
        if (e.code == 27) {
            stopSounds(buttons);
            return;
        }

        // Keyboard code
        if (e.shift || e.meta || e.control || e.alt) {
            return;
        }
        var kCode = String.fromCharCode(e.code).toLowerCase(),
            kId = frenchKeyboard.indexOf(kCode);
        if ((kId || kId === 0) && buttons[kId]) {
            clickButton(buttons[kId], buttons);
        }
    });
};

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
    if ("pushState" in history) {
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
    else {
        window.location.hash = '';
    }
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