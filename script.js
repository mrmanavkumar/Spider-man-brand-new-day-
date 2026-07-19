const s1 = document.getElementById('scene-1');
const s2 = document.getElementById('scene-2');
const s3 = document.getElementById('scene-3');
const s4 = document.getElementById('scene-4');
const s5 = document.getElementById('scene-5');
const s6 = document.getElementById('scene-6');
const s7 = document.getElementById('scene-7');
const s8 = document.getElementById('scene-8');
const s9 = document.getElementById('scene-9');
const s10 = document.getElementById('scene-10');

// Audio Setup
const bgm = document.getElementById('audio-bgm');
const webSound = document.getElementById('audio-web');
const tickSound = document.getElementById('audio-tick');

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-overlay').classList.remove('active');
    startTeaser();
});

function startTeaser() {
    // --- STARTING SE BGM ON (0s) ---
    bgm.play();
    bgm.volume = 0.5;

    // --- SCENE 1: 17 Dec 2021 No Way Home ---
    s1.classList.add('active');
    setTimeout(() => document.querySelector('.line-1a').classList.add('visible'), 500);
    setTimeout(() => document.querySelector('.line-1b').classList.add('visible'), 1500);
    
    // Fade Out Scene 1
    setTimeout(() => {
        s1.classList.remove('active');
    }, 4000);

    // --- SCENE 2: THE WORLD MOVED ON... ---
    setTimeout(() => {
        s2.classList.add('active');
        setTimeout(() => s2.querySelector('.cinematic-phrase').classList.add('visible'), 500);
        setTimeout(() => s2.classList.remove('active'), 3000);
    }, 4500);

    // --- SCENE 3: But one story... ---
    setTimeout(() => {
        s3.classList.add('active');
        setTimeout(() => s3.querySelector('.cinematic-phrase').classList.add('visible'), 500);
        setTimeout(() => s3.classList.remove('active'), 3000);
    }, 8000);

    // --- SCENE 4: Was only beginning. ---
    setTimeout(() => {
        s4.classList.add('active');
        setTimeout(() => s4.querySelector('.cinematic-phrase').classList.add('visible'), 500);
        setTimeout(() => s4.classList.remove('active'), 3000);
    }, 11500);

    // --- SCENE 5: Timeline (Only last digit changing + Sound Sync) ---
    setTimeout(() => {
        s4.classList.remove('active');
        s5.classList.add('active');

        const digits = ['1', '2', '3', '4', '5'];
        const digitEl = document.getElementById('changing-digit');
        const flash = document.querySelector('.flash-overlay');

        digits.forEach((digit, index) => {
            setTimeout(() => {
                digitEl.innerText = digit;
                tickSound.currentTime = 0;
                tickSound.play();
                
                flash.classList.add('flash-active');
                setTimeout(() => flash.classList.remove('flash-active'), 250);
            }, index * 1200);
        });
        
        setTimeout(() => s5.classList.remove('active'), 6500);
    }, 15000);

    // --- SCENE 6: 5 Years Later... ---
    setTimeout(() => {
        s6.classList.add('active');
        setTimeout(() => s6.querySelector('.thunder-text').classList.add('visible'), 500);
        
        // Sudden Andhera (Pitch Black before Logo)
        setTimeout(() => s6.classList.remove('active'), 3000);
    }, 22000);

    // --- SCENE 7: Text Logo & Webs Attack ---
    setTimeout(() => {
        s7.classList.add('active');
        const logoContainer = document.getElementById('text-logo-container');
        logoContainer.classList.add('show-logo');
        bgm.volume = 1.0; // Heroic Peak

        // Web shoot directly triggers with sound after 3 seconds of logo zoom
        setTimeout(() => {
            const webs = document.querySelectorAll('.web');
            webs.forEach(w => w.classList.add('web-shoot'));
            webSound.currentTime = 0;
            webSound.play();

            // Stays on screen for 1 second, then Thwip Pull Out!
            setTimeout(() => {
                logoContainer.classList.add('logo-pulled-out');
                webs.forEach(w => w.style.opacity = '0');
                setTimeout(() => s7.classList.remove('active'), 500);
            }, 1000);
        }, 3000);
    }, 25500);

    // --- SCENE 8: Booking Terminal ---
    setTimeout(() => {
        s8.classList.add('active');
        bgm.pause(); // Pure dramatic silence

        const steps = [
            { id: 'line-search', text: 'Searching Shows...' },
            { id: 'line-seats', text: 'Finding Best Seats...' },
            { id: 'line-pay', text: 'Processing Payment...' },
            { id: 'line-confirm', text: 'Booking Confirmed.' }
        ];

        steps.forEach((step, idx) => {
            setTimeout(() => {
                typeWriter(step.id, step.text, () => {
                    document.getElementById(step.id).innerHTML += '<span class="check-mark">✔</span>';
                });
            }, idx * 1400);
        });
        
        setTimeout(() => s8.classList.remove('active'), 6500);
    }, 30500);

    // --- SCENE 9: ADVANCED TICKETS BOOKED (Fade in/out) ---
    setTimeout(() => {
        s9.classList.add('active');
        bgm.currentTime = 45; 
        bgm.volume = 0.5;
        bgm.play();

        const ticketHeading = s9.querySelector('.ticket-heading');
        setTimeout(() => ticketHeading.classList.add('visible'), 200);

        setTimeout(() => {
            ticketHeading.classList.remove('visible');
            setTimeout(() => s9.classList.remove('active'), 800);
        }, 3500);
    }, 37500);

    // --- SCENE 10: I will return on 30 july ---
    setTimeout(() => {
        s10.classList.add('active');

        // BGM Fade Out smoothly at the very end
        let fadeOutInterval = setInterval(() => {
            if (bgm.volume > 0.05) {
                bgm.volume -= 0.05;
            } else {
                bgm.pause();
                clearInterval(fadeOutInterval);
            }
        }, 400);

        setTimeout(() => {
            s10.classList.remove('active');
        }, 4000);
    }, 42500);
}

function typeWriter(elementId, text, callback) {
    let i = 0;
    const el = document.getElementById(elementId);
    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 35);
        } else if (callback) { callback(); }
    }
    type();
                                                     }
