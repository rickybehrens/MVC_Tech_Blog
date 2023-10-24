// Define a function to handle the form submission for editing a post
const editFormHandler = async function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Extract the values for the updated post title, post content, and post ID
  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('input[name="post-content"]').value;
  const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];

  // Send a PUT request to update the post with the specified ID
  const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT', // HTTP method for the request
      body: JSON.stringify({ // Data to send in JSON format (title and post_content)
          title,
          post_content
      }),
      headers: {
          'Content-Type': 'application/json' // Set the request content type to JSON
      }
  });
  
  if (response.ok) { // Check if the response status is OK (2xx status code)
      // Redirect to the dashboard page after editing the post
      document.location.replace('/dashboard/');
  } else {
      // Display an alert with the response status text if there is an error
      alert(response.statusText);
  }
}

// Add an event listener to the edit post form to call the editFormHandler function on form submission
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
