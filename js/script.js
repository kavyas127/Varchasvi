document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalAmount = document.getElementById("cart-total-amount");
    const notification = document.getElementById("notification");
    const showCartButton = document.getElementById("show-cart-button");
    const cart = []; // Initialize an empty cart array to store items
    let isCartVisible = false; // Initialize the cart visibility state

    addToCartButtons.forEach(function (button, index) {
        button.addEventListener("click", function () {
            if (cart.length < 10) {
                const productTitle = document.querySelectorAll(".product-title")[index].textContent;
                const productPrice = parseFloat(document.querySelectorAll(".product-price")[index].textContent.slice(1));
                cart.push({ title: productTitle, price: productPrice });
                updateCartDisplay();
                showNotification();
                setTimeout(hideNotification, 750);
            } else {
                alert("You can only order a maximum of 10 items.");
            }
        });
    });

    showCartButton.addEventListener("click", function () {
        cartItemsContainer.innerHTML = ""; // Clear the cart items container

        if (cart.length === 0) {
            cartItemsContainer.textContent = "Cart is empty";
        } else {
            cart.forEach(function (item, index) {
                const cartItem = document.createElement("li");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <span>${item.title}</span>
                    <span>₹${item.price.toFixed(2)}</span>
                `;
                cartItem.addEventListener("click", function () {
                    removeFromCart(index);
                });
                cartItemsContainer.appendChild(cartItem);
            });
        }

        // Toggle the text of the button based on cart visibility
        if (isCartVisible) {
            showCartButton.textContent = "Show cart"; // Change to "Show cart" when hiding
        } else {
            showCartButton.textContent = "Hide cart"; // Change to "Hide cart" when showing
        }

        cartItemsContainer.classList.toggle("cart-items-hidden");
        cartItemsContainer.classList.toggle("cart-items-show");

        isCartVisible = !isCartVisible; // Toggle cart visibility state
    });

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach(function (item, index) {
            const cartItem = document.createElement("li");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span>${item.title}</span>
                <span>₹${item.price.toFixed(2)}</span>
            `;
            cartItem.addEventListener("click", function () {
                removeFromCart(index);
            });
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });
        cartTotalAmount.textContent = total.toFixed(2);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartDisplay();
    }

    function showNotification() {
        notification.style.display = "block";
        notification.style.top = "10px";
    }

    function hideNotification() {
        notification.style.display = "none";
    }
});