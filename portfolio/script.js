// Sample projects data
const projects = [
    {
        id: 1,
        title: "AnatoView",
        description: "A web-application that converts CT Scans into 3d printable voxels.",
        image: "assets/images/project1.jpg",
        tags: ["TypeScript", "Github", "Playwright"],
        link: "projects/project1.html"
    },
    {
        id: 2,
        title: "Wild West Portal",
        description: "A authentication and password protected portal for live chats using Socket.io, with a Wild West theme.",
        image: "assets/images/project2.jpg",
        tags: ["Socket.io", "Handlebars", "JavaScript", "Github"],
        link: "projects/project2.html"
    },
    {
        id: 3,
        title: "Eco-Friendly E-commerce",
        description: "Sustainable online marketplace connecting eco-conscious consumers with green businesses.",
        image: "assets/images/project3.jpg",
        tags: ["Vue.js", "Express", "PostgreSQL", "AWS"],
        link: "projects/project3.html"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    renderProjects();
    setupNavigation();
    setupFloatingElements();
});

function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) {
        console.warn('Projects grid not found');
        return;
    }
    
    projectsGrid.innerHTML = ''; // Clear existing content
    
    projects.forEach(project => {
        const projectCard = document.createElement('article');
        projectCard.className = 'project-card';
        
        // Add entrance animation
        projectCard.style.opacity = '0';
        projectCard.style.transform = 'translateY(20px)';
        
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <h3 class="project-title">${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <a href="${project.link}" class="project-link">
                Explore Project
                <i class="fas fa-arrow-right"></i>
            </a>
        `;
        
        projectsGrid.appendChild(projectCard);
        
        // Animate in
        setTimeout(() => {
            projectCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            projectCard.style.opacity = '1';
            projectCard.style.transform = 'translateY(0)';
        }, 100);
    });
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only prevent default if it's an anchor link
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
            // If it's a regular link, let it navigate normally
        });
    });
}

function setupFloatingElements() {
    createFloatingLeaves();
}

function createFloatingLeaves() {
    const container = document.querySelector('.bg-leaves');
    if (!container) return;
    
    // Clear existing leaves
    container.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const leaf = document.createElement('div');
        leaf.innerHTML = '🍃';
        leaf.style.position = 'fixed';
        leaf.style.left = `${Math.random() * 100}vw`;
        leaf.style.top = `${Math.random() * 100}vh`;
        leaf.style.fontSize = `${Math.random() * 20 + 10}px`;
        leaf.style.opacity = Math.random() * 0.3 + 0.1;
        leaf.style.zIndex = '-1';
        leaf.style.pointerEvents = 'none';
        leaf.style.animation = `float${i % 3} ${Math.random() * 20 + 10}s linear infinite`;
        leaf.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(leaf);
    }
    
    // Add floating animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float0 {
            0% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(30px, 50px) rotate(120deg); }
            66% { transform: translate(-20px, 80px) rotate(240deg); }
            100% { transform: translate(0, 100px) rotate(360deg); }
        }
        @keyframes float1 {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(-40px, 40px) rotate(90deg); }
            50% { transform: translate(20px, 70px) rotate(180deg); }
            75% { transform: translate(-30px, 90px) rotate(270deg); }
            100% { transform: translate(0, 100px) rotate(360deg); }
        }
        @keyframes float2 {
            0% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(50px, 30px) rotate(120deg); }
            66% { transform: translate(-30px, 60px) rotate(240deg); }
            100% { transform: translate(0, 100px) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createFloatingLeaves();
    }, 250);
});

// Add error handling for images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        e.target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop';
    }
}, true);