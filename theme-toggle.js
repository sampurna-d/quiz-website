// JavaScript to toggle dark mode
document.addEventListener('DOMContentLoaded', function() {
    // Create dark mode toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙'; // Moon emoji for dark mode toggle
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    themeToggle.setAttribute('title', 'Toggle dark mode');
    
    // Add to header
    const header = document.querySelector('header');
    header.appendChild(themeToggle);
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Apply theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '☀️'; // Sun emoji for light mode toggle
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update button icon
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '☀️'; // Sun emoji for light mode toggle
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '🌙'; // Moon emoji for dark mode toggle
            localStorage.setItem('theme', 'light');
        }
    });
});
