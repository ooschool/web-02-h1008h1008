let isExpanded = false;
document.addEventListener('DOMContentLoaded', function() {
document.querySelector('.MenuIcon').addEventListener('click', function () {
    if (isExpanded) {
    document.querySelector('.Navbar').style.width = '4rem'; // 将宽度设置为初始宽度
    } else {
    document.querySelector('.Navbar').style.width = '16rem'; // 将宽度扩展
    }
    isExpanded = !isExpanded;
});
});
// Get the quantity element
// Function to handle quantity updates for a specific item
function handleQuantity(itemElement) {
  // Get the Quantity element within the specific item
  const quantityElement = itemElement.querySelector('.Number');

  // Get the Iconp and Iconm elements within the specific item
  const iconpElement = itemElement.querySelector('.Iconp');
  const iconmElement = itemElement.querySelector('.Iconm');

  // Initial quantity value (you can set this as needed)
  let quantity = 1;

  // Function to update the quantity and the UI
  function updateQuantity() {
    quantityElement.textContent = quantity;
    // Check if the quantity is zero and remove the item if needed
    if (quantity === 0) {
      itemElement.remove();
      alert('Item removed from cart');
    }
  }

  // Event listener for Iconp (add)
  iconpElement.addEventListener('click', () => {
    quantity++;
    updateQuantity();
  });

  // Event listener for Iconm (subtract)
  iconmElement.addEventListener('click', () => {
    if (quantity > 0) {
      quantity--;
      updateQuantity();
    }
  });

  // Initial update
  updateQuantity();
}

// Get all the ItemInBag elements
const itemElements = document.querySelectorAll('.ItemInBag');

// Initialize quantity handling for each item
itemElements.forEach((itemElement) => {
  handleQuantity(itemElement);
});
