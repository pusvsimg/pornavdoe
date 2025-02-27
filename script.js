document.addEventListener('DOMContentLoaded', function() {
    // Website data
    const websites = [
        {
            name: "Google",
            url: "https://www.google.com",
            icon: "fab fa-google",
            category: "tech"
        },
        {
            name: "YouTube",
            url: "https://www.youtube.com",
            icon: "fab fa-youtube",
            category: "video"
        },
        {
            name: "Facebook",
            url: "https://www.facebook.com",
            icon: "fab fa-facebook",
            category: "social"
        },
        {
            name: "Twitter",
            url: "https://twitter.com",
            icon: "fab fa-twitter",
            category: "social"
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com",
            icon: "fab fa-instagram",
            category: "social"
        },
        {
            name: "Amazon",
            url: "https://www.amazon.com",
            icon: "fab fa-amazon",
            category: "shopping"
        },
        {
            name: "Netflix",
            url: "https://www.netflix.com",
            icon: "fab fa-netflix",
            category: "video"
        },
        {
            name: "Wikipedia",
            url: "https://www.wikipedia.org",
            icon: "fab fa-wikipedia-w",
            category: "news"
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com",
            icon: "fab fa-linkedin",
            category: "social"
        },
        {
            name: "Reddit",
            url: "https://www.reddit.com",
            icon: "fab fa-reddit",
            category: "social"
        },
        {
            name: "Microsoft",
            url: "https://www.microsoft.com",
            icon: "fab fa-microsoft",
            category: "tech"
        },
        {
            name: "Apple",
            url: "https://www.apple.com",
            icon: "fab fa-apple",
            category: "tech"
        },
        {
            name: "GitHub",
            url: "https://github.com",
            icon: "fab fa-github",
            category: "tech"
        },
        {
            name: "WhatsApp",
            url: "https://www.whatsapp.com",
            icon: "fab fa-whatsapp",
            category: "social"
        },
        {
            name: "Spotify",
            url: "https://www.spotify.com",
            icon: "fab fa-spotify",
            category: "video"
        },
        {
            name: "TikTok",
            url: "https://www.tiktok.com",
            icon: "fab fa-tiktok",
            category: "social"
        },
        {
            name: "Alibaba",
            url: "https://www.alibaba.com",
            icon: "fas fa-shopping-cart",
            category: "shopping"
        },
        {
            name: "CNN",
            url: "https://www.cnn.com",
            icon: "fas fa-newspaper",
            category: "news"
        },
        {
            name: "BBC",
            url: "https://www.bbc.com",
            icon: "fas fa-newspaper",
            category: "news"
        },
        {
            name: "PayPal",
            url: "https://www.paypal.com",
            icon: "fab fa-paypal",
            category: "tools"
        },
        {
            name: "Dropbox",
            url: "https://www.dropbox.com",
            icon: "fab fa-dropbox",
            category: "tools"
        },
        {
            name: "Slack",
            url: "https://slack.com",
            icon: "fab fa-slack",
            category: "tools"
        },
        {
            name: "Zoom",
            url: "https://zoom.us",
            icon: "fas fa-video",
            category: "tools"
        },
        {
            name: "The New York Times",
            url: "https://www.nytimes.com",
            icon: "fas fa-newspaper",
            category: "news"
        }
    ];

    const sitesContainer = document.getElementById('sites-container');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const tabs = document.querySelectorAll('.tab');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const loader = document.querySelector('.loader');

    // Hide loader after a short delay to simulate loading
    setTimeout(() => {
        loader.style.display = 'none';
        renderWebsites(websites);
        // Set first tab as active by default
        const firstTab = document.querySelector('.tab');
        if (firstTab) {
            firstTab.classList.add('active');
            filterByCategory(firstTab.dataset.category);
        }
    }, 800);

    // View switching functionality
    gridViewBtn.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            listViewBtn.classList.remove('active');
            this.classList.add('active');
            sitesContainer.classList.remove('list-view');
            sitesContainer.classList.add('grid-view');
            // Re-render to update layout
            const activeTab = document.querySelector('.tab.active');
            if (activeTab) {
                filterByCategory(activeTab.dataset.category);
            } else {
                renderWebsites(websites);
            }
        }
    });

    listViewBtn.addEventListener('click', function() {
        if (!this.classList.contains('active')) {
            gridViewBtn.classList.remove('active');
            this.classList.add('active');
            sitesContainer.classList.remove('grid-view');
            sitesContainer.classList.add('list-view');
            // Re-render to update layout
            const activeTab = document.querySelector('.tab.active');
            if (activeTab) {
                filterByCategory(activeTab.dataset.category);
            } else {
                renderWebsites(websites);
            }
        }
    });

    // Render website cards
    function renderWebsites(sites) {
        sitesContainer.innerHTML = '';
        
        if (sites.length === 0) {
            sitesContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No websites found matching your search.</p>
                </div>
            `;
            return;
        }
        
        sites.forEach(site => {
            const card = document.createElement('div');
            card.className = 'site-card';
            card.setAttribute('data-url', site.url);
            card.setAttribute('data-category', site.category);
            
            card.innerHTML = `
                <div class="site-icon">
                    <i class="${site.icon}"></i>
                </div>
                <div class="site-info">
                    <h3>${site.name}</h3>
                </div>
            `;
            
            // Make the entire card clickable
            card.addEventListener('click', function() {
                window.open(this.getAttribute('data-url'), '_blank');
            });
            
            sitesContainer.appendChild(card);
        });
        
        // Add staggered animation
        const cards = document.querySelectorAll('.site-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${0.05 * (index % 10)}s`;
        });
    }

    // Filter websites by category
    function filterByCategory(category) {
        const filteredSites = websites.filter(site => site.category === category);
        renderWebsites(filteredSites);
        
        // Clear search input
        searchInput.value = '';
    }

    // Search functionality
    function searchWebsites() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredSites = websites.filter(site => 
            site.name.toLowerCase().includes(searchTerm)
        );
        renderWebsites(filteredSites);
        
        // Reset category tab states when searching
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
    }

    searchBtn.addEventListener('click', searchWebsites);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchWebsites();
        }
    });

    // Category switching functionality
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update tab states
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter websites
            filterByCategory(category);
        });
    });

    // Theme toggle functionality
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        // Change icon
        if (document.body.classList.contains('dark-theme')) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Save theme preference in local storage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggleBtn.addEventListener('click', function() {
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Initialize card effects
    function addCardHoverEffects() {
        const cards = document.querySelectorAll('.site-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Animation handled by CSS transitions
            });
            card.addEventListener('mouseleave', function() {
                // Animation handled by CSS transitions
            });
        });
    }

    // Initialize card effects
    // addCardHoverEffects(); // This will be called after the loader is hidden

    // Re-add card effects when DOM changes
    const observer = new MutationObserver(function() {
        addCardHoverEffects();
    });
    
    observer.observe(sitesContainer, { childList: true });
    
    // Add CSS class for initial view mode
    sitesContainer.classList.add('grid-view');
});