// Define a function to handle the delete post button click
const deleteFormHandler = async function (event) {
  event.preventDefault(); // Prevent the default link behavior
  
  // Extract the post ID from the current URL
  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];

  // Send a DELETE request to remove the specified post
  const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE', // HTTP method for the request
      body: JSON.stringify({ // Data to send in JSON format (post_id)
          post_id: id
      }),
      headers: {
          'Content-Type': 'application/json' // Set the request content type to JSON
      }
  });
  
  if (response.ok) { // Check if the response status is OK (2xx status code)
      // Redirect to the dashboard page after deleting the post
      document.location.replace('/dashboard/');
  } else {
      // Display an alert with the response status text if there is an error
      alert(response.statusText);
  }
}

// Add an event listener to the delete post button to call the deleteFormHandler function on click
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
