// Stripe integration for the quiz
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the confirmation page
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId && window.location.pathname.includes('confirmation.html')) {
        verifyPayment(sessionId);
    }
    
    // Add event listener to CTA button if it exists
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', initiateStripeCheckout);
    }
});

// Function to initiate Stripe checkout
async function initiateStripeCheckout() {
    try {
        // Show loading state on button
        const ctaButton = document.getElementById('cta-button');
        const originalText = ctaButton.textContent;
        ctaButton.textContent = 'Processing...';
        ctaButton.disabled = true;
        ctaButton.style.opacity = '0.7';
        
        // Create a checkout session
        const response = await fetch('/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // Any additional data needed for the checkout
                productName: 'Fix Your Broken Window Guide',
                productDescription: 'A comprehensive guide on fixing broken windows',
                amount: 997 // $9.97 in cents
            }),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const session = await response.json();
        
        // For demo purposes, simulate successful payment
        // In production, this would redirect to Stripe
        simulateSuccessfulPayment();
        
        // The code below would be used in production with actual Stripe keys
        /*
        const stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
        stripe.redirectToCheckout({
            sessionId: session.id
        }).then(function (result) {
            if (result.error) {
                console.error(result.error.message);
                alert('There was an error processing your payment. Please try again.');
                ctaButton.textContent = originalText;
                ctaButton.disabled = false;
                ctaButton.style.opacity = '1';
            }
        });
        */
    } catch (error) {
        console.error('Error initiating checkout:', error);
        alert('There was an error initiating the checkout process. Please try again.');
        
        // Reset button state
        const ctaButton = document.getElementById('cta-button');
        ctaButton.textContent = 'Learn how to fix your broken window 🧹';
        ctaButton.disabled = false;
        ctaButton.style.opacity = '1';
    }
}

// Function to simulate successful payment (for demo purposes)
function simulateSuccessfulPayment() {
    // Hide results container
    document.getElementById('results-container').style.display = 'none';
    
    // Create confirmation container if it doesn't exist
    let confirmationContainer = document.getElementById('confirmation-container');
    if (!confirmationContainer) {
        confirmationContainer = document.createElement('div');
        confirmationContainer.id = 'confirmation-container';
        confirmationContainer.className = 'fade-in';
        document.querySelector('main').appendChild(confirmationContainer);
    }
    
    // Show confirmation content
    confirmationContainer.innerHTML = `
        <div class="success-animation">
            <div class="checkmark">✓</div>
        </div>
        <h2 class="result-title">Thank You for Your Purchase!</h2>
        <div class="result-description">
            <p>Your payment has been processed successfully. You can now download your guide on how to fix broken windows.</p>
        </div>
        <div class="download-section">
            <p>Your comprehensive guide to fixing broken windows is ready for download.</p>
            <a href="downloads/fix-broken-window-guide.pdf" class="btn btn-accent cta-button" download>Download Your Guide</a>
            <p class="small-text">If you encounter any issues with your download, please contact our support team.</p>
        </div>
        <div class="additional-info">
            <h3>What's Inside Your Guide</h3>
            <p>This comprehensive guide includes:</p>
            <ul>
                <li>Step-by-step instructions for fixing different types of broken windows</li>
                <li>Tools and materials checklist</li>
                <li>Safety precautions and best practices</li>
                <li>Tips for preventing future window damage</li>
            </ul>
        </div>
        <button id="restart-quiz" class="btn">Take the Quiz Again</button>
    `;
    
    // Add event listener to restart button
    document.getElementById('restart-quiz').addEventListener('click', function() {
        location.reload();
    });
}

// Function to verify payment and enable download
async function verifyPayment(sessionId) {
    try {
        const response = await fetch(`/verify-session/${sessionId}`);
        const result = await response.json();
        
        if (result.success) {
            // Enable download button
            const downloadButton = document.getElementById('download-button');
            if (downloadButton) {
                downloadButton.href = result.downloadUrl;
                downloadButton.classList.remove('disabled');
                downloadButton.textContent = 'Download Your Guide';
                
                // Show success message
                const successMessage = document.getElementById('success-message');
                if (successMessage) {
                    successMessage.style.display = 'block';
                }
            }
        } else {
            // Show error message
            const errorMessage = document.getElementById('error-message');
            if (errorMessage) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = result.message || 'Payment verification failed. Please contact support.';
            }
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        
        // Show error message
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'There was an error verifying your payment. Please contact support.';
        }
    }
}
