const params = new URLSearchParams(location.search);
const category = params.get("category");

document.getElementById("title").innerText = category + " Sarees";

let allProducts = [];

fetch("http://localhost:3000/products")
.then(res => res.json())
.then(data => {

    allProducts = data.filter(p => p.category === category);

    displayProducts(allProducts);
});

/* DISPLAY */
function displayProducts(products){

    const container = document.getElementById("productContainer");

    container.innerHTML = products.map(p => `
        <div class="product-card" onclick="openDetails(${p.id})" style="width:100%; max-width: 300px;">
            <img src="./${p.image}">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
        </div>
    `).join("");
}

/* SEARCH */
document.getElementById("searchInput").addEventListener("input", e => {

    const value = e.target.value.toLowerCase();

    const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
});

function openDetails(id){
    window.location.href = `product-details.html?id=${id}`;
}