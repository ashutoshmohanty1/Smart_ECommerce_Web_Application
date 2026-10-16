const id = new URLSearchParams(location.search).get("id");
let qty = 1;

fetch("http://localhost:3000/products")
.then(res => res.json())
.then(data => {
    const p = data.find(x => x.id == id);
    const images = [p.image, p.image, p.image];
    document.getElementById("productDetails").innerHTML = `
    <div class="image-section">
        <div class="main-image">
            <img id="mainImg" src="./${p.image}">
        </div>

        <div class="thumb">
            ${images.map(img => `
                <img src="./${img}" onclick="changeImage('${img}')">
            `).join("")}
        </div>
    </div>

    <div class="info">
        <h2>${p.name}</h2>
        <p class="price">₹${p.price}</p>
        <p>
            <span class="old-price">₹${p.price + 500}</span>
            <span class="discount">20% OFF</span>
        </p>

        <p>
            ${p.category === "Silk" ? "Premium silk saree for weddings." : ""}
            ${p.category === "Cotton" ? "Comfortable cotton saree for daily wear." : ""}
            ${p.category === "Designer" ? "Trendy designer saree for parties." : ""}
            ${p.category === "Handloom" ? "Traditional handloom saree." : ""}
        </p>

        <div class="qty">
            <button onclick="changeQty(-1)">-</button>
            <span id="qty">${qty}</span>
            <button onclick="changeQty(1)">+</button>
        </div>

        <button class="btn cart-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        <button class="btn buy-btn" onclick="buyNow(${p.id})">Buy Now</button>

        <div class="details-box">
            <h3>Product Details</h3>
            <ul>
                <li>Fabric: ${p.category === "Silk" ? "Silk" : p.category === "Cotton" ? "Cotton" : "Mixed"}</li>
                <li>Work: Embroidery</li>
                <li>Occasion: ${p.category === "Silk" ? "Wedding" : "Casual"}</li>
                <li>Wash Care: Dry Clean Only</li>
            </ul>
        </div>

        <div class="details-box">
            <h3>Delivery</h3>
            <p>Free delivery within 3-5 days</p>
        </div>

    </div>
    `;

    const related = data.filter(x => x.category === p.category && x.id != p.id);
    document.getElementById("relatedProducts").innerHTML =
        related.map(p => `
            <div class="product-card" onclick="openDetails(${p.id})">
                <img src="./${p.image}">
                <p>${p.name}</p>
                <b>₹${p.price}</b>
            </div>
        `).join("");
});

function buyNow(id){
    let cart = [{id, qty: 1}];
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "cart.html";
}

function changeImage(img){
    document.getElementById("mainImg").src = "./" + img;
}

function changeQty(val){
    qty += val;
    if(qty < 1) qty = 1;
    document.getElementById("qty").innerText = qty;
}

function addToCart(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(x => x.id == id);
    if(existing){
        existing.qty += qty;
    } else {
        cart.push({id, qty});
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}
function openDetails(id){
    window.location.href = `product-details.html?id=${id}`;
}

