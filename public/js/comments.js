// Define a function to handle the comments form submission
const commentsFormHandler = async function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  
  // Get the value of the comments text area
  const comments_text = document.querySelector('textarea[name="comments-body"]').value.trim();

  // Extract the post_id from the URL
  const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  if (comments_text) {
      // Send a POST request to create a new comment using fetch
      const response = await fetch('/api/comments', {
          method: 'POST', // HTTP method for the request
          body: JSON.stringify({ // Data to send in JSON format
              post_id,
              comments_text
          }),
          headers: {
              'Content-Type': 'application/json' // Set the request content type to JSON
          }
      });

      if (response.ok) { // Check if the response status is OK (2xx status code)
          // Reload the page to display the new comment
          document.location.reload();
      } else {
          // Display an alert with the response status text if there is an error
          alert(response.statusText);
      }
  }
}

// Add an event listener to the comments form to call the commentsFormHandler function when submitted
document.querySelector('.comments-form').addEventListener('submit', commentsFormHandler);
