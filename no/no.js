// ==UserScript==
// @name         No
// @namespace    https://pisknk.github.io
// @version      0.1a
// @description  blocks google app promotion popups on non-chrome/google app browsers
// @author       pisknk
// @match        *://*.google.com/*
// @match        *://*.google.*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    
    // function to remove popup elements
    function removePopups() {
        // remove modal overlays and popup containers
        const selectors = [
            '[role="dialog"]',
            '[aria-modal="true"]',
            '.modal',
            '.popup',
            '[data-modal]',
            '[class*="modal"]',
            '[class*="popup"]',
            '[class*="overlay"]'
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                // check if element contains google app promotion text
                const text = el.textContent.toLowerCase();
                if (text.includes('google app') || 
                    text.includes('try more ways to search') ||
                    text.includes('choose how you search') ||
                    text.includes('search with your voice') ||
                    text.includes('try it') ||
                    text.includes('stay in safari') ||
                    text.includes('open the app')) {
                    el.remove();
                }
            });
        });
        
        // remove specific popup elements by text content
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            if (el.children.length === 0) { // only check leaf elements
                const text = el.textContent;
                if (text && (
                    text.includes('Try more ways to search in the Google app') ||
                    text.includes('Search with your voice, camera, and more') ||
                    text.includes('Choose how you search - type, speak or take a photo') ||
                    text.includes('The Google app is an easy way to search on iPhone. Try it?')
                )) {
                    // find and remove the popup container
                    let popupContainer = el.closest('[role="dialog"], .modal, .popup, [class*="modal"], [class*="popup"]');
                    if (popupContainer) {
                        popupContainer.remove();
                    }
                }
            }
        });
    }
    
    // run immediately
    removePopups();
    
    // run periodically to catch dynamically added popups
    setInterval(removePopups, 1000);
    
    // also run when dom changes
    const observer = new MutationObserver(removePopups);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})(); 