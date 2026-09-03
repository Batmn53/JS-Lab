document.getElementById('processBtn').addEventListener('click', function() {
    const text = document.getElementById('paragraph').value;
    const email = document.getElementById('email').value;

    // 1. Words
    // Replace punctuation with spaces, then split, filter empty strings
    const wordsArray = text.trim() ? text.replace(/[.,]/g, '').trim().split(/\s+/) : [];
    document.getElementById('res-words').innerText = wordsArray.join(', ');

    // 2. Vowels
    const vowelsArray = text.match(/[aeiouAEIOU]/g) || [];
    const vowelsStr = vowelsArray.join(', ');
    const vowelCount = vowelsArray.length;
    
    // In image 1, it looks like "i, o, e, ... | Vowel Count: 9" or similar.
    // If there are vowels, format it properly, else show 0.
    if (vowelsArray.length > 0) {
        document.getElementById('res-vowels').innerText = `${vowelsStr} | Vowel Count: ${vowelCount}`;
    } else {
        document.getElementById('res-vowels').innerText = `Vowel Count: 0`;
    }

    // 3. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
        document.getElementById('res-email').innerText = '';
    } else if (emailRegex.test(email)) {
        document.getElementById('res-email').innerText = 'Valid email address';
    } else {
        document.getElementById('res-email').innerText = 'Invalid email address';
    }

    // 4. Reversed Paragraph
    const reversed = text.split('').reverse().join('');
    document.getElementById('res-reversed').innerText = reversed;
});
