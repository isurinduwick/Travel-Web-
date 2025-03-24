
// Mobile menu toggle
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Form validation and handling
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    const destination = document.getElementById('destination').value;
    const arrivalDate = document.getElementById('arrival-date').value;
    const departureDate = document.getElementById('departure-date').value;
    
    if (!destination || !arrivalDate || !departureDate) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check if departure date is after arrival date
    if (new Date(departureDate) <= new Date(arrivalDate)) {
        alert('Departure date must be after arrival date');
        return;
    }
    
    // In a real application, you would send this data to a server
    alert('Form submitted successfully! Redirecting to payment page...');
    // Redirect to payment page or show payment form
    // window.location.href = 'payment.html';
});

// Dynamic price calculation
const updatePrice = () => {
    const basePrice = 1200; // Base price for 2 adults
    let totalPrice = basePrice;
    
    // Add accommodation upgrade if selected
    const accommodation = document.getElementById('accommodation').value;
    if (accommodation === 'superior') totalPrice += 300;
    if (accommodation === 'deluxe') totalPrice += 600;
    if (accommodation === 'boutique') totalPrice += 450;
    
    // Add airport transfer if selected
    if (document.getElementById('airport-transfer').checked) {
        totalPrice += 30;
    }
    
    // Add private guide if selected
    if (document.getElementById('private-guide').checked) {
        // Calculate number of days
        const arrivalDate = new Date(document.getElementById('arrival-date').value);
        const departureDate = new Date(document.getElementById('departure-date').value);
        
        if (!isNaN(arrivalDate.getTime()) && !isNaN(departureDate.getTime())) {
            const days = Math.ceil((departureDate - arrivalDate) / (1000 * 60 * 60 * 24));
            totalPrice += 50 * days;
        }
    }
    
    // Add photography package if selected
    if (document.getElementById('photography').checked) {
        totalPrice += 120;
    }
    
    // Update the price display
    document.querySelector('.total-value').textContent = '$' + totalPrice;
};

// Add event listeners to form elements to update price
document.getElementById('accommodation').addEventListener('change', updatePrice);
document.getElementById('arrival-date').addEventListener('change', updatePrice);
document.getElementById('departure-date').addEventListener('change', updatePrice);
document.getElementById('airport-transfer').addEventListener('change', updatePrice);
document.getElementById('private-guide').addEventListener('change', updatePrice);
document.getElementById('photography').addEventListener('change', updatePrice);
