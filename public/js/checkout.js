let cart = JSON.parse(localStorage.getItem("cart")) || [];

let products = [];

fetch("http://localhost:3000/products")
.then(res => res.json())
.then(data => {
    products = data;
    loadSummary();
});

function loadSummary(){

    let total = 0;

    const itemsDiv = document.getElementById("items");

    itemsDiv.innerHTML = cart.map(item => {

        const p = products.find(x => x.id == item.id);
        const price = p.price * item.qty;

        total += price;

        return `
            <div class="item-row">
                <p>${p.name} <span>x ${item.qty}</span></p>
                <b>₹${price}</b>
            </div>
        `;
    }).join("");

    document.getElementById("total").innerText = total;
}

/* PAYMENT SWITCH */
document.querySelectorAll("input[name='pay']").forEach(el => {
    el.addEventListener("change", () => {

        document.getElementById("upiBox").style.display = "none";
        document.getElementById("cardBox").style.display = "none";

        if(el.value === "upi"){
            document.getElementById("upiBox").style.display = "block";
        }

        if(el.value === "card"){
            document.getElementById("cardBox").style.display = "block";
        }

    });
});

/* PLACE ORDER */
function placeOrder(){

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if(!name || !phone){
        alert("Please fill all details");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
        id: "ORD" + Date.now(),
        items: cart,
        date: new Date().toLocaleString()
    };

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("cart");

    window.location.href = "order-success.html";
}