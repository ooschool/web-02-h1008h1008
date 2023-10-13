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
        .then(data => {  // This will log the fetched product data
            productDatalist = data.products; // Update the productDatalist variable
            console.log(data.flag)
            flag = data.flag;
            let sources = ""
            if (flag === 1) {
                // Replace the HTML content
                var bagArea = document.querySelector('.BagArea');
                if (bagArea) {
                    bagArea.innerHTML = `
                    <div class="BagArea w-80 h-screen px-2 pt-16 pb-2 flex-col justify-start items-center gap-2.5 inline-flex right-0">
                    <div class="Title p-2 justify-start items-start gap-2.5 inline-flex">
                    <div class="Bag text-stone-900 text-4xl font-medium">Bag</div>
                    </div>
                    <ul class="shopbag p-2 self-stretch justify-start items-center gap-4 inline-flex flex-wrap">
                    </ul>
                    <div class="Cta w-80 h-32 p-4 flex-col justify-center items-center gap-8 inline-flex">
                    <div class="Total justify-start items-start gap-4 inline-flex">
                        <div class="BagTotal text-stone-900 text-xl font-medium font-['Cabin']">Bag Total:</div>
                        <div class="totalprice text-stone-900 text-xl font-medium font-['Cabin']">$ 5,849.93   </div>
                    </div>
                    <a href="./payment.html">
                        <div class="Button px-6 py-2 bg-stone-900 rounded-2xl justify-center items-center gap-2 inline-flex">
                        <div class="Icon w-6 h-6 relative">
                            <div class="Center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="Bi bi-cart-plus" viewBox="0 0 16 16">
                                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                            </div>
                        </div>
                        <div class="Button text-white text-xl font-medium" id="check">Check Out</div>
                        
                        </div>
                    </a>
                    </div>
                </div>
                    `;
                }

            }
            sources = `{{#each productDatalist}}
                {{#eq shoppingtag "1"}}
                <li class="BagItem p-2 bg-white rounded-xl justify-start items-center gap-4 flex">
                    <div class="ProductImage w-16 h-16 justify-center items-center flex">
                    <img class="Image w-16 h-16" src="{{ imageUrlsquare }}" />
                    </div>
                </li>
                {{/eq}}
            {{/each}}`;

            const templates = Handlebars.compile(sources);
            const containers = document.querySelector('.shopbag');

            // Function to render the products
            function renderProducts() {
                if (containers) {
                    containers.innerHTML = '';  // Clear the container first
                    productDatalist.forEach((productData) => {
                        const shoppingHTML = templates({ productDatalist: [productData] });
                        containers.innerHTML += shoppingHTML;
                    });
                } else {
                    console.error("Container element not found");
                }
            }

            // Initial rendering of products
            renderProducts();
            if(flag == 1){
                function handleQuantity(itemElement) {
                    // Get the Quantity element within the specific item
                    const quantityElement = itemElement.querySelector('.Number');
                  
                    // Get the Iconp and Iconm elements within the specific item
                    const iconpElements = itemElement.querySelectorAll(".Iconp");
                    const iconmElements = itemElement.querySelectorAll(".Iconm");
                  
                    // Function to update the quantity and the UI
                    function updateQuantity(num) {
                      // Check if the quantity is zero and remove the item if needed
                        var buttons = document.querySelectorAll(".Iconm");
                        buttons.forEach(function(button) {
                            button.addEventListener("click", function() {
                                // Access the value attribute of the clicked button
                                num = parseInt(num, 10);
                                quantity = productDatalist[0].quantity;
                                if (num >= 0 && num < productDatalist.length && quantity == 0) {
                                // 将产品的 shoppingtag 属性更新为 1
                                    productDatalist[num].shoppingtag = "0";
                                    const templates = Handlebars.compile(sources);
                            
                                    // Get the container where product cards will be appended (change the selector)
                                    const containers = document.querySelector('.shopbag'); // Update the selector to target the correct container
                                    if (containers) {
                                        containers.innerHTML = '';
                                        // Iterate over each product data item and render the template for each
                                        productDatalist.forEach((productData) => {
                                        const shoppingHTML = templates({ productDatalist: [productData] }); // Wrap in an array to match the template structure
                                        containers.innerHTML += shoppingHTML; // Append each product card to the container
                                        });
                                    } else {
                                        console.error("Container element not found");
                                    }
                            
                                    // 输出一条消息以确认已更新
                                    itemElement.remove();
                                    return;
                                }
                            });
                        });
                    }
                  
                    // Event listener for Iconp (add)
                    iconpElements.forEach((iconpElement, index) => {
                      iconpElement.addEventListener('click', () => {
                        var num = iconpElement.getAttribute("value");
                        productDatalist[num].quantity += 1;
                        quantity = productDatalist[num].quantity;
                        quantityElement.textContent = quantity;
                        updateTotalPrice();
                        // Remove the event listener to prevent multiple clicks
                      });
                    });
                  
                    // Event listener for Iconm (subtract)
                    iconmElements.forEach((iconmElement, index) => {
                      iconmElement.addEventListener('click', () => {
                        var num = iconmElement.getAttribute("value");
                        if (productDatalist[num].quantity > 0) {
                          productDatalist[num].quantity -= 1;
                          quantity = productDatalist[num].quantity;
                          quantityElement.textContent = quantity;
                          if (num >= 0 && num < productDatalist.length && quantity == 0) {
                            // 将产品的 shoppingtag 属性更新为 1
                            productDatalist[num].shoppingtag = "0";
                            const templates = Handlebars.compile(sources);
                  
                            // Get the container where product cards will be appended (change the selector)
                            const containers = document.querySelector('.shopbag'); // Update the selector to target the correct container
                            if (containers) {
                              containers.innerHTML = '';
                              // Iterate over each product data item and render the template for each
                              productDatalist.forEach((productData) => {
                                const shoppingHTML = templates({ productDatalist: [productData] }); // Wrap in an array to match the template structure
                                containers.innerHTML += shoppingHTML; // Append each product card to the container
                              });
                            } else {
                              console.error("Container element not found");
                            }
                            updateTotalPrice();
                            // 输出一条消息以确认已更新
                            itemElement.remove();
                            return;
                          }
                        }
                      });
                    });
                  
                    // Initial update
                    updateQuantity();
                }
                  
                function updateTotalPrice() {
                // Get the total price element
                    const totalpriceElement = document.querySelector('.totalprice');
                    
                    // Initialize a variable to store the total price
                    let totalPrice = 0;
                    
                    // Loop through the product data and calculate the total price
                    productDatalist.forEach((productData) => {
                        // Parse the product price and quantity as numbers
                        const price = parseFloat(productData.productPrice.replace('$', '').trim());
                        const quantity = productData.quantity;
                    
                        // Calculate the subtotal for this product
                        const subtotal = price * quantity;
                    
                        // Add the subtotal to the total price
                        totalPrice += subtotal;
                    });
                    
                    // Format the total price with two decimal places and the "$" symbol
                    const formattedTotalPrice = '$ ' + totalPrice.toFixed(2);
                    
                    // Update the content of the total price element
                    totalpriceElement.textContent = formattedTotalPrice;
                }
                // Get all the ItemInBag elements
                const itemElements = document.querySelectorAll('.ItemInBag');
                
                // Initialize quantity handling for each item
                itemElements.forEach((itemElement) => {
                handleQuantity(itemElement);
                updateTotalPrice();
                });
                
            }
            else{
                var buttons = document.querySelectorAll(".Button");
                buttons.forEach(function (button) {
                    button.addEventListener("click", function () {
                        var num = button.getAttribute("value");
                        if (num >= 0 && num < productDatalist.length) {
                            // Update the shoppingtag property of the product
                            productDatalist[num].shoppingtag = "1";
                            // After updating the product data, re-render the products
                            renderProducts();
                            console.log(`Product ${num + 1} shoppingtag updated to 1`);
                        } else {
                            console.error("Invalid product index");
                        }
                    });
                });
            }
            renderProducts();
            var homeElement = document.getElementById("home");
            var carElement = document.getElementById("car");
            var checkElement = document.getElementById("check");

            function handleClick() {
            updateProducts(productDatalist);
            }

            // Add a click event listener to any of the elements
            if (homeElement) {
            homeElement.addEventListener("click", handleClick);
            }

            if (carElement) {
            carElement.addEventListener("click", handleClick);
            }

            if (checkElement) {
            checkElement.addEventListener("click", handleClick);
            }

        // You can then update your UI or perform other actions with the fetched data
        })
        .catch(error => {
        console.error("There was an error fetching the product data:", error);
        });
    
});
// You can set this to the actual value of your 'flag' variable

// Check the value of 'flag'


    
    
    