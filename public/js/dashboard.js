const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "login.html";

document.getElementById("username").innerText = "Hi, " + (user?.name || "User");

let allProducts = [];

async function loadProducts() {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();

    allProducts = data;

    const limitedProducts = data.slice(0, 8); // 👈 only change
    displayProducts(limitedProducts);
}

function displayProducts(products) {
    const container = document.getElementById("productContainer");

    container.innerHTML = products.map(p => `
        <div class="product-card">
            
            <div class="product-image">
                <img src="./${p.image}" alt="${p.name}">
            </div>

            <div class="product-content">
                <h3>${p.name}</h3>
                <p class="price">₹${p.price}</p>
                <button class="buy-btn" onclick="event.stopPropagation(); openDetails(${p.id})">View Product</button>
            </div>

        </div>
    `).join("");
}

function openCategory(category){
    window.location.href = `product-list.html?category=${category}`;
}

function openDetails(id){
    window.location.href = `product-details.html?id=${id}`;
}

function logout(){
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// CAROUSEL AUTO SCROLL
const track = document.getElementById("carouselTrack");

if(track){
    let scrollAmount = 0;

    setInterval(() => {
        scrollAmount += 320;

        if (scrollAmount >= track.scrollWidth - track.clientWidth) {
            scrollAmount = 0;
        }

        track.style.transform = `translateX(-${scrollAmount}px)`;
    }, 2500);
}

// SHOW BUTTON ON SCROLL
function goToTop(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function scrollToProducts(){
    const section = document.getElementById("products");
    if(section){
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

window.addEventListener("scroll", () => {
    const btn = document.getElementById("topBtn");

    if (window.pageYOffset > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
});

loadProducts();