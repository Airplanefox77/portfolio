document.addEventListener('DOMContentLoaded', function () {
    // Rotating welcome messages
    const welcomeMessages = [
        "Hello, thanks for stopping by!",
        "Thanks for stopping by!",
        "What's up?",
        "Welcome to my site!",
        "Hope you're having a great day!",
        "Feel free to look around!"
    ];

    const header = document.querySelector('header h1');
    let welcomeIndex = 0;

    function rotateWelcome() {
        if (!header) return;
        header.style.opacity = '0';
        setTimeout(() => {
            header.textContent = welcomeMessages[welcomeIndex];
            header.style.opacity = '1';
            welcomeIndex = (welcomeIndex + 1) % welcomeMessages.length;
        }, 600);
    }
    if (header) {
        header.style.transition = 'opacity 0.6s';
        header.textContent = welcomeMessages[0];
        welcomeIndex = 1;
        setTimeout(rotateWelcome, 4000);
        setInterval(rotateWelcome, 4000);
    }

    // Section navigation
    const sections = {
        home: document.getElementById('home'),
        about: document.getElementById('about'),
        features: document.getElementById('features'),
        contact: document.getElementById('contact'),
        admin: document.getElementById('admin')
    };

    function showSection(sectionKey) {
        // Hide all sections
        Object.values(sections).forEach(section => {
            if (section) section.style.display = 'none';
        });

        // Show the selected section(s)
        if (sectionKey === 'home') {
            sections.home.style.display = '';
            sections.features.style.display = '';
        } else if (sections[sectionKey]) {
            sections[sectionKey].style.display = '';
        }
    }

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = link.getAttribute('href').replace('#', '');
            showSection(target);
        });
    });

    // Show home by default
    showSection('home');

    // Admin password and email viewing
    const adminForm = document.getElementById('adminForm');
    const emailListDiv = document.getElementById('emailList');
    const ADMIN_PASSWORD = 'letmein'; // Change as needed

    if (adminForm) {
        adminForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const pw = adminForm.adminPassword.value;
            if (pw === ADMIN_PASSWORD) {
                let savedEmail = localStorage.getItem('savedEmail');
                if (savedEmail) {
                    emailListDiv.textContent = 'Saved email: ' + savedEmail;
                } else {
                    emailListDiv.textContent = 'No emails saved.';
                }
            } else {
                emailListDiv.textContent = 'Incorrect password.';
            }
            adminForm.adminPassword.value = '';
        });
    }

    // Contact form email save
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = contactForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            if (email) {
                localStorage.setItem('savedEmail', email);
                emailInput.value = '';
                let msg = document.createElement('div');
                msg.textContent = 'Email saved!';
                msg.style.color = '#7fdbff';
                msg.style.marginTop = '0.5rem';
                contactForm.appendChild(msg);
                setTimeout(() => msg.remove(), 2000);
            }
        });
    }
});