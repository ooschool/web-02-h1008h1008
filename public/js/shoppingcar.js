
document.addEventListener("DOMContentLoaded", function () {
    function handleQuantity(itemElement) {
        const quantityElement = itemElement.querySelector('.Number');
        const iconpElements = itemElement.querySelectorAll(".Iconp");
        const iconmElements = itemElement.querySelectorAll(".Iconm");
        function updateQuantity(num) {
            var buttons = document.querySelectorAll(".Iconm");
            buttons.forEach(function(button) {
                button.addEventListener("click", function() {
                    num = parseInt(num, 10);
                    quantity = productDatalist[0].quantity;
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
                
                        itemElement.remove();
                        return;
                    }
                });
            });
        }
        
        iconpElements.forEach((iconpElement, index) => {
            iconpElement.addEventListener('click', () => {
            var num = iconpElement.getAttribute("value");
            productDatalist[num].quantity += 1;
            quantity = productDatalist[num].quantity;
            quantityElement.textContent = quantity;
            updateTotalPrice();
            });
        });
        
        iconmElements.forEach((iconmElement, index) => {
            iconmElement.addEventListener('click', () => {
            var num = iconmElement.getAttribute("value");
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
                return;
                }
            }
            });
        });
        updateQuantity();
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
    const itemElements = document.querySelectorAll('.ItemInBag');
    
    itemElements.forEach((itemElement) => {
        handleQuantity(itemElement);
        updateTotalPrice();
    });
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
    function renderProducts() {
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
    renderProducts();
});