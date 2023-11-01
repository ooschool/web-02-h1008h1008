document.getElementById('resetbtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    const emailaddress = document.getElementById('emailaddress').value;
    
    fetch('/forget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailaddress }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
  