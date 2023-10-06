console.log("Who's your datty?");


console.log('loggin out');

const logout = async function () {
  console.log("maybe this will log me out?");
  
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/login');
      console.log('loggin out too');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#logout').addEventListener('click', logout);

  