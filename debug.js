// Debug script to check page loading
console.log('Debug script loaded');

// Check if document is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded');
    
    // Log information about loaded scripts
    const scripts = document.querySelectorAll('script');
    console.log(`Number of scripts loaded: ${scripts.length}`);
    scripts.forEach((script, index) => {
        console.log(`Script ${index + 1}: ${script.src || 'Inline script'}`);
    });
    
    // Log information about loaded stylesheets
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    console.log(`Number of stylesheets loaded: ${stylesheets.length}`);
    stylesheets.forEach((stylesheet, index) => {
        console.log(`Stylesheet ${index + 1}: ${stylesheet.href}`);
    });
    
    // Check if key elements exist
    const elements = {
        'startScreen': document.getElementById('start-screen'),
        'startButton': document.getElementById('start-button'),
        'quizContainer': document.getElementById('quiz-container'),
        'resultsContainer': document.getElementById('results-container'),
        'progressBar': document.getElementById('progress-bar')
    };
    
    console.log('Key element check:');
    for (const [name, element] of Object.entries(elements)) {
        console.log(`${name}: ${element ? 'Found' : 'NOT FOUND'}`);
    }
}); 