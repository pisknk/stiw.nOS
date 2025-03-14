// ==UserScript==
// @name         Never Forget.
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  Are you 9/11 coz i will never forget you! :3
// @author       @pisknk
// @match        https://www.google.com/search*
// @grant        none
// ==/UserScript==

// list of terms that trigger confetti
const triggerTerms = [
    "9/11",
    "twin towers",
    "september 11 attacks",
    "september 11 2001"
];

// function to check if the search query matches any trigger term
function checkForTriggerTerm() {
    const query = new URLSearchParams(window.location.search).get('q')?.toLowerCase();
    return query && triggerTerms.some(term => query.includes(term.toLowerCase()));
}

// confetti function
function startConfetti() {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '9999'; // ensure it's on top of the content
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    const particles = [];
    const maxParticles = 30; // limit number of particles to 30

    // "flowerS" lmao
    const flowerEmojis = ["💣", "💥", "🏢", "🔥", "🥵"];

    // function to create confetti particles with random flower emoji
    function createParticle(x, y) {
        const emoji = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)]; // randomly choose an emoji
        particles.push({
            x: x,
            y: y,
            emoji: emoji,
            size: Math.random() * 40 + 30, // random emoji size
            speedX: (Math.random() - 0.5) * 2, // slow horizontal speed for more control
            speedY: Math.random() * 3 + 2, // slow vertical speed for a smoother fall
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 3 - 1.5, // faster rotation speed
        });

        // limit number of particles in the array to maxParticles
        if (particles.length > maxParticles) {
            particles.shift(); // remove the oldest particle
        }
    }

    // generate multiple emoji confetti particles
    function generateConfetti() {
        for (let i = 0; i < maxParticles; i++) { // limit number of particles generated to 30
            createParticle(
                Math.random() * canvas.width, // random X position across the canvas
                -40 // start above the canvas (fall from the top)
            );
        }
    }

    // update particle position and redraw emoji
    function updateConfetti() {
        // optimized clearRect to avoid full canvas clearing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.speedX; // horizontal movement
            p.y += p.speedY; // vertical fall movement
            p.speedY += 0.05; // gradual increase in vertical speed (gravity effect)
            p.rotation += p.rotationSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.font = `${p.size}px sans-serif`;
            ctx.fillText(p.emoji, -p.size / 2, p.size / 2);
            ctx.restore();
        });

        // use requestAnimationFrame for smoother, more efficient animation loop
        requestAnimationFrame(updateConfetti);
    }

    // start the confetti effect
    generateConfetti();
    updateConfetti();

    // keep the canvas visible for X seconds
    setTimeout(() => {
        document.body.removeChild(canvas);
    }, 10000);
}

// wait until the page has fully loaded
window.addEventListener('load', () => {
    if (checkForTriggerTerm()) {
        startConfetti();
    }
});
