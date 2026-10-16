let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function loadCart(){
    const res = await fetch("http://localhost:3000/products");
    const products = await res.json();
    let total = 0;
    const container = document.getElementById("cartContainer");
    if(cart.length === 0){
        container.innerHTML = "<h3>Your cart is empty 😢</h3>";
        return;
    }

    container.innerHTML = cart.map(item => {
        const p = products.find(x => x.id == item.id);
        const itemTotal = p.price * item.qty;
        total += itemTotal;
        return `
        <div class="cart-item">
            <img src="./${p.image}">
            <div class="info">
                <h3>${p.name}</h3>
                <p class="price">₹${p.price}</p>
                <div class="qty">
                    <button onclick="changeQty(${p.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${p.id}, 1)">+</button>
                </div>
                <p class="remove" onclick="removeItem(${p.id})">Remove</p>
            </div>
        </div>
        `;
    }).join("");

    document.getElementById("subtotal").innerText = total;
    document.getElementById("total").innerText = total;
}

function changeQty(id, val){
    const item = cart.find(x => x.id == id);
    item.qty += val;
    if(item.qty < 1) item.qty = 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function goCheckout(){
    window.location.href = "checkout.html";
}

function removeItem(id){
    cart = cart.filter(x => x.id != id);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

loadCart();