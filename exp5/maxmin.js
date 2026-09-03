let students = [];

// Helper to update the UI status text
function updateStatus() {
    document.getElementById('statusText').innerText = `${students.length} student(s) currently stored.`;
}

// Helper to clear input fields after adding
function clearInputs() {
    document.getElementById('studentName').value = '';
    document.getElementById('studentPrn').value = '';
    document.getElementById('studentMarks').value = '';
}

// Helper to extract student data from inputs
function getStudentFromInputs() {
    const name = document.getElementById('studentName').value.trim();
    const prn = parseInt(document.getElementById('studentPrn').value);
    const marks = parseFloat(document.getElementById('studentMarks').value);

    if (!name || isNaN(prn) || isNaN(marks)) {
        alert("Please enter valid student details (Name, PRN, and Marks).");
        return null;
    }

    return { name, prn, marks };
}

// 1. Add Student (push / unshift)
function addStudent(method) {
    const student = getStudentFromInputs();
    if (!student) return;

    if (method === 'push') {
        students.push(student);
    } else if (method === 'unshift') {
        students.unshift(student);
    }

    updateStatus();
    clearInputs();
}

// 2. Remove Student (pop / shift)
function removeStudent(method) {
    if (students.length === 0) {
        alert("No students to remove.");
        return;
    }

    let removed;
    if (method === 'pop') {
        removed = students.pop();
    } else if (method === 'shift') {
        removed = students.shift();
    }

    updateStatus();
    console.log("Removed Student:", removed);
}

// 3. Check Array in Console
function checkArray() {
    console.log("Current Students Array:", students);
}

// 4. Analyze Student Performance
function analyzePerformance() {
    if (students.length === 0) {
        document.getElementById('topperName').innerText = '-';
        document.getElementById('lowestName').innerText = '-';
        alert("Add some students to analyze.");
        return;
    }

    let maxMarksStudent = students[0];
    let minMarksStudent = students[0];

    // Iterating to find max and min marks
    for (let i = 1; i < students.length; i++) {
        if (students[i].marks > maxMarksStudent.marks) {
            maxMarksStudent = students[i];
        }
        if (students[i].marks < minMarksStudent.marks) {
            minMarksStudent = students[i];
        }
    }

    // Update the UI with results
    document.getElementById('topperName').innerText = maxMarksStudent.name;
    document.getElementById('lowestName').innerText = minMarksStudent.name;
}