// palindrome.js

function checkPalindrome() {
    const inputField = document.getElementById('pal-input');
    const originalText = inputField.value.trim();
    const resultDiv = document.getElementById('result');
    
    if (originalText === '') {
        resultDiv.className = 'result error';
        resultDiv.innerHTML = "Please enter some text.";
        resultDiv.style.display = 'block';
        return;
    }
    
    // Remove non-alphanumeric characters and convert to lower case for comparison
    // This allows phrases like "A man, a plan, a canal: Panama" to work
    const cleanedText = originalText.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    
    // Reverse the cleaned string
    const reversedText = cleanedText.split('').reverse().join('');
    
    if (cleanedText === '') {
         resultDiv.className = 'result error';
         resultDiv.innerHTML = "No valid letters or numbers to check.";
    } else if (cleanedText === reversedText) {
        resultDiv.className = 'result success';
        resultDiv.innerHTML = `<strong>"${originalText}"</strong> is a Palindrome!`;
    } else {
        resultDiv.className = 'result error';
        resultDiv.innerHTML = `<strong>"${originalText}"</strong> is NOT a Palindrome.`;
    }
    
    resultDiv.style.display = 'block';
}

// Support hitting 'Enter' to check
function checkEnter(event) {
    if (event.key === 'Enter') {
        checkPalindrome();
    }
}
