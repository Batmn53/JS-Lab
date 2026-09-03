document.getElementById('process-btn').addEventListener('click', function() {
    const text = document.getElementById('string-input').value;

    // 1. Reversed String
    const reversed = text.split('').reverse().join('');
    document.getElementById('out-reversed').innerText = reversed;

    // 2. Number of Words
    const wordsArray = text.trim() ? text.replace(/[.,]/g, '').trim().split(/\s+/) : [];
    document.getElementById('out-words').innerText = wordsArray.length;

    // 3. Number of Vowels
    const vowelsArray = text.match(/[aeiouAEIOU]/g) || [];
    document.getElementById('out-vowel-count').innerText = vowelsArray.length;

    // 4. Vowels Found
    // Image 2 looks like it joins them with a comma and space
    document.getElementById('out-vowels-found').innerText = vowelsArray.length > 0 ? vowelsArray.join(', ') : 'None';
});
