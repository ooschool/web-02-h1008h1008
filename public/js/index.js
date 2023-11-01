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
            searchInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    const searchTerm = searchInput.value;
                    fetch(`/search?keyword=${searchTerm}`)
                        .then((response) => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('搜索请求失败');
                        }
                        })
                        .then((data) => {
                            console.log('搜索结果:', data);
                            productDatalisttemp = data.products;
                            sources = `{{#each productDatalisttemp}}
                            <li class="ItemCard p-4 rounded-3xl flex-col justify-center items-start gap-2 inline-flex">
                              <a href="{{ productLink }}">
                                <div class="ProductImage w-48 p-4 bg-white rounded-3xl justify-center items-center inline-flex">
                                  <div class="ProductImage w-40 h-48 flex-col justify-center items-center inline-flex">
                                    <img class="Image w-40 h-48" src="{{ imageUrl }}" />
                                  </div>
                                </div>
                              </a>
                              <div class="Content self-stretch h-32 p-2 flex-col justify-center items-start gap-2 flex">
                                <div class="ItemName text-stone-900 text-xl font-medium">{{ productName }}</div>
                                <div class="SmallDescription text-zinc-600 text-base font-normal">{{ productDescription }}</div>
                                <div class="Action self-stretch p-2 justify-between items-center gap-2.5 inline-flex">
                                  <div class="999 text-stone-900 text-xl font-medium">{{ productPrice }}</div>
                                  <div class="Button p-2 bg-stone-900 rounded-lg justify-center items-center gap-2 flex" id="plus" value={{productindex}}>
                                    <div class="Icon w-6 h-6 relative">
                                      <div class="Center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus text-white w-6 h-6" viewBox="0 0 16 16">
                                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                        </svg>                                                                                        
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          {{/each}}`
                            const templates = Handlebars.compile(sources);
                            const containers = document.querySelector('.Row01');
                            if (containers) {
                                containers.innerHTML = ''; 
                                productDatalisttemp.forEach((productData) => {
                                    const shoppingHTML = templates({ productDatalisttemp: [productData] });
                                    containers.innerHTML += shoppingHTML;
                                });
                            } else {
                                console.error("Container element not found");
                            }
                        })
                        .catch((error) => {
                        console.error('搜索错误:', error);
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
    
    
    
    