
Handlebars.registerHelper('eq', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });
  // Sample data for the product card
  document.addEventListener("DOMContentLoaded", function () {
      // Sample data for product cards
      const productDatalist = [
        {
          productLink: "./product.html",
          imageUrl: "https://via.placeholder.com/159x200",
          imageUrlsquare: "https://via.placeholder.com/64x64",
          productName: "Product 1",
          productDescription: "Description 1",
          productDescriptionshort: "Description 1",
          productDescriptionlong: "Description 1",
          productstar: "4.0/5",
          productPrice: "$ 99.99",
          shoppingtag: "0",
          productindex: "0",
        },
        {
          productLink: "./product.html",
          imageUrl: "https://via.placeholder.com/159x200",
          imageUrlsquare: "https://via.placeholder.com/64x64",
          productName: "Product 1",
          productDescription: "Description 1",
          productDescriptionshort: "Description 1",
          productDescriptionlong: "Description 1",
          productstar: "4.0/5",
          productPrice: "$ 99.99",
          shoppingtag: "1",
          productindex: "1",
        },
        {
          productLink: "./product.html",
          imageUrl: "https://via.placeholder.com/159x200",
          imageUrlsquare: "https://via.placeholder.com/64x64",
          productName: "Product 1",
          productDescription: "Description 1",
          productDescriptionshort: "Description 1",
          productDescriptionlong: "Description 1",
          productstar: "4.0/5",
          productPrice: "$ 99.99",
          shoppingtag: "1",
          productindex: "1",
        },
        {
          productLink: "./product.html",
          imageUrl: "https://via.placeholder.com/159x200",
          imageUrlsquare: "https://via.placeholder.com/64x64",
          productName: "Product 1",
          productDescription: "Description 1",
          productDescriptionshort: "Description 1",
          productDescriptionlong: "Description 1",
          productstar: "4.0/5",
          productPrice: "$ 99.99",
          shoppingtag: "1",
          productindex: "1",
        },
        {
          productLink: "./product.html",
          imageUrl: "https://via.placeholder.com/159x200",
          imageUrlsquare: "https://via.placeholder.com/64x64",
          productName: "Product 1",
          productDescription: "Description 1",
          productDescriptionshort: "Description 1",
          productDescriptionlong: "Description 1",
          productstar: "4.0/5",
          productPrice: "$ 99.99",
          shoppingtag: "1",
          productindex: "1",
        },
        {
          productLink: "./product.html",
          imageUrl: "https://via.placeholder.com/159x200",
          imageUrlsquare: "https://via.placeholder.com/64x64",
          productName: "Product 1",
          productDescription: "Description 1",
          productDescriptionshort: "Description 1",
          productDescriptionlong: "Description 1",
          productstar: "4.0/5",
          productPrice: "$ 99.99",
          shoppingtag: "1",
          productindex: "1",
        },
        {
          productLink: "./product.html",
          imageUrl: "https://via.placeholder.com/159x200",
          imageUrlsquare: "https://via.placeholder.com/64x64",
          productName: "Product 1",
          productDescription: "Description 1",
          productDescriptionshort: "Description 1",
          productDescriptionlong: "Description 1",
          productstar: "4.0/5",
          productPrice: "$ 99.99",
          shoppingtag: "1",
          productindex: "1",
        },
        // Add more product data objects as needed
      ];
      // Compile the Handlebars template
      const source = `
        {{#each productDatalist}}
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
                <div class="Button p-2 bg-stone-900 rounded-lg justify-center items-center gap-2 flex" id="plus" value="{{ productindex }}">
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
        {{/each}}
    `;
      const template = Handlebars.compile(source);
      console.log(template)
      // Get the container where product cards will be appended (change the selector)
      const container = document.querySelector('.Row01'); // Update the selector to target the correct container
      if (container) {
        // Iterate over each product data item and render the template for each
        productDatalist.forEach((productData) => {
          const productCardHTML = template({ productDatalist: [productData] }); // Wrap in an array to match the template structure
          container.innerHTML += productCardHTML; // Append each product card to the container
        });
      } else {
        console.error("Container element not found");
      }
  
      const sources = `{{#each productDatalist}}
      {{#eq shoppingtag "1"}}
        <li class="BagItem p-2 bg-white rounded-xl justify-start items-center gap-4 flex">
          <div class="ProductImage w-16 h-16 justify-center items-center flex">
            <img class="Image w-16 h-16" src="{{ imageUrlsquare }}" />
          </div>
        </li>
      {{/eq}}
    {{/each}}`;
      const templates = Handlebars.compile(sources);
      console.log(document.getElementById("shopping-template").innerHTML)
      // Get the container where product cards will be appended (change the selector)
      const containers = document.querySelector('.shopbag'); // Update the selector to target the correct container
      if (containers) {
        // Iterate over each product data item and render the template for each
        productDatalist.forEach((productData) => {
        const shoppingHTML = templates({ productDatalist: [productData] }); // Wrap in an array to match the template structure
        containers.innerHTML += shoppingHTML; // Append each product card to the container
        });
      } else {
        console.error("Container element not found");
      }
  
    // Add a click event listener to the button
      var buttons = document.querySelectorAll(".Button");
      buttons.forEach(function(button) {
        button.addEventListener("click", function() {
          // Access the value attribute of the clicked button
          var num = button.getAttribute("value");
          if (num >= 0 && num < productDatalist.length) {
            // 将产品的shoppingtag属性更新为1
            productDatalist[num].shoppingtag = "1";
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
            console.log(`Product ${num + 1} shoppingtag updated to 1`);
          } else {
            // 如果productIndex无效，输出错误消息
            console.error("Invalid product index");
          }
        });
      });
    });
    // JavaScript函数，用于更新产品的shoppingtag属性
    
    
    
    