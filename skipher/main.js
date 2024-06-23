// ==UserScript==
// @name         Skip Her!
// @namespace    https://pisknk.github.io
// @version      0.1
// @description  Automatically skip Taylor Swift songs on YouTube Music.
// @author       pisknk
// @match        https://music.youtube.com/*
// @grant        none
// ==/UserScript==

// this is a tampermonkey script, 

(function() {
    'use strict';

    function isTaylorSwiftSong() {

        let songTitle = document.querySelector('.title.ytmusic-player-bar').textContent.trim();
        let artistName = document.querySelector('.byline.ytmusic-player-bar').textContent.trim();

        return artistName.includes('Taylor Swift') || songTitle.includes('Taylor Swift');
    }

    function skipSong() {
        let skipButton = document.querySelector('.next-button.ytmusic-player-bar');
        if (skipButton) {
            skipButton.click();
        }
    }

    setInterval(function() {
        if (isTaylorSwiftSong()) {
            skipSong();
        }
    }, 50);

})();
