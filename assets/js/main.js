
// =====================
// MOBILE MENU TOGGLE
// =====================
const nav__Links = document.querySelector('.nav__links');

// Create hamburger button
const hamburger = document.createElement('button');
hamburger.innerHTML = '☰';
hamburger.style.cssText = `
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #1a1a1a;
`;

nav.appendChild(hamburger);

hamburger.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '60px';
    navLinks.style.right = '30px';
    navLinks.style.background = 'white';
    navLinks.style.padding = '20px';
    navLinks.style.borderRadius = '8px';
    navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    hamburger.innerHTML = isOpen ? '☰' : '✕';
});

// Show/hide hamburger based on screen size
const checkScreen = () => {
    if (window.innerWidth <= 600) {
        hamburger.style.display = 'block';
        navLinks.style.display = 'none';
    } else {
        hamburger.style.display = 'none';
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.background = 'none';
        navLinks.style.padding = '0';
        navLinks.style.boxShadow = 'none';
    }
};

window.addEventListener('resize', checkScreen);
checkScreen();

// =====================
// TYPING EFFECT (HERO)
// =====================
const heroTitle = document.querySelector('.hero__title');

if (heroTitle) {
    const words = ['Student', 'Developer', 'Analyst', 'Machine Learning'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const em = heroTitle.querySelector('em');
    if (em) {
        const type = () => {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                em.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                em.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => { isDeleting = true; }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            setTimeout(type, isDeleting ? 60 : 100);
        };

        setTimeout(type, 1500);
    }
}


// =====================
// MOBILE MENU TOGGLE
// =====================
const navLinks = document.querySelector('.nav__links');
const hamburger = document.getElementById('hamburger');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('open');
        navLinks.classList.toggle('open');
        hamburger.innerHTML = isOpen ? '☰' : '✕';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.innerHTML = '☰';
        });
    });
}