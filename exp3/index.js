// index.js

function calculateGrade() {
    const name = document.getElementById('student-name').value.trim();
    const roll = document.getElementById('roll-no').value.trim();
    
    const math = document.getElementById('marks-math').value;
    const science = document.getElementById('marks-science').value;
    const english = document.getElementById('marks-english').value;
    
    const resultDiv = document.getElementById('result-section');
    const errorDiv = document.getElementById('error-message');
    
    // Hide previous results and errors
    resultDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    
    // Validation using if statement
    if (!name || !roll || math === '' || science === '' || english === '') {
        showError("Please fill in all the student details and marks.");
        return;
    }
    
    const marksArray = [parseFloat(math), parseFloat(science), parseFloat(english)];
    
    // Control Structure 1: FOR loop for array validation
    for (let i = 0; i < marksArray.length; i++) {
        // Control Structure 2: IF statement with logical operators
        if (isNaN(marksArray[i]) || marksArray[i] < 0 || marksArray[i] > 100) {
            showError("Invalid marks! Please enter numbers between 0 and 100 for all subjects.");
            return;
        }
    }
    
    // Calculate total using a FOR loop
    let total = 0;
    for (let i = 0; i < marksArray.length; i++) {
        total += marksArray[i];
    }
    
    const percentage = (total / 300) * 100;
    let grade = '';
    
    // Control Structure 3: IF-ELSE IF ladder for determining grade
    if (percentage >= 90) {
        grade = 'A+';
    } else if (percentage >= 80) {
        grade = 'A';
    } else if (percentage >= 70) {
        grade = 'B';
    } else if (percentage >= 60) {
        grade = 'C';
    } else if (percentage >= 50) {
        grade = 'D';
    } else {
        grade = 'F';
    }
    
    // Control Structure 4: SWITCH statement for generating appropriate message
    let message = '';
    switch (grade) {
        case 'A+':
        case 'A':
            message = "Excellent work! Keep it up.";
            break;
        case 'B':
            message = "Good job! You can do even better.";
            break;
        case 'C':
            message = "Fair performance. Need to study harder.";
            break;
        case 'D':
            message = "You just passed. Please focus more on your studies.";
            break;
        case 'F':
            message = "You failed. You must retake the exams.";
            break;
        default:
            message = "Unknown grade.";
    }
    
    // Display results in the UI
    document.getElementById('out-name').innerText = name;
    document.getElementById('out-roll').innerText = roll;
    document.getElementById('out-total').innerText = total + " / 300";
    document.getElementById('out-percentage').innerText = percentage.toFixed(2) + "%";
    document.getElementById('out-grade').innerText = grade;
    document.getElementById('out-message').innerText = message;
    
    // Styling based on grade
    const gradeElement = document.getElementById('out-grade');
    if (grade === 'F') {
        gradeElement.style.color = '#ef4444'; // Red for Fail
    } else {
        gradeElement.style.color = '#10b981'; // Green for Pass
    }
    
    resultDiv.style.display = 'block';
}

function showError(msg) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.innerText = msg;
    errorDiv.style.display = 'block';
}
