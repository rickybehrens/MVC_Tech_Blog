// Define a function to handle the new post form submission
const newFormHandler = async function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Get the values of the post title and post content input fields
  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('input[name="post-content"]').value;
  
  // Send a POST request to create a new post using fetch
  const response = await fetch(`/api/posts`, {
      method: 'POST', // HTTP method for the request
      body: JSON.stringify({ // Data to send in JSON format
          title,
          post_content
      }),
      headers: {
          'Content-Type': 'application/json' // Set the request content type to JSON
      }
  });
  
  if (response.ok) { // Check if the response status is OK (2xx status code)
      // Redirect to the dashboard page after creating the new post
      document.location.replace('/dashboard');
  } else {
      // Display an alert with the response status text if there is an error
      alert(response.statusText);
  }
}

// Add an event listener to the new post form to call the newFormHandler function when submitted
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
