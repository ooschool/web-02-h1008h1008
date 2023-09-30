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

var flag = 1; // You can set this to the actual value of your 'flag' variable

// Check the value of 'flag'
if (flag === 1) {
  // Replace the HTML content
  var bagArea = document.querySelector('.BagArea');
  if (bagArea) {
    bagArea.innerHTML = `
    <div class="BagArea w-80 h-screen px-2 pt-16 pb-2 flex-col justify-start items-center gap-2.5 inline-flex right-0">
    <div class="Title p-2 justify-start items-start gap-2.5 inline-flex">
    <div class="Bag text-stone-900 text-4xl font-medium">Bag</div>
    </div>
    <ul class="shopbag p-2 self-stretch justify-start items-center gap-4 inline-flex flex-wrap">
    <script id="shopping-template" type="text/x-handlebars-template">
        {{#each productDatalist}}
        {{#eq shoppingtag "1"}}
            <li class="BagItem p-2 bg-white rounded-xl justify-start items-center gap-4 flex">
            <div class="ProductImage w-16 h-16 justify-center items-center flex">
                <img class="Image w-16 h-16" src="{{ imageUrlsquare }}" />
            </div>
            </li>
        {{/eq}}
        {{/each}}
    </script>
    </ul>
    <div class="Cta w-80 h-32 p-4 flex-col justify-center items-center gap-8 inline-flex">
    <div class="Total justify-start items-start gap-4 inline-flex">
        <div class="BagTotal text-stone-900 text-xl font-medium font-['Cabin']">Bag Total:</div>
        <div class="totalprice text-stone-900 text-xl font-medium font-['Cabin']">$ 5,849.93   </div>
    </div>
    <a href="./payment.html">
        <div class="Button px-6 py-2 bg-stone-900 rounded-2xl justify-center items-center gap-2 inline-flex">
        <div class="Icon w-6 h-6 relative">
            <div class="Center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="Bi bi-cart-plus" viewBox="0 0 16 16">
                <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            </div>
        </div>
        <div class="Button text-white text-xl font-medium">Check Out</div>
        
        </div>
    </a>
    </div>
</div>
    `;
  }
}

    
    
    