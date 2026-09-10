document.addEventListener('DOMContentLoaded', () => {
    // Populate days
    const daySelect = document.getElementById('bday-day');
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    // Populate years
    const yearSelect = document.getElementById('bday-year');
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1950; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    // Set default values based on the image
    setTimeout(() => {
        daySelect.value = "11";
        document.getElementById('bday-month').value = "May";
        yearSelect.value = "2006";
    }, 100);

    const form = document.getElementById('registerForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const repassword = document.getElementById('repassword').value;

        if (password !== repassword) {
            alert('Passwords do not match!');
            return;
        }

        alert('Registration successful!');
        form.reset();
    });
});
