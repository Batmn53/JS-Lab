// vehicle.js

function validateVehicle() {
    const inputField = document.getElementById('reg-number');
    let regNo = inputField.value.trim().toUpperCase();
    const resultDiv = document.getElementById('result');
    
    if (regNo === '') {
        resultDiv.className = 'result invalid';
        resultDiv.innerText = "Please enter a registration number.";
        resultDiv.style.display = 'block';
        return;
    }
    
    // Regular expression for standard Indian vehicle registration
    // Matches patterns like: MH 01 AB 1234, MH01AB1234, MH 1 A 1234, etc.
    const regex = /^[A-Z]{2}[ -]?[0-9]{1,2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$/;
    
    if (regex.test(regNo)) {
        resultDiv.className = 'result valid';
        resultDiv.innerText = `"${regNo}" is a VALID registration number!`;
    } else {
        resultDiv.className = 'result invalid';
        resultDiv.innerText = `"${regNo}" is INVALID. Expected format: XX 00 XX 0000`;
    }
    
    resultDiv.style.display = 'block';
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        validateVehicle();
    }
}
