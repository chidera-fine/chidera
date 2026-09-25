const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");
if (menuBtn && navbar) {
    menuBtn.addEventListener("click", function () {
        navbar.classList.toggle("mobile-open");
        if (navbar.classList.contains("mobile-open")) {
            menuBtn.textContent = "x";
        } else {
            menuBtn.textContent = "&#8801;";
        }
    });

    const navLinks = navbar.querySelectorAll("a");
    navLinks.forEach(function(link) {
        link.addEventListener("click", function(){
            navbar.classList.remove("mobile-open");
            menuBtn.textContent = "&#8801;";
        });
    });
}

let order = [];
function addProduct(productName, inputId){
    const input = document.getElementById(inputId);
    if (!input){
        return;
    }
    const quantity = parseInt(input.value);
    if (!quantity || quantity < 1){
        alert("Please enter a quantity first.");
        return;
    }
    const existingProduct = order.find(
        item => item.name === productName
    );
    if (existingProduct){
        existingProduct.quantity += quantity;
    }else{
        order.push({
            name: productName,
            quantity: quantity
        });
    }
    input.value = 0;
    updateOrderDisplay();
}

function updateOrderDisplay(){
    const orderList = document.getElementById("orderList");
    const cartCount = document.getElementById("cartCount");
    if (!orderList) {
        return;
    }
    if (order.length === 0){
        orderList.innerHTML = <p class="empty-order">You haven't selected any products yet</p>;
        if (cartCount) {
            cartCount.textContent = "0";
        }
        return;
    }
    let totalItems = 0;
    let html = "";
    order.forEach(function(item, index){
        totalItems += item.quantity;
        html +=
        <div class= "order-item">
            <div>
                <strong>${item.name}</strong>
                <span>&nbsp; x ${item.quantity}</span>
            </div>
            <button class= "remove-item" onclick= "removeProduct(${index})">Remove</button>
        </div>
        ;
    });
    orderList.innerHTML = html;
    if (cartCount){
        cartCount.textContent = totalItems;
    }
}


function sendOrderToWhatsapp() {
    if (order.length === 0){
        alert("Please select at least one product.");
        return;
    }
    const customerName = document.getElementById("customerName").value.trim();

    const customerPhone = document.getElementById("customerPhone").value.trim();

    const customerNote = document.getElementById("customerNote").value.trim();

    if (!customerName || !customerPhone){
        alert("Please enter your name and phone number.");
        return;
    }
    let message = "Hello Fish Mongers Limited,%0A%0A";

    message += "I would like to place an order.%0A%0A";

    message += "Customer Details%0A";

    message += "Name: " + encodeURIComponent(customerName) + "%0A";

    message += "Phone: " + encodeURIComponent(customerPhone) + "%0A%0A";

    message += "Order%0A";

    order.forEach(function(item){
        message += "." +
        encodeURIComponent(item.name) + "- Quantity: " + item.quantity + "%0A";
    });
    if (customerNote){
        message += "%0A*AdditionalNote*%0A" + encodeURIComponent(customerNote);
    }
    message += "%0A%0Thank you.";

    const whatsappNumber = "2348037122695";

    const whatsappURL = "https://wa.me/" + whatsappNumber + "?text=" + message;

    window.open(
        whatsappURL,
        "_blank"
    );
}

const contactForm = document.getElementById("contactform");
if (contactForm) {
    contactForm.addEventListener("submit",
        function(event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();

            const message = document.getElementById("message").value.trim();

            const whatsappNumber = "2348037122695";

            const whatsappmessage = "Hello Fish Mongers Limited,%0A%0A" + "New Enquiry%0A" 
            + "Name: " + encodeURIComponent(name) + "%0A" + "Phone: " + "%0A%0A" + "Message%0A"
             + encodeURIComponent(message);
             const whatsappURL = "https://wa.me/" + "?text=" + whatsappmessage;
             window.open(
                whatsappURL,
                "_blank"
             );
        }
    );
}