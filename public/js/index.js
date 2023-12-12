document.addEventListener("DOMContentLoaded", function () {
  async function updateProducts(productDataList) {
    try {
      const response = await fetch("/api/update-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productDataList),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Full Response:", data);
      console.log(data.message);
    } catch (error) {
      console.error(
        "There was an error updating the product data on the server:",
        error
      );
    }
  }
  fetch("/api/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      productDatalist = data.products;
      auth = data.auth;
      if (auth == 0) {
        const storedResultObject = localStorage.getItem("productDatalist");
        if (storedResultObject) {
          productDatalist = JSON.parse(storedResultObject);
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
      const containers = document.querySelector(".shopbag");
      function renderProducts() {
        if (containers) {
          containers.innerHTML = "";
          productDatalist.forEach((productData) => {
            const shoppingHTML = templates({ productDatalist: [productData] });
            containers.innerHTML += shoppingHTML;
          });
        } else {
          console.error("Container element not found");
        }
      }
      renderProducts();
      var buttons = document.querySelectorAll("#button");
      var index;
      buttons.forEach(function (button) {
        button.addEventListener("click", function () {
          index = this.getAttribute('value');
          console.log(this.getAttribute('value'))
          const productDetail = productDatalist[index];
          const myForm = document.getElementById('myForm');
          myForm.querySelector('.Image').src = productDetail.imageUrl;
          myForm.querySelector('.AppleWatch').textContent = productDetail.productName;
          myForm.querySelector('.Series5Se').textContent = productDetail.productDescription;
          console.log(index)
          myForm.classList.remove('hidden');
        });
      });
      var updateButton = document.getElementById('updatebutton');
      var selectElement = document.getElementById('quantity');
      updateButton.addEventListener('click', function() {
        var form = document.getElementById("myForm");
        form.style.display = "none";
        console.log(index)
        if (index >= 0 && index < productDatalist.length) {
          productDatalist[index].shoppingtag = "1";
          productDatalist[index].quantity = +selectElement.value;
          console.log(productDatalist[index])
          renderProducts();
          localStorage.setItem(
            "productDatalist",
            JSON.stringify(productDatalist)
          );
          updateProducts(productDatalist);
          console.log(`Product ${index + 1} shoppingtag updated to 1`);
        } else {
          console.error("Invalid product index");
        }
    });
    })
    .catch((error) => {
      console.error("There was an error fetching the product data:", error);
    });
});
