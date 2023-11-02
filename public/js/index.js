document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => { 
            const searchInput = document.getElementById('searchInput');
            productDatalist = data.products; 
            searchInput.addEventListener('keydown', async (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                document.getElementById('myButton').click();

                const searchTerm = searchInput.value;
                console.log(searchTerm)
                const data = { searchTerm };
                console.log(data)
                await fetch('/', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(data),
                  })
                  .then(data => {
                    window.location.href = '/'; 
                  })
                  .catch((error) => {
                      console.log(error);
                  });
              }
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
            var buttons = document.querySelectorAll(".Button");
            buttons.forEach(function (button) {
                button.addEventListener("click", function () {
                    var num = button.getAttribute("value");
                    console.log(productDatalist)
                    if (num >= 0 && num < productDatalist.length) {
                        productDatalist[num].shoppingtag = "1";
                        renderProducts();
                        console.log(`Product ${num + 1} shoppingtag updated to 1`);
                    } else {
                        console.error("Invalid product index");
                    }
                });
            });
        })
        .catch(error => {
        console.error("There was an error fetching the product data:", error);
        });
});
    
    
    
    