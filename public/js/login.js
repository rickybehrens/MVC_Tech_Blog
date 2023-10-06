const loginFormHandler = async function (event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        document.location.replace('/dashboard');
        console.log('you are logged in');
      } else {
        alert(response.statusText);
      }
    }
  }

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
