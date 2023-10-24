// Define a function to handle the form submission for user login
const loginFormHandler = async function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Extract the email and password values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the login API endpoint with the user's email and password
    const response = await fetch('/api/users/login', {
      method: 'post', // HTTP method for the request
      body: JSON.stringify({ // Data to send in JSON format (email and password)
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' } // Set the request content type to JSON
    });

    if (response.ok) { // Check if the response status is OK (2xx status code)
      console.log('you are logged in'); // Log a message to the console
      // Redirect to the dashboard page after successful login
      document.location.replace('/dashboard');
    } else {
      // Display an alert with the response status text if there is an error
      alert(response.statusText);
    }
  }
}

// Add an event listener to the login form to call the loginFormHandler function on form submission
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
