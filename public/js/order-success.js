const orderId = "ORD" + Math.floor(Math.random() * 1000000);

document.getElementById("orderId").innerText = orderId;

function goHome(){
    window.location.href = "dashboard.html";
}