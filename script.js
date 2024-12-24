// Open the modal with the clicked image
function openModal(imgSrc) {
    const modal = document.getElementById('myModal');
    const modalImg = document.getElementById('modal-img');
    modal.style.display = "block";
    modalImg.src = imgSrc;
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = "none";
}

// Cart and reservation functions
let total = 0;

function addToCart(room, price) {
    const checkinDate = document.getElementById('checkin-date').value;
    const checkoutDate = document.getElementById('checkout-date').value;
    
    if (!checkinDate || !checkoutDate) {
        alert('Please select both check-in and check-out dates.');
        return;
    }

    // Calculate the number of days
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const diffTime = checkout - checkin;
    const numDays = diffTime / (1000 * 3600 * 24);  // Convert milliseconds to days
    
    if (numDays <= 0) {
        alert('Check-out date must be after check-in date.');
        return;
    }

    const totalRoomPrice = price * numDays;

    // Add to cart table
    const table = document.getElementById('cart-table').querySelector('tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${room}</td>
        <td>${totalRoomPrice.toFixed(2)} EUR for ${numDays} day(s)</td>
        <td><button class="remove-btn" onclick="removeFromCart(this, ${totalRoomPrice})">Remove</button></td>
    `;
    table.appendChild(row);

    // Update the total
    total += totalRoomPrice;
    document.getElementById('total-price').textContent = `Total: ${total.toFixed(2)} EUR`;
}

function removeFromCart(button, roomTotalPrice) {
    const row = button.parentElement.parentElement;
    row.remove();
    total -= roomTotalPrice;
    document.getElementById('total-price').textContent = `Total: ${total.toFixed(2)} EUR`;
}

function reserveRooms() {
    const checkinDate = document.getElementById('checkin-date').value;
    const checkoutDate = document.getElementById('checkout-date').value;
    const numPeople = document.getElementById('num-people').value;

    if (!checkinDate || !checkoutDate) {
        alert('Please select both check-in and check-out dates.');
        return;
    }

    alert(`Reservation confirmed for ${numPeople} people from ${checkinDate} to ${checkoutDate} with total price: ${total.toFixed(2)} EUR!`);
}

document.getElementById('checkin-date').setAttribute('min', new Date().toISOString().split('T')[0]);

document.getElementById('checkin-date').addEventListener('change', function() {
    const checkinDate = this.value;
    const checkoutInput = document.getElementById('checkout-date');
    checkoutInput.setAttribute('min', checkinDate);
});
