// External JavaScript (index.js)

const PRICES = {
    coffee: 3.00,
    tea: 2.00,
    sandwich: 5.00,
    cake: 4.00
};

const TAX_RATE = 0.10;

// Function called via inline event listeners in HTML
function calculateTotal() {
    // We are avoiding querySelectors as requested. Reading values by IDs directly.
    let qtyCoffee = parseInt(document.getElementById('qty-coffee').value) || 0;
    let qtyTea = parseInt(document.getElementById('qty-tea').value) || 0;
    let qtySandwich = parseInt(document.getElementById('qty-sandwich').value) || 0;
    let qtyCake = parseInt(document.getElementById('qty-cake').value) || 0;

    let subtotal = (qtyCoffee * PRICES.coffee) + 
                   (qtyTea * PRICES.tea) + 
                   (qtySandwich * PRICES.sandwich) + 
                   (qtyCake * PRICES.cake);
    
    let tax = subtotal * TAX_RATE;
    let total = subtotal + tax;

    // Update DOM via getElementById
    document.getElementById('subtotal').innerText = "$" + subtotal.toFixed(2);
    document.getElementById('tax').innerText = "$" + tax.toFixed(2);
    document.getElementById('total').innerText = "$" + total.toFixed(2);
}

// Function called via inline event listener to reset the calculator
function resetForm() {
    document.getElementById('qty-coffee').value = 0;
    document.getElementById('qty-tea').value = 0;
    document.getElementById('qty-sandwich').value = 0;
    document.getElementById('qty-cake').value = 0;
    
    // Recalculate to set totals to 0
    calculateTotal();
}
