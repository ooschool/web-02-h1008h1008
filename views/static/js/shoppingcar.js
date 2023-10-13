

// Handlebars.registerHelper('eq', function(arg1, arg2, options) {
//   return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
// });
// // Sample data for the product card
// document.addEventListener("DOMContentLoaded", function () {
//     // Sample data for product cards
//     const productDatalist = [
//       {
//         productLink: "./product.html",
//         imageUrl: "https://via.placeholder.com/159x200",
//         imageUrlsquare: "https://via.placeholder.com/64x64",
//         productName: "Product 1",
//         productDescription: "Description 1",
//         productDescriptionshort: "Consectetur velit excepteur do sit sunt cillum.",
//         productDescriptionlong: "Description 1",
//         productstar: "4.0/5",
//         productPrice: "$ 99.99",
//         shoppingtag: "1",
//         productindex: "0",
//         quantity: 1,
//       },
//       {
//         productLink: "./product.html",
//         imageUrl: "https://via.placeholder.com/159x200",
//         imageUrlsquare: "https://via.placeholder.com/64x64",
//         productName: "Product 1",
//         productDescription: "Description 1",
//         productDescriptionshort: "Cupidatat quis Lorem elit ipsum duis sit.",
//         productDescriptionlong: "Description 1",
//         productstar: "4.0/5",
//         productPrice: "$ 99.99",
//         shoppingtag: "1",
//         productindex: "1",
//         quantity: 1,
//       },
//       {
//         productLink: "./product.html",
//         imageUrl: "https://via.placeholder.com/159x200",
//         imageUrlsquare: "https://via.placeholder.com/64x64",
//         productName: "Product 1",
//         productDescription: "Description 1",
//         productDescriptionshort: "Cupidatat quis Lorem elit ipsum duis sit.",
//         productDescriptionlong: "Description 1",
//         productstar: "4.0/5",
//         productPrice: "$ 99.99",
//         shoppingtag: "1",
//         productindex: "2",
//         quantity: 1,
//       },
//       {
//         productLink: "./product.html",
//         imageUrl: "https://via.placeholder.com/159x200",
//         imageUrlsquare: "https://via.placeholder.com/64x64",
//         productName: "Product 1",
//         productDescription: "Description 1",
//         productDescriptionshort: "Cupidatat quis Lorem elit ipsum duis sit.",
//         productDescriptionlong: "Description 1",
//         productstar: "4.0/5",
//         productPrice: "$ 99.99",
//         shoppingtag: "1",
//         productindex: "3",
//         quantity: 1,
//       },
//       {
//         productLink: "./product.html",
//         imageUrl: "https://via.placeholder.com/159x200",
//         imageUrlsquare: "https://via.placeholder.com/64x64",
//         productName: "Product 1",
//         productDescription: "Description 1",
//         productDescriptionshort: "Cupidatat quis Lorem elit ipsum duis sit.",
//         productDescriptionlong: "Description 1",
//         productstar: "4.0/5",
//         productPrice: "$ 99.99",
//         shoppingtag: "1",
//         productindex: "4",
//         quantity: 1,
//       },
//       // Add more product data objects as needed
//     ];
//     // Compile the Handlebars template
//     const source = `
//     {{#each productDatalist}}
//     <div class="ItemInBag w-full self-stretch px-6 py-8 bg-white rounded-3xl justify-start items-start gap-4 inline-flex mb-4">
//       <div class="ProductImage w-52 h-64 flex-col justify-center items-center inline-flex">
//         <img class="Image w-52 h-80" src="https://via.placeholder.com/204x280" />
//       </div>
//       <div class="ContentArea grow shrink basis-0 p-2 flex-col justify-start items-start gap-2 inline-flex">
//         <div class="Header self-stretch h-16 flex-col justify-center items-start gap-2 flex">
//           <div class="Title px-2 justify-start items-start gap-2 inline-flex">
//             <div class="ItemName text-stone-900 text-3xl font-normal font-['Cabin']">{{ productName }}</div>
//           </div>
//           <div class="Subtitle px-2 justify-start items-start gap-2 inline-flex">
//             <div class="ItemType text-zinc-600 text-xl font-normal font-['Cabin']">{{ productDescription }}</div>
//           </div>
//         </div>
//         <div class="SmallDescription self-stretch p-2 justify-start items-center gap-2.5 inline-flex">
//           <div class="LoremIpsumDolorSitAmetConsecteturAdipiscingElitUtAliquam text-stone-900 text-xl font-normal font-['Cabin']">{{productDescriptionshort}}</div>
//         </div>
//         <div class="Rating self-stretch p-2 justify-start items-start gap-2 inline-flex">
//           <div class="Stars pr-4 justify-center items-center gap-2 flex">
//             <div class="Star01 w-6 h-6 relative"></div>
//             <div class="Star02 w-6 h-6 relative"></div>
//             <div class="Star03 w-6 h-6 relative"></div>
//             <div class="Star04 w-6 h-6 relative"></div>
//             <div class="Star05 w-6 h-6 relative"></div>
//           </div>
//           <div class="55 text-emerald-700 text-xl font-normal font-['Cabin']">{{productstar}}</div>
//         </div>
//         <div class="PriceRating self-stretch p-2 justify-between items-center inline-flex">
//           <div class="Price p-2 justify-start items-start gap-2.5 flex">
//             <div class="999 text-stone-900 text-xl font-normal font-['Cabin']">{{ productPrice }}</div>
//           </div>
//           <div class="Quantity p-2 justify-start items-center gap-2.5 flex">
//             <div class="Price h-8 justify-start items-center gap-4 flex">
//               <div class="Button h-6 w-6 p-2 rounded-lg justify-center items-center gap-2 flex ">
//                 <div class="Icon w-4 h-4 relative">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="Iconm" viewBox="0 0 16 16" value={{productindex}}>
//                     <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
//                   </svg>
//                 </div>
//               </div>
//               <div class="Number text-stone-900 text-xl font-normal font-['Cabin']">{{quantity}}</div>
//               <div class="Button  h-6 w-6 p-2 rounded-lg justify-center items-center gap-2 flex">
//                 <div class="Icon">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="Iconp" viewBox="0 0 16 16" value={{productindex}}>
//                     <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     {{/each}}`;
//     const template = Handlebars.compile(source);
  
//     // Get the container where product cards will be appended (change the selector)
//     const container = document.querySelector('.mainproduct'); // Update the selector to target the correct container
//     if (container) {
//       // Iterate over each product data item and render the template for each
//       productDatalist.forEach((productData) => {
//         const productCardHTML = template({ productDatalist: [productData] }); // Wrap in an array to match the template structure
//         container.innerHTML += productCardHTML; // Append each product card to the container
//       });
//     } else {
//       console.error("Container element not found");
//     }

//     const sources = `{{#each productDatalist}}
//       {{#eq shoppingtag "1"}}
//         <li class="BagItem p-2 bg-white rounded-xl justify-start items-center gap-4 flex">
//           <div class="ProductImage w-16 h-16 justify-center items-center flex">
//             <img class="Image w-16 h-16" src="{{ imageUrlsquare }}" />
//           </div>
//         </li>
//       {{/eq}}
//     {{/each}}`;
//     const templates = Handlebars.compile(sources);
  
//     // Get the container where product cards will be appended (change the selector)
//     const containers = document.querySelector('.shopbag'); // Update the selector to target the correct container
//     if (containers) {
//       // Iterate over each product data item and render the template for each
//       productDatalist.forEach((productData) => {
//       const shoppingHTML = templates({ productDatalist: [productData] }); // Wrap in an array to match the template structure
//       containers.innerHTML += shoppingHTML; // Append each product card to the container
//       });
//     } else {
//       console.error("Container element not found");
//     }
    
//   // Add a click event listener to the button
//     function handleQuantity(itemElement) {
//   // Get the Quantity element within the specific item
//   const quantityElement = itemElement.querySelector('.Number');

//   // Get the Iconp and Iconm elements within the specific item
//   const iconpElements = itemElement.querySelectorAll(".Iconp");
//   const iconmElements = itemElement.querySelectorAll(".Iconm");

//   // Function to update the quantity and the UI
//   function updateQuantity(num) {
//     // Check if the quantity is zero and remove the item if needed
//     var buttons = document.querySelectorAll(".Iconm");
//     buttons.forEach(function(button) {
//       button.addEventListener("click", function() {
//         // Access the value attribute of the clicked button
//         num = parseInt(num, 10);
//         quantity = productDatalist[0].quantity;
//         if (num >= 0 && num < productDatalist.length && quantity == 0) {
//           // 将产品的 shoppingtag 属性更新为 1
//           productDatalist[num].shoppingtag = "0";
//           const templates = Handlebars.compile(sources);

//           // Get the container where product cards will be appended (change the selector)
//           const containers = document.querySelector('.shopbag'); // Update the selector to target the correct container
//           if (containers) {
//             containers.innerHTML = '';
//             // Iterate over each product data item and render the template for each
//             productDatalist.forEach((productData) => {
//               const shoppingHTML = templates({ productDatalist: [productData] }); // Wrap in an array to match the template structure
//               containers.innerHTML += shoppingHTML; // Append each product card to the container
//             });
//           } else {
//             console.error("Container element not found");
//           }

//           // 输出一条消息以确认已更新
//           itemElement.remove();
//           return;
//         }
//       });
//     });
//   }

//   // Event listener for Iconp (add)
//   iconpElements.forEach((iconpElement, index) => {
//     iconpElement.addEventListener('click', () => {
//       var num = iconpElement.getAttribute("value");
//       productDatalist[num].quantity += 1;
//       quantity = productDatalist[num].quantity;
//       quantityElement.textContent = quantity;
//       updateTotalPrice();
//       // Remove the event listener to prevent multiple clicks
//     });
//   });

//   // Event listener for Iconm (subtract)
//   iconmElements.forEach((iconmElement, index) => {
//     iconmElement.addEventListener('click', () => {
//       var num = iconmElement.getAttribute("value");
//       if (productDatalist[num].quantity > 0) {
//         productDatalist[num].quantity -= 1;
//         quantity = productDatalist[num].quantity;
//         quantityElement.textContent = quantity;
//         if (num >= 0 && num < productDatalist.length && quantity == 0) {
//           // 将产品的 shoppingtag 属性更新为 1
//           productDatalist[num].shoppingtag = "0";
//           const templates = Handlebars.compile(sources);

//           // Get the container where product cards will be appended (change the selector)
//           const containers = document.querySelector('.shopbag'); // Update the selector to target the correct container
//           if (containers) {
//             containers.innerHTML = '';
//             // Iterate over each product data item and render the template for each
//             productDatalist.forEach((productData) => {
//               const shoppingHTML = templates({ productDatalist: [productData] }); // Wrap in an array to match the template structure
//               containers.innerHTML += shoppingHTML; // Append each product card to the container
//             });
//           } else {
//             console.error("Container element not found");
//           }

//           // 输出一条消息以确认已更新
//           itemElement.remove();
//           return;
//         }
//         updateTotalPrice();
//       }
//     });
//   });

//   // Initial update
//   updateQuantity();
// }

//     function updateTotalPrice() {
//       // Get the total price element
//       const totalpriceElement = document.querySelector('.totalprice');
    
//       // Initialize a variable to store the total price
//       let totalPrice = 0;
    
//       // Loop through the product data and calculate the total price
//       productDatalist.forEach((productData) => {
//         // Parse the product price and quantity as numbers
//         const price = parseFloat(productData.productPrice.replace('$', '').trim());
//         const quantity = productData.quantity;
    
//         // Calculate the subtotal for this product
//         const subtotal = price * quantity;
    
//         // Add the subtotal to the total price
//         totalPrice += subtotal;
//       });
    
//       // Format the total price with two decimal places and the "$" symbol
//       const formattedTotalPrice = '$ ' + totalPrice.toFixed(2);
    
//       // Update the content of the total price element
//       totalpriceElement.textContent = formattedTotalPrice;
//     }
//     // Get all the ItemInBag elements
//     const itemElements = document.querySelectorAll('.ItemInBag');
    
//     // Initialize quantity handling for each item
//     itemElements.forEach((itemElement) => {
//       handleQuantity(itemElement);
//       updateTotalPrice();
//     });
//   });