// Clock Script to display real-time clocks for multiple timezones

// Function to update clocks every second
function updateClocks() {
    const clocks = document.querySelectorAll('.clock');
    clocks.forEach(clock => {
        const timezone = clock.getAttribute('data-timezone');
        const now = new Date().toLocaleString('en-US', { timeZone: timezone });
        clock.innerText = formatTime(new Date(now));
    });
}

// Function to format time based on user preference (12/24 hour)
function formatTime(date) {
    const is24Hour = localStorage.getItem('24HourFormat') === 'true';
    if (is24Hour) {
        return date.toLocaleTimeString('en-US', { hour12: false });
    } else {
        return date.toLocaleTimeString('en-US', { hour12: true });
    }
}

// Event listener for timezone selection changes
document.querySelector('#timezoneSelect').addEventListener('change', (event) => {
    const selectedTimezone = event.target.value;
    localStorage.setItem('selectedTimezone', selectedTimezone);
    updateClocks();
});

// Event listener for format toggle
document.querySelector('#toggleFormat').addEventListener('click', () => {
    const is24Hour = localStorage.getItem('24HourFormat') === 'true';
    localStorage.setItem('24HourFormat', !is24Hour);
    updateClocks();
});

// Initialize clocks on page load
function init() {
    const selectedTimezone = localStorage.getItem('selectedTimezone') || 'UTC';
    document.querySelector('#timezoneSelect').value = selectedTimezone;
    updateClocks();
    setInterval(updateClocks, 1000);
}

// Modal management
const modal = document.getElementById('myModal');
const modalBtn = document.getElementById('modalBtn');
const closeModal = document.getElementsByClassName('close')[0];

modalBtn.onclick = () => { modal.style.display = 'block'; };
closeModal.onclick = () => { modal.style.display = 'none'; };

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Call init on load
window.onload = init;