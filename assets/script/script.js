particlesJS('particles-js', {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: "#61dafb" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#61dafb", opacity: 0.4, width: 1 },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

function validateInput(input) {
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '').toLowerCase();
}

async function predictCategory() {
    const newsTitle = document.getElementById('newsTitle').value;
    const resultSpan = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');

    if (!newsTitle) {
        resultSpan.textContent = 'Mohon masukkan judul berita.';
        return;
    }

    loadingDiv.style.display = 'block';
    resultSpan.textContent = ''; // Clear previous result

    try {
        const response = await fetch('https://arjunaadlina-flasks.hf.space/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newsTitle }),
        });

        const data = await response.json();
        loadingDiv.style.display = 'none';
        resultSpan.textContent = `Kategori: ${data.category}`;
    } catch (error) {
        loadingDiv.style.display = 'none';
        resultSpan.textContent = 'Terjadi kesalahan. Silakan coba lagi.';
    }
}