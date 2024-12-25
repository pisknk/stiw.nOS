// ==UserScript==
// @name         skip them!
// @namespace    https://pisknk.github.io
// @version      0.2
// @description  automatically skip songs made by certain problematic artists on YouTube Music.
// @author       pisknk
// @match        https://music.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // list of artists to block
    const blockedArtists = [
        "Taylor Swift", // to add more artists, follow the following structure.
        "Drake", // add a comma at the end of the quotes
        "Justin Bieber"
    ];

    function isBlockedSong() {
        const songTitleElement = document.querySelector('.title.ytmusic-player-bar');
        const artistNameElement = document.querySelector('.byline.ytmusic-player-bar');

        if (!songTitleElement || !artistNameElement) {
            return false; // if the elements aren't available, do nothing
        }

        const songTitle = songTitleElement.textContent.trim();
        const artistName = artistNameElement.textContent.trim();

        // check if the current song's artist or title matches any blocked artist
        return blockedArtists.some(artist => artistName.includes(artist) || songTitle.includes(artist));
    }

    function skipSong() {
        const skipButton = document.querySelector('.next-button.ytmusic-player-bar');
        if (skipButton) {
            skipButton.click();
            console.log("skipped a song made by some problematic artist!");
        }
    }

    // continuously check the song every 50ms
    setInterval(function () {
        if (isBlockedSong()) {
            skipSong();
        }
    }, 50);

})();
