/**
 * SummitVI - Main JavaScript File
 * 3D animations, particles, and interactive effects
 */

// ========================================
// Wait for DOM to be ready
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

// ========================================
// Main Application Initialization
// ========================================
function initApp() {
    // Initialize Lucide icons
    initLucideIcons();

    // Initialize Three.js hero particles
    initHeroParticles();

    // Initialize GSAP ScrollTrigger
    initGSAPAnimations();

    // Initialize Vanilla Tilt on cards
    initVanillaTilt();

    // Initialize Navbar scroll effect
    initNavbarScroll();

    // Initialize Mobile menu
    initMobileMenu();

    // Initialize Smooth scroll
    initSmoothScroll();

    // Initialize Contact form
    initContactForm();

    // Initialize stats counter animation
    initStatsCounter();
}

// ========================================
// Lucide Icons
// ========================================
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ========================================
// Three.js Hero Particles
// ========================================
function initHeroParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Check for touch device - simplify on mobile
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesCount = isTouchDevice ? 30 : 60;
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 20;
        posArray[i + 1] = (Math.random() - 0.5) * 20;
        posArray[i + 2] = (Math.random() - 0.5) * 10;

        // Velocity
        velocityArray[i] = (Math.random() - 0.5) * 0.01;
        velocityArray[i + 1] = (Math.random() - 0.5) * 0.01;
        velocityArray[i + 2] = (Math.random() - 0.5) * 0.005;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Create custom texture for particles (glow effect)
    const createParticleTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(0, 212, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 32, 32);
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    };

    const particlesMaterial = new THREE.PointsMaterial({
        size: isTouchDevice ? 0.15 : 0.12,
        map: createParticleTexture(),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add connection lines between particles
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x00D4FF,
        transparent: true,
        opacity: 0.15
    });

    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // Add floating geometric shapes
    const shapesGroup = new THREE.Group();

    // Create wireframe cubes
    const createWireframeCube = (size, position, rotation) => {
        const geometry = new THREE.BoxGeometry(size, size, size);
        const edges = new THREE.EdgesGeometry(geometry);
        const material = new THREE.LineBasicMaterial({
            color: Math.random() > 0.5 ? 0x00D4FF : 0xFFB800,
            transparent: true,
            opacity: 0.3
        });
        const cube = new THREE.LineSegments(edges, material);
        cube.position.set(...position);
        cube.rotation.set(...rotation);
        return cube;
    };

    // Add a few wireframe cubes
    if (!isTouchDevice) {
        shapesGroup.add(createWireframeCube(2, [-8, 3, -5], [0.5, 0.5, 0]));
        shapesGroup.add(createWireframeCube(1.5, [8, -2, -3], [0, 0.5, 0.3]));
        shapesGroup.add(createWireframeCube(1, [-5, -4, -4], [0.3, 0, 0.5]));
    }

    scene.add(shapesGroup);

    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    if (!isTouchDevice) {
        document.addEventListener('mousemove', (event) => {
            targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
            targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        }, { passive: true });
    }

    // Animation loop
    let animationId;
    let isVisible = true;

    // Visibility observer
    const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });

    observer.observe(canvas);

    function animate() {
        animationId = requestAnimationFrame(animate);

        if (!isVisible) return;

        // Smooth mouse following
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Update particles
        const positions = particlesGeometry.attributes.position.array;

        for (let i = 0; i < particlesCount * 3; i += 3) {
            // Apply velocity
            positions[i] += velocityArray[i];
            positions[i + 1] += velocityArray[i + 1];
            positions[i + 2] += velocityArray[i + 2];

            // Mouse repulsion effect
            if (!isTouchDevice) {
                const dx = positions[i] - mouseX * 10;
                const dy = positions[i + 1] - mouseY * 10;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 3) {
                    positions[i] += dx * 0.01;
                    positions[i + 1] += dy * 0.01;
                }
            }

            // Wrap around boundaries
            if (positions[i] > 10) positions[i] = -10;
            if (positions[i] < -10) positions[i] = 10;
            if (positions[i + 1] > 10) positions[i + 1] = -10;
            if (positions[i + 1] < -10) positions[i + 1] = 10;
        }

        particlesGeometry.attributes.position.needsUpdate = true;

        // Update connection lines (every 2nd frame for performance)
        if (!isTouchDevice && animationId % 2 === 0) {
            updateConnectionLines(positions, particlesCount, linesGeometry);
        }

        // Rotate shapes
        shapesGroup.rotation.x += 0.001;
        shapesGroup.rotation.y += 0.002;

        // Camera movement based on mouse
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }, { passive: true });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationId);
        observer.disconnect();
    });
}

// Update connection lines between nearby particles
function updateConnectionLines(positions, count, geometry) {
    const linePositions = [];
    const maxConnections = 3;
    const maxDistance = 2.5;

    for (let i = 0; i < count; i++) {
        let connections = 0;
        for (let j = i + 1; j < count; j++) {
            if (connections >= maxConnections) break;

            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < maxDistance) {
                linePositions.push(
                    positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                    positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                );
                connections++;
            }
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
}

// ========================================
// GSAP ScrollTrigger Animations
// ========================================
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // About section reveal
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });

    // Service cards staggered reveal
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '#servicios',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        rotateX: 15,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Portfolio cards staggered reveal with 3D effect
    gsap.from('.portfolio-card', {
        scrollTrigger: {
            trigger: '#portfolio',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        rotateY: -10,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
    });

    // Contact section reveal
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '#contacto',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '#contacto',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        x: 80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
    });

    // Parallax effect for stats
    gsap.to('.stat-item', {
        scrollTrigger: {
            trigger: '.stat-item',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -30,
        ease: 'none'
    });

    // Scroll indicator fade
    gsap.to('.scroll-indicator', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: '50% top',
            scrub: 1
        },
        opacity: 0,
        ease: 'none'
    });
}

// ========================================
// Vanilla Tilt for 3D Card Effects
// ========================================
function initVanillaTilt() {
    if (typeof VanillaTilt === 'undefined') return;

    // Service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        VanillaTilt.init(card, {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.3,
            perspective: 1000,
            scale: 1.02,
            transition: true,
            gyroscope: false // Disable on mobile for performance
        });
    });

    // Stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        VanillaTilt.init(item, {
            max: 5,
            speed: 300,
            glare: true,
            'max-glare': 0.2,
            perspective: 1000,
            scale: 1.01
        });
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// ========================================
// Mobile Menu
// ========================================
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = menuBtn.querySelector('i');
        if (icon) {
            const isMenu = icon.getAttribute('data-lucide') === 'menu';
            icon.setAttribute('data-lucide', isMenu ? 'x' : 'menu');
            lucide.createIcons();
        }
    });

    // Close menu when clicking on links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Contact Form
// ========================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
        `;

        // Simulate API call
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            form.reset();
            showToast('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
        }, 1500);
    });
}

// ========================================
// Toast Notification
// ========================================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// ========================================
// Stats Counter Animation
// ========================================
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-item > div:first-child');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;

                // Extract number from text
                const match = text.match(/[\d.]+/);
                if (!match) return;

                const finalNumber = parseFloat(match[0]);
                const suffix = text.replace(/[\d.]+/, '');
                const isDecimal = text.includes('.');

                animateCounter(target, 0, finalNumber, 2000, isDecimal, suffix);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, start, end, duration, isDecimal, suffix) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * easeOut;

        if (isDecimal) {
            element.textContent = current.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ========================================
// Performance: Pause animations when tab is hidden
// ========================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause expensive animations
        document.body.classList.add('animations-paused');
    } else {
        document.body.classList.remove('animations-paused');
    }
});

// ========================================
// Performance: Reduce motion preference
// ========================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

// ========================================
// Preload critical images
// ========================================
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload after initial render
if (document.readyState === 'complete') {
    preloadImages();
} else {
    window.addEventListener('load', preloadImages);
}
