// Define a function to handle user signup form submission
const signupFormHandler = async function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get user inputs for username, email, and password
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
      // Send a POST request to the user creation API endpoint
      const response = await fetch('/api/users', {
          method: 'post', // Use POST method for the request
          body: JSON.stringify({
              username,
              email,
              password
          }),
          headers: { 'Content-Type': 'application/json' } // Set the request content type to JSON
      });

      // Check the response status
      if (response.ok) {
          console.log('success'); // Log a success message to the console
          document.location.replace('/dashboard'); // Redirect to the dashboard page
      } else {
          // Display an alert with the response status text if there is an error
          alert(response.statusText);
      }
  }
}

// Add an event listener to the signup form to call the signupFormHandler function on form submission
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
