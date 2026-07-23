const s1 = document.getElementById('scene-1');
const s2 = document.getElementById('scene-2');
const s3 = document.getElementById('scene-3');
const s4 = document.getElementById('scene-4');
const s5 = document.getElementById('scene-5');
const s6 = document.getElementById('scene-6');
const s7 = document.getElementById('scene-7');
const s8 = document.getElementById('scene-8');

// Audio elements
const bgm = document.getElementById('audio-bgm');

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('start-overlay').classList.remove('active');
    startTeaser();
});

function startTeaser() {
    bgm.play();
    bgm.volume = 0.5;

    // --- SCENE 1: 17 Dec 2021 (5s stay) ---
    s1.classList.add('active');
    setTimeout(() => document.querySelector('.line-1a').classList.add('visible'), 400);
    setTimeout(() => document.querySelector('.line-1b').classList.add('visible'), 1400);
    setTimeout(() => { s1.classList.remove('active'); }, 5000);

    // --- SCENE 2: THE WORLD MOVED ON... (5s stay) ---
    setTimeout(() => {
        s2.classList.add('active');
        setTimeout(() => s2.querySelector('.cinematic-phrase').classList.add('visible'), 400);
        setTimeout(() => s2.classList.remove('active'), 5000);
    }, 6200);

    // --- SCENE 3: But one story... (5s stay) ---
    setTimeout(() => {
        s3.classList.add('active');
        setTimeout(() => s3.querySelector('.cinematic-phrase').classList.add('visible'), 400);
        setTimeout(() => s3.classList.remove('active'), 5000);
    }, 12400);

    // --- SCENE 4: Was only beginning. (5s stay) ---
    setTimeout(() => {
        s4.classList.add('active');
        setTimeout(() => s4.querySelector('.cinematic-phrase').classList.add('visible'), 400);
        setTimeout(() => s4.classList.remove('active'), 5000);
    }, 18600);

    // --- SCENE 5: 5 Years Later... (5s stay) ---
    setTimeout(() => {
        s5.classList.add('active');
        setTimeout(() => s5.querySelector('.thunder-text').classList.add('visible'), 400);
        setTimeout(() => s5.classList.remove('active'), 5000);
    }, 24800);

    // --- SCENE 6: Booking Screen ---
    setTimeout(() => {
        s6.classList.add('active');
        bgm.pause(); 

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
        
        setTimeout(() => s6.classList.remove('active'), 6200);
    }, 31000);

    // --- SCENE 7: ADVANCED TICKETS BOOKED ---
    setTimeout(() => {
        s7.classList.add('active');
        bgm.currentTime = 40; 
        bgm.volume = 0.5;
        bgm.play();

        const ticketHeading = s7.querySelector('.ticket-heading');
        setTimeout(() => ticketHeading.classList.add('visible'), 300);

        setTimeout(() => {
            ticketHeading.classList.remove('visible');
            setTimeout(() => s7.classList.remove('active'), 1000);
        }, 5000);
    }, 38400);

    // --- SCENE 8: Final Return Date (Word by Word) ---
    setTimeout(() => {
        s8.classList.add('active');
        
        const sentence = "I will return on 30 july in theatres";
        const words = sentence.split(" ");
        const container = document.getElementById('word-container');
        container.innerHTML = ""; // Clear old text

        // Create spans for each word
        words.forEach((word) => {
            const span = document.createElement('span');
            span.className = 'word-span';
            span.innerText = word;
            container.appendChild(span);
        });

        const wordSpans = container.querySelectorAll('.word-span');
        wordSpans.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add('word-visible');
            }, index * 400); // Har 400ms me ek word aayega
        });

        // Fade out music gradually
        let fadeOutInterval = setInterval(() => {
            if (bgm.volume > 0.05) {
                bgm.volume -= 0.05;
            } else {
                bgm.pause();
                clearInterval(fadeOutInterval);
            }
        }, 400);

        setTimeout(() => {
            s8.classList.remove('active');
        }, 6500);
    }, 45600);
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
