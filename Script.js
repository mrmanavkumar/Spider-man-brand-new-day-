const s1 = document.getElementById('scene-1');
const s2 = document.getElementById('scene-2');
const s3 = document.getElementById('scene-3');
const s4 = document.getElementById('scene-4');
const s56 = document.getElementById('scene-5-6');
const s8 = document.getElementById('scene-8');
const s9 = document.getElementById('scene-9');
const s10 = document.getElementById('scene-10');

// Sound Selectors
const bgVideo = document.getElementById('bg-video'); 
const bgm = document.getElementById('audio-bgm');
const webSound = document.getElementById('audio-web');
const tickSound = document.getElementById('audio-tick');

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-overlay').classList.remove('active');
    startTeaser();
});

function startTeaser() {
    // --- SCENE 1 (0s - 6s): Black Screen + Rain Sound ---
    s1.classList.add('active'); 
    bgVideo.play();             
    bgVideo.volume = 0.8;

    setTimeout(() => {
        document.querySelector('.line-a').classList.add('visible');
    }, 1000); 

    setTimeout(() => {
        document.querySelector('.line-b').classList.add('visible');
    }, 2500);

    setTimeout(() => {
        document.querySelector('.line-c').classList.add('visible');
    }, 4000);

    // --- SCENE 2 (6s - 13s): Story Continues (BGM Starts) ---
    setTimeout(() => {
        s1.classList.remove('active');
        s2.classList.add('active');
        bgm.play();
        bgm.volume = 0.4;
        
        setTimeout(() => document.querySelector('.line-1').classList.add('visible'), 1000);
        setTimeout(() => document.querySelector('.line-2').classList.add('visible'), 3000);
        setTimeout(() => document.querySelector('.line-3').classList.add('visible'), 5000);
    }, 6000); 

    // --- SCENE 3 (13s - 21s): Fast Timeline Leap with Tick sounds ---
    setTimeout(() => {
        s2.classList.remove('active');
        s3.classList.add('active');

        const years = [2022, 2023, 2024, 2025, 2026];
        const yearEl = document.getElementById('timeline-year');
        const flash = document.querySelector('.flash-overlay');

        years.forEach((year, index) => {
            setTimeout(() => {
                yearEl.innerText = year;
                tickSound.currentTime = 0;
                tickSound.play();
                flash.classList.add('flash-active');
                setTimeout(() => flash.classList.remove('flash-active'), 300);
            }, index * 1400);
        });
    }, 13000);

    // --- SCENE 4 (21s - 24s): 5 Years Later + Shake ---
    setTimeout(() => {
        s3.classList.remove('active');
        s4.classList.add('active');
        document.querySelector('.shake-container').classList.add('shake-active');
    }, 21000);

    // --- SCENE 5 & 6 (24s - 35s): Logo Pulsing Glow Reveal ---
    setTimeout(() => {
        s4.classList.remove('active');
        document.querySelector('.shake-container').classList.remove('shake-active');
        s56.classList.add('active');
        
        const logo = document.getElementById('main-logo');
        logo.classList.add('show-logo');
        bgm.volume = 1.0; // BGM volume peaks for heroic feel
    }, 24000);

    // --- SCENE 7 (35s - 38s): Web Shoot and Screen Pull ---
    setTimeout(() => {
        const webs = document.querySelectorAll('.web');
        const logo = document.getElementById('main-logo');
        
        webs.forEach(w => w.classList.add('web-shoot'));
        webSound.play();

        setTimeout(() => {
            logo.classList.add('logo-pulled-out');
            webs.forEach(w => w.style.opacity = '0');
        }, 1000);
    }, 35000);

    // --- SCENE 8 (38s - 45s): Silent Ticket Booking Terminal ---
    setTimeout(() => {
        s56.classList.remove('active');
        s8.classList.add('active');
        bgm.pause(); // Pure silence to focus on booking

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
            }, idx * 1600);
        });
    }, 38000);

    // --- SCENE 9 (45s - 52s): Ticket Booked Reveal (Soft BGM returns) ---
    setTimeout(() => {
        s8.classList.remove('active');
        s9.classList.add('active');
        bgm.currentTime = 30; // Starts from dynamic transition
        bgm.volume = 0.4;
        bgm.play();
    }, 45000);

    // --- SCENE 10 (52s - 60s): Soft Fade Out Ending ---
    setTimeout(() => {
        s9.classList.remove('active');
        s10.classList.add('active');

        // Rain and Music fade out smoothly
        let fadeOutInterval = setInterval(() => {
            if (bgVideo.volume > 0.05) {
                bgVideo.volume -= 0.05;
                bgm.volume -= 0.03;
            } else {
                bgVideo.pause();
                bgm.pause();
                clearInterval(fadeOutInterval);
            }
        }, 300);

        setTimeout(() => {
            s10.classList.remove('active');
        }, 4000);
    }, 52000);
}

// Simple Typing simulation logic
function typeWriter(elementId, text, callback) {
    let i = 0;
    const el = document.getElementById(elementId);
    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 40);
        } else if (callback) { callback(); }
    }
    type();
}

