let orders = JSON.parse(localStorage.getItem("orders")) || [];
fetch("http://localhost:3000/products")
.then(res => res.json())
.then(products => {
    const container = document.getElementById("ordersContainer");
    if(orders.length === 0){
        container.innerHTML = "<p>No orders yet 😢</p>";
        return;
    }

    container.innerHTML = orders.map(order => {
        let total = 0;
        const itemsHTML = order.items.map(item => {
            const p = products.find(x => x.id == item.id);
            const price = p.price * item.qty;
            total += price;
            return `
                <div class="item">
                    <span>${p.name} x ${item.qty}</span>
                    <span>₹${price}</span>
                </div>
            `;
        }).join("");

        return `
            <div class="order-card">
                <p class="order-id">${order.id}</p>
                <p>${order.date}</p>
                ${itemsHTML}
                <hr>
                <b>Total: ₹${total}</b>
            </div>
        `;
    }).join("");
});