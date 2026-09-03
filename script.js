// ================= ADD TO CART =================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// OPEN CART
function openCart() {
    document.getElementById("cartSidebar").classList.add("active");
    document.getElementById("overlay").style.display = "block";

    renderCart();
}


// CLOSE CART
window.closeCart = function () {
    document.getElementById("cartSidebar").classList.remove("active");
    document.getElementById("overlay").style.display = "none";
};


// ADD TO CART
document.querySelectorAll(".add-to-cart").forEach(button => {

    button.addEventListener("click", function (e) {

        e.preventDefault();

        let product = {
            name: this.dataset.name,
            price: Number(this.dataset.price),
            image: this.dataset.image,
            quantity: 1
        };

        let existing = cart.find(item => item.name === product.name);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        openCart();
    });

});


// ================= RENDER CART =================

function renderCart() {

    let cartItems = document.getElementById("cartItems");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div>
                    <h6>${item.name}</h6>

                    <p>Rs. ${item.price}</p>

                    <p>Qty: ${item.quantity}</p>

                    <button 
                        onclick="removeItem(${index})"
                        class="btn btn-danger btn-sm">
                        Remove
                    </button>
                </div>

            </div>
        `;
    });

    let cartTotal = document.getElementById("cartTotal");

    if (cartTotal) {
        cartTotal.innerText = "Rs. " + total;
    }
}


// ================= REMOVE ITEM =================

window.removeItem = function (index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
};


// ================= CHECKOUT =================

let checkoutItems = document.getElementById("checkoutItems");

if (checkoutItems) {

    checkoutItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        checkoutItems.innerHTML += `
            <div class="item">

                <div class="item-left">

                    <img src="${item.image}" alt="${item.name}">

                    <div class="item-info">

                        <h3>${item.name}</h3>

                        <p>Price: Rs. ${item.price}</p>

                        <p>Qty: ${item.quantity}</p>

                    </div>

                </div>

                <div class="item-price">
                    Rs. ${item.price * item.quantity}
                </div>

            </div>
        `;
    });

    let checkoutTotal = document.getElementById("checkoutTotal");

    if (checkoutTotal) {
        checkoutTotal.innerText = "Rs. " + total;
    }
}


// ================= PLACE ORDER =================

function placeOrder() {
    window.location.href = "orderform.html";
}