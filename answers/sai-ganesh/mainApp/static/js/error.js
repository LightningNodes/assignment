function showPopup() {
    document.getElementById("error-popup").style.display = "block";
}

// Function to close the error popup
function closePopup() {
    document.getElementById("error-popup").style.display = "none";
}

// Show popup on loading the page
window.onload = function() {
    closePopup();
};