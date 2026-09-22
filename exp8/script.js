document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const resetBtn = document.getElementById('resetBtn');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    // Clear custom validity on input to allow the user to type
    emailInput.addEventListener('input', () => emailInput.setCustomValidity(''));
    phoneInput.addEventListener('input', () => phoneInput.setCustomValidity(''));

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Email validation (format checking)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.setCustomValidity('Please enter a valid email address.');
            emailInput.reportValidity();
            return;
        }

        // Phone validation (allows 10 digits with optional hyphens/spaces/parens)
        const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            phoneInput.setCustomValidity('Please enter a valid 10-digit phone number (e.g. 123-456-7890).');
            phoneInput.reportValidity();
            return;
        }
        
        // Collect form data
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        
        // Handling checkboxes (multiple values)
        userData.goals = formData.getAll('goals');

        console.log('Registration Submitted:', userData);

        // Simulate API call or processing delay
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Hide form and show success message
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
            
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 800);
    });

    resetBtn.addEventListener('click', () => {
        // Reset form fields
        form.reset();
        
        // Hide success message and show form
        successMessage.classList.add('hidden');
        form.classList.remove('hidden');
        
        // Scroll back to top of form
        window.scrollTo({
            top: form.offsetTop - 100,
            behavior: 'smooth'
        });
    });
});
