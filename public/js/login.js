document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginbtn').addEventListener('click', function(event) {
        event.preventDefault(); 

        const emailaddress = document.getElementById('emailaddress').value;
        const password = document.getElementById('pwd').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailaddress: emailaddress,
                password: password,
            }), 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
        })
        
        .catch((error) => {
            console.log(error);
        });
    });
});
