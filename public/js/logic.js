document.addEventListener('DOMContentLoaded', function() {
    let productDatabase = {};
    const productTemplates = [
        {id: "1", name:"Apple iPhone 12",category:"Mobiles & Gadgets",price:38500,imageUrl:"https://images.unsplash.com/photo-1607936854259-c2a2c91f9426?w=600&q=80", condition: "Like New", usedPeriod: "8 months", purchaseDate: "Jan 2025", sellingReason: "Upgraded", seller: {name: "Aarav Sharma", location: "Bengaluru", rating: "4.8/5 (15 reviews)", email: "aarav@bazaar.com"}},
        {id: "2", name:"Samsung Galaxy S21",category:"Mobiles & Gadgets",price:26000,imageUrl:"https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80", condition: "Excellent", usedPeriod: "1.5 years", purchaseDate: "May 2024", sellingReason: "Moving city", seller: {name: "Vihaan Patel", location: "Mumbai", rating: "4.5/5 (10 reviews)", email: "vihaan@bazaar.com"}},
        {id: "3", name:"OnePlus 9 Pro",category:"Mobiles & Gadgets",price:32000,imageUrl:"https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=600&q=80", condition: "Good", usedPeriod: "2 years", purchaseDate: "Oct 2023", sellingReason: "No longer needed", seller: {name: "Rohan Kumar", location: "Delhi", rating: "4.2/5 (8 reviews)", email: "rohan@bazaar.com"}},
        {id: "4", name:"Apple MacBook Air M1",category:"Laptops & Computers",price:65000,imageUrl:"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80", condition: "Like New", usedPeriod: "1 year", purchaseDate: "Aug 2024", sellingReason: "Upgraded", seller: {name: "Priya Singh", location: "Chennai", rating: "4.9/5 (20 reviews)", email: "priya@bazaar.com"}},
        {id: "5", name:"Dell XPS 13 Laptop",category:"Laptops & Computers",price:55000,imageUrl:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80", condition: "Excellent", usedPeriod: "2 years", purchaseDate: "Jun 2023", sellingReason: "Company provided new one", seller: {name: "Ananya Gupta", location: "Hyderabad", rating: "4.6/5 (12 reviews)", email: "ananya@bazaar.com"}},
        {id: "6", name:"HP Pavilion Gaming",category:"Laptops & Computers",price:48000,imageUrl:"https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&q=80", condition: "Good", usedPeriod: "2.5 years", purchaseDate: "Mar 2023", sellingReason: "Not gaming anymore", seller: {name: "Aarav Sharma", location: "Bengaluru", rating: "4.8/5 (15 reviews)", email: "aarav@bazaar.com"}},
        {id: "7", name:"LG 190L Refrigerator",category:"Home Appliances",price:9500,imageUrl:"https://images.unsplash.com/photo-1571175443880-49e1d25b2d6c?w=600&q=80", condition: "Excellent", usedPeriod: "3 years", purchaseDate: "Jan 2022", sellingReason: "Moving city", seller: {name: "Vihaan Patel", location: "Mumbai", rating: "4.5/5 (10 reviews)", email: "vihaan@bazaar.com"}},
        {id: "8", name:"Samsung Washing Machine",category:"Home Appliances",price:11000,imageUrl:"https://images.unsplash.com/photo-1582735689369-3894db71691d?w=600&q=80", condition: "Good", usedPeriod: "4 years", purchaseDate: "Dec 2020", sellingReason: "Upgraded to a larger one", seller: {name: "Rohan Kumar", location: "Delhi", rating: "4.2/5 (8 reviews)", email: "rohan@bazaar.com"}},
        {id: "9", name:"Wakefit Mattress",category:"Furniture & Decor",price:8000,imageUrl:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80", condition: "Like New", usedPeriod: "6 months", purchaseDate: "Feb 2025", sellingReason: "Bought a bigger bed", seller: {name: "Priya Singh", location: "Chennai", rating: "4.9/5 (20 reviews)", email: "priya@bazaar.com"}},
        {id: "10", name:"IKEA Study Table",category:"Furniture & Decor",price:3500,imageUrl:"https://images.unsplash.com/photo-1618423275216-e53b34b13853?w=600&q=80", condition: "Good", usedPeriod: "2 years", purchaseDate: "Sep 2023", sellingReason: "Redecorating", seller: {name: "Ananya Gupta", location: "Hyderabad", rating: "4.6/5 (12 reviews)", email: "ananya@bazaar.com"}},
        {id: "11", name:"Honda Activa 6G",category:"Vehicles",price:65000,imageUrl:"https://images.unsplash.com/photo-1627221528599-4a4f89d5a153?w=600&q=80", condition: "Excellent", usedPeriod: "1 year", purchaseDate: "Jul 2024", sellingReason: "Buying a car", seller: {name: "Aarav Sharma", location: "Bengaluru", rating: "4.8/5 (15 reviews)", email: "aarav@bazaar.com"}},
        {id: "12", name:"Royal Enfield Classic",category:"Vehicles",price:160000,imageUrl:"https://images.unsplash.com/photo-1620757531542-a818e6c4b2b2?w=600&q=80", condition: "Like New", usedPeriod: "1.5 years", purchaseDate: "Mar 2024", sellingReason: "Moving abroad", seller: {name: "Vihaan Patel", location: "Mumbai", rating: "4.5/5 (10 reviews)", email: "vihaan@bazaar.com"}},
        {id: "13", name:"Kindle Paperwhite",category:"Books & Hobbies",price:7000,imageUrl:"https://images.unsplash.com/photo-1526243741027-444d633d7365?w=600&q=80", condition: "Excellent", usedPeriod: "1 year", purchaseDate: "Oct 2024", sellingReason: "Gifted a newer model", seller: {name: "Rohan Kumar", location: "Delhi", rating: "4.2/5 (8 reviews)", email: "rohan@bazaar.com"}},
        {id: "14", name:"Yamaha Acoustic Guitar",category:"Books & Hobbies",price:6500,imageUrl:"https://images.unsplash.com/photo-1510915361894-db8b60106945?w=600&q=80", condition: "Good", usedPeriod: "3 years", purchaseDate: "Nov 2022", sellingReason: "Switched to electric", seller: {name: "Priya Singh", location: "Chennai", rating: "4.9/5 (20 reviews)", email: "priya@bazaar.com"}},
        {id: "15", name:"Titan Analog Watch",category:"Fashion",price:2200,imageUrl:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80", condition: "Like New", usedPeriod: "5 months", purchaseDate: "Mar 2025", sellingReason: "Got a smartwatch", seller: {name: "Ananya Gupta", location: "Hyderabad", rating: "4.6/5 (12 reviews)", email: "ananya@bazaar.com"}},
        {id: "16", name:"boAt Airdopes 141", category: "Fashion", price: 900,imageUrl:"https://images.unsplash.com/photo-1606841837230-7c3853d378b2?w=600&q=80", condition: "Excellent", usedPeriod: "1 year", purchaseDate: "Sep 2024", sellingReason: "Upgraded", seller: {name: "Aarav Sharma", location: "Bengaluru", rating: "4.8/5 (15 reviews)", email: "aarav@bazaar.com"}},
        {id: "17", name:"Hero Sprint Bicycle",category:"Sports",price:8500,imageUrl:"https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&q=80", condition: "Good", usedPeriod: "2 years", purchaseDate: "Aug 2023", sellingReason: "Not using it enough", seller: {name: "Vihaan Patel", location: "Mumbai", rating: "4.5/5 (10 reviews)", email: "vihaan@bazaar.com"}},
        {id: "18", name:"SG Cricket Kit",category:"Sports",price:4000,imageUrl:"https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=600&q=80", condition: "Fair", usedPeriod: "3 years", purchaseDate: "May 2022", sellingReason: "No longer playing", seller: {name: "Rohan Kumar", location: "Delhi", rating: "4.2/5 (8 reviews)", email: "rohan@bazaar.com"}}
    ];
    productDatabase.offer = {name:"Apple MacBook Air M1 (Used)",price:"₹58,500",location:"Bengaluru",imageUrl:"https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80",category:"Laptops & Computers",description:"Special offer! MacBook Air M1 chip, 8GB RAM, 256GB SSD. Excellent condition.",seller:{name:"Rajesh Menon",location:"Bengaluru",rating:"4.9/5 (31 reviews)", email: "rajesh@bazaar.com"},condition:"Excellent",usedPeriod:"1.5 years",purchaseDate:"Mar 2024",sellingReason:"Upgraded"};
    const categories = [{name:"Mobiles & Gadgets",img:"url(https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&q=80)"},{name:"Laptops & Computers",img:"url(https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80)"},{name:"Vehicles",img:"url(https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80)"},{name:"Furniture & Decor",img:"url(https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80)"},{name:"Home Appliances",img:"url(https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=400&q=80)"},{name:"Fashion",img:"url(https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80)"},{name:"Books & Hobbies",img:"url(https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?w=400&q=80)"}, {name:"Sports", img:"url(https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80)"}];
    const mockOrders=[{id:"ECO-9238",date:"Aug 20, 2025",item:"Vintage Bluetooth Speaker",status:"Delivered",trackingHistory:[{date:"Aug 18",location:"Bengaluru",status:"Order Placed"},{date:"Aug 19",location:"Bengaluru",status:"Shipped"},{date:"Aug 20",location:"Bengaluru",status:"Out for Delivery"},{date:"Aug 20",location:"Bengaluru",status:"Delivered"}]},{id:"ECO-8912",date:"Sep 02, 2025",item:"Leather Backpack",status:"Shipped",trackingHistory:[{date:"Sep 01",location:"Delhi",status:"Order Placed"},{date:"Sep 02",location:"Delhi",status:"Shipped"}]}];
    const faqs = [{"q":"How do I sell an item?","a":"Navigate to the 'Sell' tab using the bottom navigation bar. Fill out the form with your product's details, upload a clear photo, set your price, and click 'List My Item'. It will appear on the homepage immediately!"},{"q":"Is it safe to buy products here?","a":"We encourage safe trading. Always check the seller's rating and try to meet in a public place if possible. For shipped items, we hold the payment until you confirm you have received the product as described."},{"q":"How do I contact a seller?","a":"On every product detail page, there is a 'Contact Seller' button. This will open your default email client to send a message directly to the seller."},{"q":"What is your return policy?","a":"Returns are handled between the buyer and seller. If an item is significantly not as described, you can raise a dispute with us within 7 days of receiving it, and we will mediate."},{"q":"How does shipping work?","a":"Sellers are responsible for shipping their items. We recommend using a tracked shipping service. The buyer typically pays for shipping unless the seller specifies otherwise."},{"q":"How do I rate a purchase?","a":"Once an order's status is 'Delivered', a 5-star rating option will appear next to it in your 'My Orders' tab in the Account section."}];
    
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');
    let pageHistory = ['homePage'];
    let isAccountPageInitialized = false;
    let isSellPageInitialized = false;
    let cart = [];
    let recentlyViewed = [];
    
    function loadProducts() {
        const storedProducts = localStorage.getItem('productDatabase');
        if (storedProducts) {
            productDatabase = JSON.parse(storedProducts);
        } else {
            productTemplates.forEach((item) => {
                productDatabase[item.id] = {...item, price: `₹${item.price.toLocaleString("en-IN")}`};
            });
            localStorage.setItem('productDatabase', JSON.stringify(productDatabase));
        }
    }

    function saveProducts() {
        localStorage.setItem('productDatabase', JSON.stringify(productDatabase));
    }
    
    window.navigateTo = function(pageId, params = {}) {
        const currentPageId = document.querySelector(".page.active").id;
        if (pageId !== currentPageId) {
            pageHistory.push(currentPageId);
        }
        pages.forEach(page => page.classList.remove("active"));
        const targetPage = document.getElementById(pageId);
        targetPage.classList.add("active");

        if (pageId === "productDetailPage") {
            loadProductDetails(params.productId);
            trackRecentlyViewed(params.productId);
        } else if (pageId === "categoryListPage") {
            loadCategoryList(params.categoryName);
        } else if (pageId === "cartPage") {
            renderCart();
        } else if (pageId === "accountPage") {
            if (!isAccountPageInitialized) {
                initializeAccountPage();
                isAccountPageInitialized = true;
            }
            renderRecentlyViewed();
        } else if (pageId === "sellPage" && !isSellPageInitialized) {
            initializeSellPage();
            isSellPageInitialized = true;
        }

        updateActiveNav(pageId);
        window.scrollTo(0, 0);
    }

    window.goBack = function() {
        const previousPageId = pageHistory.pop() || "homePage";
        pages.forEach(page => page.classList.remove("active"));
        document.getElementById(previousPageId).classList.add("active");
        updateActiveNav(previousPageId);
        window.scrollTo(0, 0);
    }

    function updateActiveNav(pageId) {
        navItems.forEach(item => {
            item.classList.toggle("active", item.dataset.page === pageId);
        });
    }

    function showToast(message) {
        const container = document.getElementById("toast-container");
        const toast = document.createElement("div");
        toast.className = "toast-notification";
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add("hide");
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    function updateCartCounter() {
        const badge = document.getElementById("cart-badge");
        if (cart.length > 0) {
            badge.textContent = cart.length;
            badge.classList.add("visible");
        } else {
            badge.classList.remove("visible");
        }
    }
    
    function logoutUser() {
        cart = [];
        recentlyViewed = [];
        pageHistory = ['homePage'];
        updateCartCounter(); 
        showToast("You have been logged out successfully.");
        navigateTo('homePage');
    }

    window.addToCart = function(productId) {
        if (cart.includes(productId)) {
            showToast("Item is already in your cart.");
            return;
        }
        cart.push(productId);
        updateCartCounter();
        showToast("Item added to cart!");
    }

    window.removeFromCart = function(productId) {
        cart = cart.filter(id => id !== productId);
        renderCart();
        updateCartCounter();
        showToast("Item removed from cart.");
    }
    
    function renderCart() {
        const container = document.getElementById("cart-container");
        const checkoutSection = document.getElementById("checkout-section");

        if (cart.length === 0) {
            container.innerHTML = `
                <div class="placeholder-page" style="color: var(--text-secondary);">
                    <h2>Your Cart is Empty</h2>
                    <p>Add some products to see them here.</p>
                </div>`;
            checkoutSection.style.display = "none";
            return;
        }

        let html = "";
        let total = 0;

        cart.forEach(id => {
            const p = productDatabase[id];
            total += parseFloat(p.price.replace(/[^0-9.-]+/g, ""));
            html += `
                <div class="cart-item mb-3">
                    <img src="${p.imageUrl.replace('w=600', 'w=150')}" alt="${p.name}">
                    <div class="cart-item-info">
                        <h5 class="mb-1">${p.name}</h5>
                        <p class="price mb-0">${p.price}</p>
                    </div>
                    <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart('${id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>`;
        });

        html += `
            <div class="cart-summary mt-4">
                <h4>Total: ₹${total.toLocaleString("en-IN")}</h4>
                <button class="btn btn-primary w-100 mt-3" onclick="document.getElementById('checkout-section').style.display='block'">
                    Proceed to Checkout
                </button>
            </div>`;

        container.innerHTML = html;
        checkoutSection.style.display = "none";
    }

    document.getElementById("checkout-form").addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        if (name.trim() === "") {
            showToast("Please enter your full name.");
            return;
        }
        showToast("Order Placed Successfully!");
        cart = [];
        updateCartCounter();
        renderCart();
        this.reset();
        this.parentElement.style.display = "none";
    });

    function loadProductDetails(productId) {
        const p = productDatabase[productId];
        document.getElementById("main-product-image").src = p.imageUrl;
        document.getElementById("product-detail-name-main").textContent = p.name;
        document.getElementById("product-detail-price").textContent = p.price;
        document.getElementById("product-condition").textContent = p.condition;
        document.getElementById("product-category").textContent = p.category;
        document.getElementById("product-description").textContent = p.description || "No description provided.";
        document.getElementById("product-used-period").textContent = p.usedPeriod;
        document.getElementById("product-purchase-date").textContent = p.purchaseDate;
        document.getElementById("product-selling-reason").textContent = p.sellingReason;
        document.getElementById("seller-name").textContent = p.seller.name;
        document.getElementById("seller-location").textContent = p.seller.location;
        document.getElementById("seller-rating").textContent = p.seller.rating;
        document.getElementById("action-buttons-container").innerHTML = `
            <a href="mailto:${p.seller.email}?subject=Inquiry about: ${p.name}" class="btn btn-secondary">Contact Seller</a>
            <button class="btn btn-primary" onclick="addToCart('${productId}')">Add to Cart</button>`;
    }

    function loadCategoryList(categoryName) {
        document.getElementById("category-title").textContent = categoryName;
        const grid = document.getElementById("category-product-grid");
        let html = "";
        for (const id in productDatabase) {
            const p = productDatabase[id];
            if (id !== "offer" && (categoryName === "All Categories" || p.category === categoryName)) {
                html += `
                    <div class="grid-product-card" onclick="navigateTo('productDetailPage', { productId: '${id}' })">
                        <img src="${p.imageUrl.replace('w=600', 'w=300')}" alt="${p.name}">
                        <div class="grid-product-card-info">
                            <h3>${p.name}</h3>
                            <p class="price">${p.price}</p>
                        </div>
                    </div>`;
            }
        }
        grid.innerHTML = html;
    }

    function startCountdown() {
        const timerEl = document.getElementById("countdown-timer");
        let seconds = 3600;
        setInterval(() => {
            if (seconds <= 0) seconds = 3600;
            seconds--;
            const mins = String(Math.floor(seconds % 3600 / 60)).padStart(2, "0");
            const secs = String(seconds % 60).padStart(2, "0");
            timerEl.textContent = `00:${mins}:${secs}`;
        }, 1000);
    }
    
    function renderHomepageTimeline() {
        const container = document.getElementById("timeline-container");
        const groups = { Today: [], Yesterday: [], "This Week": [] };
        for (const id in productDatabase) {
            if (id === "offer") continue;
            const p = productDatabase[id];
            const time = p.time || "This Week";
            const cardHTML = `
                <div class="timeline-product-card" onclick="navigateTo('productDetailPage', { productId: '${id}' })">
                    <img src="${p.imageUrl.replace('w=600', 'w=150')}" alt="${p.name}">
                    <div class="timeline-product-info">
                        <h4>${p.name}</h4>
                        <p class="price">${p.price}</p>
                        <p class="location">${p.seller.location}</p>
                    </div>
                </div>`;
            if (!groups[time]) { groups[time] = []; }
            groups[time].push(cardHTML);
        }
        let html = "";
        for (const groupName in groups) {
            if (groups[groupName].length > 0) {
                html += `
                    <div class="timeline-group">
                        <h3>${groupName}</h3>
                        <div class="product-scroll">${groups[groupName].join("")}</div>
                    </div>`;
            }
        }
        container.innerHTML = html;
    }
    
    function renderHomepageCategories() {
        const container = document.getElementById("category-stalls");
        container.innerHTML = categories.map(cat => `
            <div class="category-card" style="background-image: ${cat.img};" onclick="navigateTo('categoryListPage', { categoryName: '${cat.name}' })">
                <span>${cat.name}</span>
            </div>`).join("");
    }
    
    function trackRecentlyViewed(productId) {
        recentlyViewed = recentlyViewed.filter(id => id !== productId);
        recentlyViewed.unshift(productId);
        if (recentlyViewed.length > 5) {
            recentlyViewed.pop();
        }
    }
    
    function renderRecentlyViewed() {
        const container = document.getElementById("recently-viewed-container");
        if (recentlyViewed.length === 0) {
            container.innerHTML = "<p class='text-secondary px-4'>Products you view will appear here.</p>";
            return;
        }
        const cardHTML = recentlyViewed.map(id => {
            const p = productDatabase[id];
            return `
                <div class="timeline-product-card" style="width: 220px;" onclick="navigateTo('productDetailPage', { productId: '${id}' })">
                    <img src="${p.imageUrl.replace('w=600', 'w=150')}" alt="${p.name}">
                    <div class="timeline-product-info">
                        <h4>${p.name}</h4>
                        <p class="price">${p.price}</p>
                    </div>
                </div>`;
        }).join('');
        container.innerHTML = `<div class="timeline-group"><div class="product-scroll">${cardHTML}</div></div>`;
    }

    function initializeSellPage() {
        const categorySelect = document.getElementById("sell-category");
        categorySelect.innerHTML = ''; // Clear previous options
        categories.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.name;
            option.textContent = cat.name;
            categorySelect.appendChild(option);
        });
        const imageInput = document.getElementById("sell-image");
        const imagePreview = document.getElementById("sell-image-preview");
        imageInput.addEventListener("change", () => {
            const file = imageInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Image preview">`;
                };
                reader.readAsDataURL(file);
            } else {
                imagePreview.innerHTML = '<i class="bi bi-camera fs-1"></i>';
            }
        });
        document.getElementById("sell-item-form").addEventListener("submit", e => {
            e.preventDefault();
            const newId = "product-" + Date.now();
            const newProduct = {
                name: document.getElementById("sell-name").value,
                category: document.getElementById("sell-category").value,
                condition: document.getElementById("sell-condition").value,
                price: `₹${parseFloat(document.getElementById("sell-price").value).toLocaleString("en-IN")}`,
                description: document.getElementById("sell-description").value,
                imageUrl: document.getElementById("sell-image-preview").querySelector("img").src,
                time: "Today",
                seller: { name: "Ananya Sharma", location: "Bengaluru", rating: "New Seller", email: "ananya.sharma@bazaar.com" }
            };
            productDatabase[newId] = newProduct;
            saveProducts();
            e.target.reset();
            imagePreview.innerHTML = '<i class="bi bi-camera fs-1"></i>';
            navigateTo("homePage");
            renderHomepageTimeline(); // Re-render timeline to show new item
            showToast("Your item has been listed successfully!");
        });
    }
    
    function initializeAccountPage() {
        renderRecentlyViewed();
        renderOrders();
        const faqContainer = document.getElementById('faqAccordion');
        let faqHTML = '';
        faqs.forEach((faq, index) => {
            faqHTML += `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button ${index > 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}">${faq.q}</button>
                    </h2>
                    <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#faqAccordion">
                        <div class="accordion-body">${faq.a}</div>
                    </div>
                </div>`;
        });
        faqContainer.innerHTML = faqHTML;

        document.getElementById("profileEditForm").addEventListener("submit", e => {
            e.preventDefault();
            document.getElementById("userName").textContent = document.getElementById("profileNameInput").value;
            document.getElementById("userLocation").innerHTML = `<i class="bi bi-geo-alt"></i> ${document.getElementById("profileCityInput").value}`;
            showToast("Profile updated successfully!");
        });
        
        const picInput = document.getElementById("profilePicInput");
        const picPreview = document.getElementById("profilePicPreview");
        let newPicSrc = "";
        picInput.addEventListener("change", e => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = e => {
                    newPicSrc = e.target.result;
                    picPreview.src = newPicSrc;
                };
                reader.readAsDataURL(file);
            }
        });
        document.getElementById("saveProfilePicButton").addEventListener("click", () => {
            if (newPicSrc) {
                document.getElementById("mainProfilePic").src = newPicSrc;
                bootstrap.Modal.getInstance(document.getElementById("profilePicModal")).hide();
                showToast("Profile picture updated!");
            } else {
                alert("Please select an image first.");
            }
        });
        
        document.getElementById("logoutButton").addEventListener("click", (e) => {
            e.preventDefault();
            if (confirm("Are you sure you want to log out?")) {
                logoutUser();
            }
        });
    }

    function renderOrders() {
        const container = document.getElementById("orders-content-container");
        let html = '<h3 class="mb-4">My Orders & Purchases</h3>';
        if (mockOrders.length === 0) {
            html += '<p>You have no past orders.</p>';
            container.innerHTML = html;
            return;
        }
        mockOrders.forEach(order => {
            const stages = ["Placed", "Shipped", "Out for Delivery", "Delivered"];
            const currentStageIndex = stages.indexOf(order.status);
            const progressPercent = currentStageIndex / (stages.length - 1) * 100;
            let progressHTML = `<ul class="order-progress"><div class="order-progress-line" style="width: ${progressPercent}%"></div>`;
            stages.forEach((stage, index) => {
                progressHTML += `<li class="order-progress-step ${index <= currentStageIndex ? "completed" : ""}"><span class="step-dot"></span><small>${stage}</small></li>`;
            });
            progressHTML += `</ul>`;
            
            let footerHTML = "";
            if (order.status === "Delivered") {
                footerHTML = `
                    <div class="d-flex align-items-center mt-3">
                        <strong class="me-2 text-success"><i class="bi bi-check-circle-fill"></i> Delivered</strong>
                        <div class="rating ms-auto" data-order-id="${order.id}">
                            ${[1,2,3,4,5].map(v => `<span class="star" data-value="${v}">★</span>`).join('')}
                        </div>
                    </div>`;
            }
            
            html += `
                <div class="order-card">
                    <div class="d-flex justify-content-between align-items-center flex-wrap">
                        <div>
                            <h5 class="mb-1">${order.item}</h5>
                            <p class="text-secondary mb-0">Order ID: ${order.id}</p>
                        </div>
                        <button class="btn btn-primary btn-sm mt-2 mt-md-0" onclick="showTrackingDetails('${order.id}')">Track Order</button>
                    </div>
                    ${progressHTML}
                    ${footerHTML}
                </div>`;
        });
        container.innerHTML = html;

        document.querySelectorAll("#accountPage .rating .star").forEach(star => {
            star.addEventListener("click", e => {
                const clickedStar = e.target;
                const ratingContainer = clickedStar.parentElement;
                const value = parseInt(clickedStar.dataset.value);
                ratingContainer.querySelectorAll(".star").forEach((s, i) => {
                    s.classList.toggle("rated", i < value);
                });
                showToast(`Rated order ${ratingContainer.dataset.orderId} with ${value} stars!`);
            });
        });
    }
    
    window.showTrackingDetails = function(orderId) {
        const order = mockOrders.find(o => o.id === orderId);
        if (!order) return;
        document.getElementById("trackOrderModalLabel").textContent = `Tracking Details for ${order.id}`;
        let bodyHTML = '<ul class="tracking-timeline">';
        order.trackingHistory.forEach(h => {
            bodyHTML += `<li><strong>${h.status}</strong><br><small class="text-secondary">${h.date}, ${h.location}</small></li>`;
        });
        bodyHTML += "</ul>";
        document.getElementById("trackOrderModalBody").innerHTML = bodyHTML;
        const modal = new bootstrap.Modal(document.getElementById("trackOrderModal"));
        modal.show();
    }
    
    function renderOfferCard() {
        const offer = productDatabase.offer;
        document.getElementById("offer-product-name").textContent = offer.name;
    }

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            const params = item.dataset.params ? JSON.parse(item.dataset.params) : {};
            navigateTo(page, params);
        });
    });

    const themeToggle = document.querySelectorAll('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);
    themeToggle.forEach(btn => {
        btn.addEventListener('click', () => {
            let newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        })
    });

    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        if (query.length < 2) {
            searchSuggestions.style.display = 'none';
            return;
        }
        let suggestionsHTML = '';
        const matches = Object.entries(productDatabase)
            .filter(([id, product]) => product.name && (product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)))
            .slice(0, 5);
        matches.forEach(([id, product]) => {
            suggestionsHTML += `<div class="suggestion-item" onclick="navigateTo('productDetailPage', { productId: '${id}' })"><strong>${product.name}</strong><br><small>${product.category}</small></div>`;
        });
        if (matches.length > 0) {
            searchSuggestions.innerHTML = suggestionsHTML;
            searchSuggestions.style.display = 'block';
        } else {
            searchSuggestions.style.display = 'none';
        }
    });
    document.addEventListener('click', (e) => {
        if (e.target !== searchInput) {
            searchSuggestions.style.display = 'none';
        }
    });
    
    document.getElementById('scroll-right-btn').addEventListener('click', () => {
        const scrollContainer = document.querySelector('.product-scroll');
        if (scrollContainer) {
            scrollContainer.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    });

    loadProducts();
    startCountdown();
    renderHomepageTimeline();
    renderHomepageCategories();
    renderOfferCard();
});
