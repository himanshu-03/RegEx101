function validateEmail() {
    var email = document.getElementById('email').value;
    var dangerAlert = document.querySelector('.alert-danger1');
    var successAlert = document.querySelector('.alert-success');
    if (email) {
        dangerAlert.style.display = 'none';
    }
    if (!email) {
        dangerAlert.style.display = 'block'; // Display the danger alert
        successAlert.style.display = 'none'; // Hide the success alert
        return; // Exit the function
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.result === 'Valid email address') {
                    document.querySelector('.alert-success').style.display = 'block';
                    document.querySelector('.alert-danger').style.display = 'none';
                } else {
                    document.querySelector('.alert-success').style.display = 'none';
                    document.querySelector('.alert-danger').style.display = 'block';
                }
            } else {
                console.error('Error:', xhr.status);
            }
        }
    };
    xhr.open('POST', '/validate_email', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('email=' + encodeURIComponent(email));
}
    
function closeAlert(alertId) {
    var alertElement = document.getElementById(alertId);
    alertElement.style.display = 'none';
  }
  
function resetEmailField() {
    document.getElementById('email').value = ''; // Clear the value of the email field
    document.getElementById('alert-success').style.display = 'none';
    document.getElementById('alert-danger').style.display = 'none';
    document.getElementById('alert-danger1').style.display = 'none';
}
  