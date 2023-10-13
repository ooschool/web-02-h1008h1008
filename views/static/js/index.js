
// Handlebars.registerHelper('eq', function(arg1, arg2, options) {
//     return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
//   });
//   // Sample data for the product card
//   document.addEventListener("DOMContentLoaded", function () {
//       // Sample data for product cards
//       // Compile the Handlebars template
//       const sources = `{{#each productDatalist}}
//       {{#eq shoppingtag "1"}}
//         <li class="BagItem p-2 bg-white rounded-xl justify-start items-center gap-4 flex">
//           <div class="ProductImage w-16 h-16 justify-center items-center flex">
//             <img class="Image w-16 h-16" src="{{ imageUrlsquare }}" />
//           </div>
//         </li>
//       {{/eq}}
//     {{/each}}`;
//       const templates = Handlebars.compile(sources);
//       console.log(document.getElementById("shopping-template").innerHTML)
//       // Get the container where product cards will be appended (change the selector)
//       const containers = document.querySelector('.shopbag'); // Update the selector to target the correct container
//       if (containers) {
//         // Iterate over each product data item and render the template for each
//         productDatalist.forEach((productData) => {
//         const shoppingHTML = templates({ productDatalist: [productData] }); // Wrap in an array to match the template structure
//         containers.innerHTML += shoppingHTML; // Append each product card to the container
//         });
//       } else {
//         console.error("Container element not found");
//       }
  
//     // Add a click event listener to the button
//       var buttons = document.querySelectorAll(".Button");
//       buttons.forEach(function(button) {
//         button.addEventListener("click", function() {
//           // Access the value attribute of the clicked button
//           var num = button.getAttribute("value");
//           if (num >= 0 && num < productDatalist.length) {
//             // 将产品的shoppingtag属性更新为1
//             productDatalist[num].shoppingtag = "1";
//             const templates = Handlebars.compile(sources);
          
//             // Get the container where product cards will be appended (change the selector)
//             const containers = document.querySelector('.shopbag'); // Update the selector to target the correct container
//             if (containers) {
//               containers.innerHTML = '';
//               // Iterate over each product data item and render the template for each
//               productDatalist.forEach((productData) => {
//               const shoppingHTML = templates({ productDatalist: [productData] }); // Wrap in an array to match the template structure
//               containers.innerHTML += shoppingHTML; // Append each product card to the container
//               });
//             } else {
//               console.error("Container element not found");
//             }
            
//             // 输出一条消息以确认已更新
//             console.log(`Product ${num + 1} shoppingtag updated to 1`);
//           } else {
//             // 如果productIndex无效，输出错误消息
//             console.error("Invalid product index");
//           }
//         });
//       });
//     });
//     // JavaScript函数，用于更新产品的shoppingtag属性
    
    
    
    