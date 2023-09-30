
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
          productDescriptionshort: "Quis incididunt ex aliqua irure dolore ut veniam ullamco excepteur.Cupidatat sit irure magna excepteur consectetur incididunt sunt occaecat culpa sint quis amet. Incididunt incididunt do Lorem labore commodo aliquip mollit nisi qui adipisicing pariatur non qui. Aliquip excepteur enim proident consequat enim non commodo veniam Lorem consequat ad. Quis consectetur in dolore exercitation aliqua cillum veniam consectetur mollit exercitation mollit.",
          productDescriptionlong: "Eu eu irure esse id proident consectetur deserunt amet cupidatat veniam pariatur exercitation. Labore deserunt non sunt id sint mollit culpa quis ipsum in quis et ea. Do consequat deserunt pariatur quis id pariatur consectetur dolor pariatur eiusmod. Veniam aliqua voluptate sit ad proident. Ullamco duis exercitation fugiat pariatur incididunt excepteur quis exercitation fugiat duis aute in.",
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
        // Add more product data objects as needed
      ];
      // Compile the Handlebars template
      const source = `
      {{#each productDatalist}}
        <div class="TopArea w-400 justify-start items-start gap-6 inline-flex">
          <div class="ImageArea p-2 justify-start items-start gap-4 flex">
            <div class="MainImage p-2 bg-white rounded-xl justify-start items-start gap-2.5 flex">
              <div class="ProductImage w-60 h-72 flex-col justify-center items-center inline-flex">
                <img class="Image w-60 h-72" src="{{ imageUrl }}" />
              </div>
            </div>
          </div>
          <div class="TextContent grow shrink basis-0 p-2 flex-col justify-start items-start inline-flex">
            <div class="Header p-2 flex-col justify-start items-start gap-2 flex">
              <div class="AppleWatch text-stone-900 text-6xl font-bold">{{ productName }}</div>
              <div class="Series5Se text-stone-900 text-opacity-50 text-3xl font-medium">{{ productDescription }}</div>
            </div>
            <div class="Special px-2 py-4 justify-start items-center gap-2 inline-flex">
              <div class="Rating pr-4 justify-center items-center gap-2 flex">
                <div class="Star01 w-6 h-6 relative"></div>
                <div class="Star02 w-6 h-6 relative"></div>
                <div class="Star03 w-6 h-6 relative"></div>
                <div class="Star04 w-6 h-6 relative"></div>
                <div class="Star05 w-6 h-6 relative"></div>
              </div>
              <div class="55 text-emerald-700 text-xl font-normal">{{productstar}}</div>
            </div>
            <div class="52999 text-stone-900 text-3xl font-medium">{{ productPrice }}</div>
            <div class="ShortDescription self-stretch h-32 p-2 justify-start items-start gap-2.5 inline-flex">
              <div class="briefDescription grow shrink basis-0 self-stretch text-stone-900 text-xl font-normal">{{ productDescriptionshort }}</div>
            </div>
            <div class="Cta self-stretch h-14 p-2 flex-col justify-center items-end gap-2.5 flex">
              <div class="Button px-6 py-2 bg-stone-900 rounded-2xl justify-center items-center gap-2 inline-flex">
                <div class="Icon w-6 h-6 relative"></div>
                <div class="Button text-white text-xl font-medium" id="plus" value={{productindex}}>Add to Bag</div>
              </div>
            </div>
          </div>
        </div>
        <div class="BottomArea self-stretch h-96 p-2 flex-col justify-start items-center gap-4 flex">
          <div class="Line2 w-96 h-px border border-stone-900 border-opacity-50"></div>
          <div class="Description self-stretch h-96 px-2 py-4 flex-col justify-start items-start gap-2 flex">
            <div class="Description text-stone-900 text-3xl font-medium">Description</div>
            <div class="Description self-stretch h-96 text-zinc-600 text-xl font-normal">{{ productDescriptionlong }}</div>
          </div>
        </div>
      {{/each}}`;
      const template = Handlebars.compile(source);
    
      // Get the container where product cards will be appended (change the selector)
      const container = document.querySelector('.mainproduct'); // Update the selector to target the correct container
      if (container) {
        // Iterate over each product data item and render the template for each
        const productData = productDatalist[0]; // Get the first element of the productDatalist array
        const productCardHTML = template({ productDatalist: [productData] }); // Wrap in an array to match the template structure
        container.innerHTML = productCardHTML;
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