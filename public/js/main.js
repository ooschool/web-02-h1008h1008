let isExpanded = false;
let productDatalist = [];
Handlebars.registerHelper('eq', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.MenuIcon').addEventListener('click', function () {
        if (isExpanded) {
        document.querySelector('.Navbar').style.width = '4rem'; 
        } else {
        document.querySelector('.Navbar').style.width = '16rem'; 
        }
        isExpanded = !isExpanded;
    });
    fetch('/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {  
            productDatalist = data.products; 
            var homeElement = document.getElementById("home");
            var carElement = document.getElementById("car");
            var checkElement = document.getElementById("check");

            // function handleClick() {
            // updateProducts(productDatalist);
            // }
            // if (homeElement) {
            // homeElement.addEventListener("click", handleClick);
            // }

            // if (carElement) {
            // carElement.addEventListener("click", handleClick);
            // }

            // if (checkElement) {
            // checkElement.addEventListener("click", handleClick);
            // }
        })
        .catch(error => {
        console.error("There was an error fetching the product data:", error);
        });
    
});


    
    
    