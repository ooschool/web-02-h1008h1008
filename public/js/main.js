let isExpanded = false;
let productDatalist = [];
var flag;
Handlebars.registerHelper('eq', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });
document.addEventListener('DOMContentLoaded', function() {
    async function updateProducts(productDataList) {
        try {
            const response = await fetch('/api/update-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productDataList)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Full Response:', data);  // Log the full response from the server
            console.log(data.message);  // Log the confirmation message from the server
        } catch (error) {
            console.error("There was an error updating the product data on the server:", error);
        }
    }
    document.querySelector('.MenuIcon').addEventListener('click', function () {
        if (isExpanded) {
        document.querySelector('.Navbar').style.width = '4rem'; // 将宽度设置为初始宽度
        } else {
        document.querySelector('.Navbar').style.width = '16rem'; // 将宽度扩展
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

            function handleClick() {
            updateProducts(productDatalist);
            }
            if (homeElement) {
            homeElement.addEventListener("click", handleClick);
            }

            if (carElement) {
            carElement.addEventListener("click", handleClick);
            }

            if (checkElement) {
            checkElement.addEventListener("click", handleClick);
            }
        })
        .catch(error => {
        console.error("There was an error fetching the product data:", error);
        });
    
});


    
    
    