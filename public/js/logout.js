// Define a function to handle user logout
const logout = async function () {
  // Send a POST request to the logout API endpoint
  const response = await fetch('/api/users/logout', {
    method: 'post', // HTTP method for the request
    headers: { 'Content-Type': 'application/json' } // Set the request content type to JSON
  });

  if (response.ok) { // Check if the response status is OK (2xx status code)
    // Redirect to the login page after successful logout
    document.location.replace('/login');
  } else {
    // Display an alert with the response status text if there is an error
    alert(response.statusText);
  }
}

// Add an event listener to the logout button to call the logout function on click
document.querySelector('#logout').addEventListener('click', logout);
