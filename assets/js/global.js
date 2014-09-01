window.addEvent('domready', function() {
    var buttons = $$('[data-mp3]'),
        remixmode = $('remixmode'),
        frenchKeyboard = 'azertyuiopqsdfghjklmwxcvbn'.split(''),
        mainEvent = (('ontouchend' in window)) ? 'tap' : 'click';

    // Launch player
    buttons.each(function(el) {
        if (mainEvent == 'tap') {
            setTapEvent(el);
        }
        el.addEvent(mainEvent, function(e) {
            if (e) {
                e.preventDefault();
            }
            clickButton($(this), buttons);
        });
    });

    // Destroy all audio players on shut
    $('shut').addEvent(mainEvent, function(e) {
        e.preventDefault();
        stopSounds(buttons);
    });

    // Autoplay from hash
    autoplayFromHash(buttons);

    // Keyboard Events
    launchKeyboardEvents(buttons, frenchKeyboard);

    // Scroll top
    $(window).scrollTo(0, 0);
});

/* ----------------------------------------------------------
  Functions
---------------------------------------------------------- */

/* Tap event
-------------------------- */

var setTapEvent = function(el) {
    var duration = 300,
        timerStart, timerEnd;

    function startTimer() {
        timerStart = new Date().getTime();
    }

    function endTimer() {
        timerEnd = new Date().getTime();
        if (timerEnd - timerStart < duration) {
            el.fireEvent('tap');
        }
    }

    if (window.navigator.msPointerEnabled) {
        el.style.touchAction = "none";
        el.style.msTouchAction = "none";
        el.addEvent('MSPointerDown', startTimer);
        el.addEvent('MSPointerUp', endTimer);
    }
    else {
        el.addEvent('touchstart', startTimer);
        el.addEvent('touchend', endTimer);
    }
};

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