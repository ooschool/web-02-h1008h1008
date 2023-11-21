document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("registerBtn")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const emailaddress = document.getElementById("emailaddress").value;
      const password = document.getElementById("pwd").value;
      const confirmPassword = document.getElementById("conpwd").value;

      if (password == confirmPassword) {
        fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailaddress: emailaddress,
            password: password,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(response);
            return response.json();
          })
          .then((data) => {
            alert("Register success");
            window.location.href = "/login";
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Passwords do not match!");
        return Promise.reject(new Error("Passwords do not match"));
      }
    });
});
