
document.addEventListener("DOMContentLoaded", function () {
    var productDatalist;
    function handleQuantity(itemElement) {
        const quantityElement = itemElement.querySelector('.Number');
        const iconpElements = itemElement.querySelectorAll(".Iconp");
        const iconmElements = itemElement.querySelectorAll(".Iconm");
        
        iconpElements.forEach((iconpElement, index) => {
            iconpElement.addEventListener('click', () => {
            let num = iconpElement.getAttribute("value");
            num = productDatalist.findIndex(product => product.productindex === num);
            productDatalist[num].quantity += 1;
            quantity = productDatalist[num].quantity;
            quantityElement.textContent = quantity;
            updateTotalPrice();
            updateProducts(productDatalist)
            });
        });
        
        iconmElements.forEach((iconmElement, index) => {
            iconmElement.addEventListener('click', () => {
                
            let num = iconmElement.getAttribute("value");
            num = productDatalist.findIndex(product => product.productindex === num);
            if (productDatalist[num].quantity > 0) {
                productDatalist[num].quantity -= 1;
                quantity = productDatalist[num].quantity;
                quantityElement.textContent = quantity;
                if (num >= 0 && num < productDatalist.length && quantity == 0) {
                    productDatalist[num].shoppingtag = "0";
                    const templates = Handlebars.compile(sources);
            
                    const containers = document.querySelector('.shopbag'); 
                    if (containers) {
                        containers.innerHTML = '';
                        productDatalist.forEach((productData) => {
                        const shoppingHTML = templates({ productDatalist: [productData] }); 
                        containers.innerHTML += shoppingHTML; 
                        });
                    } else {
                        console.error("Container element not found");
                    }
                    updateTotalPrice();
                    itemElement.remove();
                }
                updateProducts(productDatalist)
                return;
            }
            });
        });
    }   
    function updateTotalPrice() {
        const totalpriceElement = document.querySelector('.totalprice');
        let totalPrice = 0;
        productDatalist.forEach((productData) => {
            const price = parseFloat(productData.productPrice.replace('$', '').trim());
            const quantity = productData.quantity;
            const subtotal = price * quantity;
            totalPrice += subtotal;
        });
        const formattedTotalPrice = '$ ' + totalPrice.toFixed(2);
        totalpriceElement.textContent = formattedTotalPrice;
    }
    function renderProducts() {
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
        if (containers) {
            containers.innerHTML = '';  
            productDatalist.forEach((productData) => {
                const shoppingHTML = templates({ productDatalist: [productData] });
                containers.innerHTML += shoppingHTML;
            });
        } else {
            console.error("Container element not found");
        }
    }
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
            console.log('Full Response:', data);  
            console.log(data.message); 
        } catch (error) {
            console.error("There was an error updating the product data on the server:", error);
        }
    }
    fetch('/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => { 
            productDatalist = data.products; 
            productDatalist = productDatalist.filter(product => product.shoppingtag === '1')
            const itemElements = document.querySelectorAll('.ItemInBag');
    
            itemElements.forEach((itemElement) => {
                handleQuantity(itemElement);
                updateTotalPrice();
            });
            
            renderProducts();
        })
        .catch(error => {
        console.error("There was an error fetching the product data:", error);
        });
    
});