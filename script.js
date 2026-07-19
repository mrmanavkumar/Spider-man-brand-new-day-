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

// Audio elements
const bgm = document.getElementById('audio-bgm');
const webSound = document.getElementById('audio-web');
const tickSound = document.getElementById('audio-tick');

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-overlay').classList.remove('active');
    startTeaser();
});

function startTeaser() {
    // --- 0s: BGM Starts instantly ---
    bgm.play();
    bgm.volume = 0.5;

    // --- SCENE 1: 17 Dec 2021 (Stays for 5s) ---
    s1.classList.add('active');
    setTimeout(() => document.querySelector('.line-1a').classList.add('visible'), 400);
    setTimeout(() => document.querySelector('.line-1b').classList.add('visible'), 1400);
    
    // Slow Fade Out at 5th second
    setTimeout(() => { s1.classList.remove('active'); }, 5000);

    // --- SCENE 2: THE WORLD MOVED ON... (Stays for 5s) ---
    setTimeout(() => {
        s2.classList.add('active');
        setTimeout(() => s2.querySelector('.cinematic-phrase').classList.add('visible'), 400);
        setTimeout(() => s2.classList.remove('active'), 5000);
    }, 6200);

    // --- SCENE 3: But one story... (Stays for 5s) ---
    setTimeout(() => {
        s3.classList.add('active');
        setTimeout(() => s3.querySelector('.cinematic-phrase').classList.add('visible'), 400);
        setTimeout(() => s3.classList.remove('active'), 5000);
    }, 12400);

    // --- SCENE 4: Was only beginning. (Stays for 5s) ---
    setTimeout(() => {
        s4.classList.add('active');
        setTimeout(() => s4.querySelector('.cinematic-phrase').classList.add('visible'), 400);
        setTimeout(() => s4.classList.remove('active'), 5000);
    }, 18600);

    // --- SCENE 5: Timeline Counter (2021 up to 2026) ---
    setTimeout(() => {
        s5.classList.add('active');

        const digits = ['1', '2', '3', '4', '5', '6']; // Changes from 2021 to 2026
        const digitEl = document.getElementById('changing-digit');
        const flash = document.querySelector('.flash-overlay');

        digits.forEach((digit, index) => {
            setTimeout(() => {
                digitEl.innerText = digit;
                tickSound.currentTime = 0;
                tickSound.play();
                
                flash.classList.add('flash-active');
                setTimeout(() => flash.classList.remove('flash-active'), 250);
            }, index * 1100);
        });
        
        setTimeout(() => s5.classList.remove('active'), 7500);
    }, 24800);

    // --- SCENE 6: 5 Years Later... (Stays for 5s) ---
    setTimeout(() => {
        s6.classList.add('active');
        setTimeout(() => s6.querySelector('.thunder-text').classList.add('visible'), 400);
        
        // Pitch black dark shift
        setTimeout(() => s6.classList.remove('active'), 5000);
    }, 33500);

    // --- SCENE 7: Absolute Perfect Replica Logo Reveal & Web Shoot ---
    setTimeout(() => {
        s7.classList.add('active');
        const logoContainer = document.getElementById('text-logo-container');
        logoContainer.classList.add('show-logo');
        bgm.volume = 1.0; // Dynamic Audio Peak

        // Logo shows for 3 seconds, then sudden web shoot attack with sound sync
        setTimeout(() => {
            const webs = document.querySelectorAll('.web');
            webs.forEach(w => w.classList.add('web-shoot'));
            webSound.currentTime = 0;
            webSound.play(); // Exact sound trigger time

            // Stays stuck to logo, then pull out jhatka!
            setTimeout(() => {
                logoContainer.classList.add('logo-pulled-out');
                webs.forEach(w => w.style.opacity = '0');
                setTimeout(() => s7.classList.remove('active'), 500);
            }, 1200);
        }, 3000);
    }, 39700);

    // --- SCENE 8: Booking Screen ---
    setTimeout(() => {
        s8.classList.add('active');
        bgm.pause(); // Extreme cinematic drop/silence

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
            }, idx * 1300);
        });
        
        setTimeout(() => s8.classList.remove('active'), 6200);
    }, 45400);

    // --- SCENE 9: ADVANCED TICKETS BOOKED (Stays for 5s) ---
    setTimeout(() => {
        s9.classList.add('active');
        bgm.currentTime = 40; 
        bgm.volume = 0.5;
        bgm.play();

        const ticketHeading = s9.querySelector('.ticket-heading');
        setTimeout(() => ticketHeading.classList.add('visible'), 300);

        setTimeout(() => {
            ticketHeading.classList.remove('visible');
            setTimeout(() => s9.classList.remove('active'), 1000);
        }, 5000);
    }, 52800);

    // --- SCENE 10: I will return on 30 july (Stays for 5s) ---
    setTimeout(() => {
        s10.classList.add('active');
        setTimeout(() => s10.querySelector('.return-text').style.opacity = '1', 400);

        // BGM smooth slow fade out at absolute end
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
        }, 5000);
    }, 6000);
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
