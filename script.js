/* =========================================
   1. SYSTEM INITIALIZATION & CONFIG
   ========================================= */
// Initialize emoji icon system
// (Lucide icons are replaced with emojis via data-lucide attributes)

// Project Database
const projects = {
    'p1': { 
        color: '#f59e0b', // Amber
        title: 'BEST SNACKS OF<span style="color:#f59e0b"> LAWGATE // LPU</span>', 
        badge: 'Project 001',
        img: 'url("https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1920&q=80")' 
    },
    'p2': { 
        color: '#ec4899', // Pink
        title: 'CAKES FOR YOUR FRIENDS<span style="color:#ec4899"> BIRTHDAY</span>', 
        badge: 'PRE-ORDER ONLY', 
        img: 'url("https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1920&q=80")' 
    },
    'p3': { 
        color: '#ef4444', // Red
        title: 'WINTER <span style="color:#ef4444">FESTIVAL</span>', 
        badge: 'SEASONAL', 
        img: 'url("https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=1920&q=80")' 
    },
    'p5': { 
        color: '#8b5cf6', // Purple
        title: 'STUDENT <span style="color:#8b5cf6">PARTNERS</span>', 
        badge: 'JOIN THE TEAM', 
        img: 'url("https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1920&q=80")' 
    },
    'invest': { 
        color: '#ffffff', // White
        title: 'JOIN <span style="color:#fff">THE BOARD</span>', 
        badge: 'INNER CIRCLE', 
        img: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80")' 
    },
    'feedback': { 
        color: '#10b981', // Emerald
        title: 'SYSTEM <span style="color:#10b981">DIAGNOSTICS</span>', 
        badge: 'UPLINK ONLINE', 
        img: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80")' 
    }
};

/* =========================================
   2. VIEW CONTROLLER
   ========================================= */
function activateView(pid, btnElement) {
    const config = projects[pid];
    if (!config) return;

    // 1. Update Colors & Background
    const root = document.documentElement;
    root.style.setProperty('--accent', config.color);
    
    const bg = document.getElementById('dynamic-bg');
    if(bg) {
        bg.style.backgroundImage = `linear-gradient(to bottom, rgba(3,3,3,0.9), rgba(3,3,3,0.98)), ${config.img}`;
    }

    // 2. Update Hero Text
    const heroTitle = document.getElementById('hero-title');
    const heroBadge = document.getElementById('hero-badge');
    
    if(heroTitle) heroTitle.innerHTML = config.title;
    if(heroBadge) {
        heroBadge.innerHTML = `<span style="display:inline-block; width:8px; height:8px; background:currentColor; border-radius:50%; margin-right:6px;"></span> ${config.badge}`;
        heroBadge.style.color = config.color;
        heroBadge.style.borderColor = config.color;
        
        if(pid === 'p1') {
            heroBadge.style.background = `linear-gradient(90deg, ${config.color}, #d97706)`;
            heroBadge.style.color = '#fff';
            heroBadge.style.border = 'none';
        } else {
            heroBadge.style.background = 'rgba(0,0,0,0.6)';
            heroBadge.style.border = `1px solid ${config.color}`;
        }
    }

    // 3. Update Dock State
    document.querySelectorAll('.dock-item').forEach(el => el.classList.remove('active'));
    // If clicked via dock, highlight that button, else find by ID
    if(btnElement) {
        btnElement.classList.add('active');
    } else {
        const tab = document.getElementById('tab-' + pid);
        if(tab) tab.classList.add('active');
    }

    // 4. Switch Panels
    document.querySelectorAll('.view-panel').forEach(el => el.classList.remove('active'));
    const panel = document.getElementById(pid);
    if(panel) panel.classList.add('active');

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(msg, type = 'info') {
    const box = document.getElementById('toast-box');
    const txt = document.getElementById('toast-msg');
    
    if(box && txt) {
        txt.innerText = msg;
        const icon = box.querySelector('i');
        
        // Remove previous type classes
        box.classList.remove('toast-info', 'toast-success', 'toast-error', 'toast-warning');
        
        // Add appropriate type class and icon
        if(type === 'success') {
            box.classList.add('toast-success');
            if(icon) icon.setAttribute('data-lucide', 'check-circle');
        } else if(type === 'error') {
            box.classList.add('toast-error');
            if(icon) icon.setAttribute('data-lucide', 'alert-circle');
        } else if(type === 'warning') {
            box.classList.add('toast-warning');
            if(icon) icon.setAttribute('data-lucide', 'alert-triangle');
        } else {
            box.classList.add('toast-info');
            if(icon) icon.setAttribute('data-lucide', 'info');
        }
        
        // Refresh lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        box.classList.add('show');
        setTimeout(() => box.classList.remove('show'), 3500);
    }
}

/* =========================================
   2B. MENU TOGGLE FUNCTION
   ========================================= */
function toggleMenuType(type, btn) {
    // Hide all menu sections
    document.querySelectorAll('.menu-section').forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none';
    });
    
    // Remove active from all toggle buttons
    document.querySelectorAll('.menu-toggle-btn').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected menu
    const selectedMenu = document.getElementById(type + '-menu');
    if(selectedMenu) {
        selectedMenu.classList.add('active');
        selectedMenu.style.display = 'block';
        setTimeout(() => {
            window.scrollTo({ top: selectedMenu.offsetTop - 150, behavior: 'smooth' });
        }, 100);
    }
    
    // Highlight active button
    if(btn) {
        btn.classList.add('active');
    }
}

/* =========================================
   3. LIVE TICKER SYSTEM
   ========================================= */
const msgs = [
    "🔥 NEW YEAR SALE: Use Code 'WELCOME10' for instant discount.",
    "⚡ System Status: Instant Delivery Online.",
    "🛵 Order #2891 just delivered to BH-4...",
    "🍰 Simran just pre-booked a Red Velvet Cake...",
    "🚀 App is 3x faster. Download now.",
    "🍟 Batch 4 of Samosas Frying Now..."
];
let msgIndex = 0;

function startTicker() {
    const el = document.getElementById('ticker-text');
    if(!el) return;
    
    setInterval(() => {
        el.style.opacity = 0; // Fade out
        setTimeout(() => {
            msgIndex = (msgIndex + 1) % msgs.length;
            el.innerText = msgs[msgIndex];
            el.style.opacity = 1; // Fade in
        }, 500);
    }, 4000);
}

/* =========================================
   4. SHOPPING CART LOGIC
   ========================================= */
let cart = [];

// ⚠️ IMPORTANT: Replace this with your actual Razorpay Key ID
// Go to https://dashboard.razorpay.com/app/keys to generate one
const RAZORPAY_KEY_ID = 'rzp_live_SARkNvIniIehhW'; 

function addToCart(name, price) {
    // Haptic Feedback for Mobile
    if(navigator.vibrate) navigator.vibrate([50, 30, 50]);

    // Check if item exists
    const existingItem = cart.find(item => item.name === name);
    if(existingItem) {
        existingItem.qty++;
        showToast(`✓ ${name} - Quantity Updated to ${existingItem.qty}`, 'success');
    } else {
        cart.push({ name: name, price: price, qty: 1 });
        showToast(`✓ Added to Cart! Tap bag icon to view →`, 'success');
    }
    updateCartUI();
    
    // Animate Cart Icon with Pulse
    const floatBtn = document.querySelector('.cart-float');
    if(floatBtn) {
        floatBtn.style.transform = 'scale(1.3)';
        floatBtn.classList.add('cart-pulse');
        setTimeout(() => {
            floatBtn.style.transform = 'scale(1)';
            floatBtn.classList.remove('cart-pulse');
        }, 400);
    }
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total');
    const btnTotalEl = document.getElementById('btn-pay-amt');
    const countBadge = document.getElementById('cart-count');

    // Calculate Totals
    let total = 0;
    let count = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;
    });

    // Update HTML elements
    if(countBadge) countBadge.innerText = count;
    if(totalEl) totalEl.innerText = '₹' + total;
    if(btnTotalEl) btnTotalEl.innerText = '₹' + total;

    // Render Items
    if(cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-msg">
                <i data-lucide="shopping-cart" size="40" style="opacity:0.5; margin-bottom:10px;"></i>
                <p>Your bag is empty.</p>
            </div>`;
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item-row">
            <div>
                <div class="item-name">${item.name}</div>
                <div style="font-size:0.8rem; color:#666;">₹${item.price} x ${item.qty}</div>
            </div>
            <div class="item-controls">
                <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                <span style="color:#fff; font-size:0.9rem; width:20px; text-align:center;">${item.qty}</span>
                <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
            </div>
        </div>
    `).join('');
}

function updateQty(index, change) {
    if(cart[index].qty + change <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].qty += change;
    }
    updateCartUI();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('active');
}



/* =========================================
   5. PAYMENT SYSTEM (RAZORPAY)
   ========================================= */
function processPayment() {
    console.log("🔄 Payment Processing Started...");
    
    // 1. Validation
    if(cart.length === 0) {
        console.warn("Cart is empty");
        showToast("❌ Your cart is empty! Add items first", 'error');
        return;
    }
    
    console.log("✅ Cart has items:", cart);
    
    const nameEl = document.getElementById('cust-name');
    const phoneEl = document.getElementById('cust-phone');
    const hostelEl = document.getElementById('cust-hostel');
    const roomEl = document.getElementById('cust-room');
    
    const name = nameEl ? nameEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const hostel = hostelEl ? hostelEl.value.trim() : '';
    const room = roomEl ? roomEl.value.trim() : '';
    
    console.log("Form Data:", {name, phone, hostel, room});

    if(!name || !phone || !hostel || !room) {
        console.error("Missing form fields");
        showToast("⚠️ Please fill all delivery details", 'warning');
        return;
    }
    
    console.log("✅ All fields filled");

    // 2. Calculate Total Amount
    let totalAmount = 0;
    cart.forEach(item => totalAmount += (item.price * item.qty));
    
    console.log("✅ Total Amount:", totalAmount);
    
    // 3. Check if Razorpay script is loaded
    if(typeof Razorpay === 'undefined') {
        console.error("❌ Razorpay script not loaded!");
        showToast("Payment system loading... Please try again!");
        return;
    }
    
    console.log("✅ Razorpay script loaded");
    
    // 4. Razorpay Options
    var options = {
        "key": "rzp_live_SARkNvIniIehhW", 
        "amount": totalAmount * 100, // Amount is in paise (₹1 = 100 paise)
        "currency": "INR",
        "name": "Hype",
        "description": "Snack Order - ₹" + totalAmount,
        "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=200&q=80",
        "handler": function (response){
            // Success Handler
            console.log("✅ Payment Successful! ID: " + response.razorpay_payment_id);
            showToast("Payment Successful!");
            paymentSuccess(response.razorpay_payment_id, totalAmount, {name, phone, hostel, room});
        },
        "prefill": {
            "name": name,
            "contact": phone
        },
        "theme": {
            "color": "#f59e0b"
        },
        "modal": {
            "ondismiss": function(){
                console.log('❌ Payment modal closed by user');
                showToast('Payment cancelled');
            }
        }
    };

    console.log("🎯 Opening Razorpay with options:", options);
    
    try {
        var rzp1 = new Razorpay(options);
        console.log("✅ Razorpay object created");
        
        rzp1.on('payment.failed', function (response){
            console.error("❌ Payment Failed: ", response.error);
            showToast("Payment failed: " + response.error.description);
        });
        
        rzp1.open();
        console.log("✅ Razorpay checkout opened");
    } catch (e) {
        console.error("❌ Payment System Error: ", e);
        showToast("Payment error. Try Razorpay Link method!");
        // Fallback to Razorpay link after delay
        setTimeout(() => {
            console.log("📌 Falling back to Razorpay Link");
            openRazorpayLink();
        }, 500);
    }
}

function openRazorpayLink() {
    // 1. Validation (Same as processPayment)
    if(cart.length === 0) return showToast("Cart is empty!");
    
    const nameEl = document.getElementById('cust-name');
    const phoneEl = document.getElementById('cust-phone');
    const hostelEl = document.getElementById('cust-hostel');
    const roomEl = document.getElementById('cust-room');
    
    const name = nameEl.value;
    const phone = phoneEl.value;
    const hostel = hostelEl.value;
    const room = roomEl.value;
    
    // Get Google Maps URL if available (from geolocation)
    const mapUrl = roomEl.dataset.mapUrl || null;
    const latitude = roomEl.dataset.latitude || null;
    const longitude = roomEl.dataset.longitude || null;

    if(!name || !phone || !hostel || !room) {
        alert("Please fill in all delivery details (Name, Phone, Location).");
        return;
    }

    // 2. Calculate Total Amount
    let totalAmount = 0;
    cart.forEach(item => totalAmount += (item.price * item.qty));
    
    // 3. Construct Order Summary with Google Maps link if available
    const orderItems = cart.map(i => `${i.qty}x ${i.name}`).join(', ');
    
    // Generate location string with map link if geolocation was used
    let locationString = `${hostel} - Room ${room}`;
    if (mapUrl) {
        locationString += ` %0A🗺️ *Google Maps:* ${mapUrl}`;
    }
    
    const orderNote =
  `🛒 *NEW ORDER RECEIVED (WhatsApp)* %0A` +
  `━━━━━━━━━━━━━━━━━━%0A` +
  `💰 *Total Amount:* ₹${totalAmount}%0A` +
  `📦 *Items Ordered:* %0A${orderItems}%0A` +
  `━━━━━━━━━━━━━━━━━━%0A` +
  `👤 *Customer Name:* ${name}%0A` +
  `📍 *Delivery Location:* ${locationString}%0A` +
  `📞 *Contact Number:* ${phone}%0A` +
  `━━━━━━━━━━━━━━━━━━%0A` +
  `💳 *Payment Method:* UPI (Pay on this)%0A` +
  `🔗 *UPI ID:* 7297810859@slc%0A` +
  `🙏 Please complete the payment and share the screenshot for confirmation.`;

    
    // 4. Send order details to WhatsApp
    const whatsappMessage = `https://wa.me/917297810859?text=${orderNote}`;
    
    // 5. Open WhatsApp first with the message
    window.open(whatsappMessage, '_blank');
    
    // 6. Then clear Cart & Close Modal after opening WhatsApp
    setTimeout(() => {
        toggleCart();
        cart = []; 
        updateCartUI();
        
        // 7. Then open Razorpay payment link
        window.open('https://razorpay.me/@sunilkumarmehta6544', '_blank');
    }, 500);
}

function paymentSuccess(paymentId, amount, details) {
    // Construct Order Summary
    const orderItems = cart.map(i => `${i.qty}x ${i.name}`).join(', ');
    
    // Get Google Maps URL if available
    const roomEl = document.getElementById('cust-room');
    const mapUrl = roomEl ? roomEl.dataset.mapUrl : null;
    
    let locationString = `${details.hostel} - ${details.room}`;
    if (mapUrl) {
        locationString += `%0A🗺️ Google Maps: ${mapUrl}`;
    }
    
    const msg = `*NEW ORDER PAID* ✅%0A` +
                `*ID:* ${paymentId}%0A` +
                `*Amt:* ₹${amount}%0A` +
                `*Items:* ${orderItems}%0A` +
                `----------------%0A` +
                `*Name:* ${details.name}%0A` +
                `*Loc:* ${locationString}%0A` +
                `*Phone:* ${details.phone}`;
                
    // Clear Cart & Close Modal
    toggleCart();
    cart = []; 
    updateCartUI();
    
    // Redirect to WhatsApp
    window.location.href = `https://wa.me/917297810859?text=${msg}`;
}

/* =========================================
   6. UNIFIED SUPER MODAL (Welcome + App)
   ========================================= */
window.addEventListener('load', () => {
    // Show after 2.5 seconds if not seen before in this session
    if (!sessionStorage.getItem('unifiedModalSeen')) {
        setTimeout(() => {
            const modal = document.getElementById('unified-modal');
            if(modal) {
                modal.style.display = 'flex';
                // Trigger simple vibration on mobile
                if(navigator.vibrate) navigator.vibrate(50);
            }
        }, 2500); 
    }
    
    // Start Ticker
    startTicker();
});

function closeUnifiedModal() {
    const modal = document.getElementById('unified-modal');
    if(modal) modal.style.display = 'none';
    sessionStorage.setItem('unifiedModalSeen', 'true');
}

function copyCode() {
    const code = document.getElementById('coupon-text').innerText;
    
    // Modern Clipboard API
    navigator.clipboard.writeText(code).then(() => {
        const feedback = document.getElementById('copy-feedback');
        if(feedback) {
            feedback.innerText = "COPIED TO CLIPBOARD!";
            feedback.style.color = "#10b981"; // Green color
        }
        
        // Animate the box border
        const box = document.querySelector('.coupon-box');
        if(box) box.style.borderColor = "#10b981";
        
        if(navigator.vibrate) navigator.vibrate(50);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

/* =========================================
   GEOLOCATION SYSTEM - Share Current Location
   ========================================= */
function shareCurrentLocation() {
    const statusDiv = document.getElementById('location-status');
    const roomInput = document.getElementById('cust-room');
    const hostelSelect = document.getElementById('cust-hostel');
    
    if (!navigator.geolocation) {
        statusDiv.innerHTML = "❌ Geolocation not supported on this device";
        statusDiv.style.color = "#ef4444";
        showToast("Geolocation not supported");
        return;
    }
    
    statusDiv.innerHTML = "📍 Getting your location...";
    statusDiv.style.color = "#d4af37";
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            
            // Generate Google Maps URL
            const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            
            // Create clickable link HTML
            const mapLink = `<a href="${googleMapsURL}" target="_blank" style="color: #d4af37; text-decoration: underline; font-weight: 600; cursor: pointer;">📍 ${latitude.toFixed(6)}, ${longitude.toFixed(6)}</a>`;
            
            // Store the coordinates in a hidden field for form submission
            roomInput.value = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            roomInput.dataset.mapUrl = googleMapsURL;
            roomInput.dataset.latitude = latitude;
            roomInput.dataset.longitude = longitude;
            
            hostelSelect.value = "CUSTOM";
            
            statusDiv.innerHTML = `✅ <strong>Location Captured!</strong><br>Accuracy: ±${Math.round(accuracy)}m<br>${mapLink}`;
            statusDiv.style.color = "#10b981";
            
            console.log("📍 Geolocation Data:", {
                latitude: latitude.toFixed(6),
                longitude: longitude.toFixed(6),
                accuracy: Math.round(accuracy),
                googleMapsURL: googleMapsURL,
                timestamp: new Date().toLocaleString()
            });
            
            showToast("✅ Location captured! Click status to open in Google Maps");
            
            // Optional: Get reverse geocoding info
            getReverseGeocodeInfo(latitude, longitude, statusDiv, mapLink);
        },
        (error) => {
            let errorMsg = "";
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMsg = "❌ Permission denied. Enable location in device settings.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMsg = "❌ Location unavailable. Try again in a few moments.";
                    break;
                case error.TIMEOUT:
                    errorMsg = "❌ Location request timed out. Please retry.";
                    break;
                default:
                    errorMsg = "❌ Error getting location.";
            }
            statusDiv.innerHTML = errorMsg;
            statusDiv.style.color = "#ef4444";
            showToast(errorMsg);
            console.error("Geolocation Error:", error);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Get readable location name from coordinates (using OpenStreetMap Nominatim - free)
function getReverseGeocodeInfo(lat, lng, statusDiv, mapLink) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    
    fetch(url, {
        headers: { 'Accept-Language': 'en' }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.address) {
            const address = data.address;
            const placeName = address.neighbourhood || address.suburb || address.village || address.town || address.city || address.road || "Location";
            const fullAddress = data.display_name ? data.display_name.split(',').slice(0, 3).join(',') : placeName;
            
            // Update status with location name
            statusDiv.innerHTML = `✅ <strong>${placeName}</strong><br><span style="font-size: 0.85rem; color: #aaa;">${fullAddress}</span><br>${mapLink}`;
            
            console.log("📍 Reverse Geocode Info:", {
                placeName: placeName,
                fullAddress: fullAddress,
                addressData: address
            });
        }
    })
    .catch(err => console.error("Reverse geocoding error:", err));
}