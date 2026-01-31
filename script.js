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
// const RAZORPAY_KEY_ID = 'rzp_live_SARkNvIniIehhW'; 

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
    const subtotalEl = document.getElementById('cart-subtotal');
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
    if(subtotalEl) subtotalEl.innerText = '₹' + total;
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
    updatePaymentSummary();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('active');
    if(modal.classList.contains('active')) {
        // Reset to first tab when opening cart
        switchTab('tab-items');
        updatePaymentSummary();
    }
}

/* =========================================
   4B. UNIFIED CART TABS SYSTEM
   ========================================= */
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.unified-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if(selectedTab) {
        selectedTab.classList.add('active');
        
        // Update payment summary when switching to payment tab
        if(tabName === 'tab-payment') {
            updatePaymentSummary();
        }
        
        // Scroll to top of tab content
        setTimeout(() => {
            const tabContent = selectedTab.querySelector('.cart-body, [id*="input-group"]:first-child');
            if(tabContent) {
                selectedTab.scrollTop = 0;
            }
        }, 50);
    }
}

function updatePaymentSummary() {
    const summaryContainer = document.getElementById('payment-items-summary');
    const deliveryNameEl = document.getElementById('delivery-summary-name');
    const deliveryAddressEl = document.getElementById('delivery-summary-address');
    
    if(summaryContainer) {
        if(cart.length === 0) {
            summaryContainer.innerHTML = '<div style="text-align: center; color: #888;">No items selected</div>';
        } else {
            summaryContainer.innerHTML = cart.map(item => `
                <div class="payment-item">
                    <span>${item.name} x${item.qty}</span>
                    <span style="color: var(--accent); font-weight: 600;">₹${item.price * item.qty}</span>
                </div>
            `).join('');
        }
    }
    
    // Update delivery summary with form values
    const custName = document.getElementById('cust-name').value?.trim() || '';
    const custRoom = document.getElementById('cust-room').value?.trim() || '';
    const custType = document.getElementById('cust-type').value?.trim() || '';
    const custPhone = document.getElementById('cust-phone').value?.trim() || '';
    
    if(deliveryNameEl) {
        if(custName) {
            deliveryNameEl.innerText = custName;
            deliveryNameEl.style.color = '#fff';
        } else {
            deliveryNameEl.innerText = 'Please fill delivery info';
            deliveryNameEl.style.color = '#ff6b6b';
        }
    }
    
    if(deliveryAddressEl) {
        if(custRoom && custType && custPhone) {
            deliveryAddressEl.innerText = `${custRoom} (${custType}) • ${custPhone}`;
            deliveryAddressEl.style.color = '#10b981';
        } else {
            const missing = [];
            if(!custPhone) missing.push('phone');
            if(!custType) missing.push('location type');
            if(!custRoom) missing.push('address');
            deliveryAddressEl.innerText = `Missing: ${missing.join(', ')}`;
            deliveryAddressEl.style.color = '#ff6b6b';
        }
    }
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
    const addressEl = document.getElementById('cust-room');
    const typeEl = document.getElementById('cust-type');
    const noteEl = document.getElementById('delivery-note');
    
    const name = nameEl ? nameEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const address = addressEl ? addressEl.value.trim() : '';
    const locationType = typeEl ? typeEl.value.trim() : '';
    const note = noteEl ? noteEl.value.trim() : '';
    
    console.log("Form Data:", {name, phone, address, locationType, note});

    if(!name || !phone || !address || !locationType) {
        console.error("Missing form fields");
        const missing = [];
        if(!name) missing.push('Name');
        if(!phone) missing.push('Phone');
        if(!address) missing.push('Address');
        if(!locationType) missing.push('Location Type');
        showToast(`⚠️ Missing: ${missing.join(', ')}`, 'warning');
        switchTab('tab-delivery'); // Go back to delivery tab
        return;
    }
    
    // Validate phone number (should be 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if(!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
        showToast("⚠️ Phone number must be 10 digits", 'warning');
        switchTab('tab-delivery');
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
            paymentSuccess(response.razorpay_payment_id, totalAmount, {name, phone, area, address, locationType});
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
    console.log("🔵 PAY VIA WHATSAPP button clicked");
    
    // 1. Validation
    if(cart.length === 0) {
        showToast("❌ Cart is empty! Add items first", 'error');
        console.error("Cart is empty");
        return;
    }
    console.log("✅ Cart has items:", cart.length);
    
    const nameEl = document.getElementById('cust-name');
    const phoneEl = document.getElementById('cust-phone');
    const addressEl = document.getElementById('cust-room');
    const typeEl = document.getElementById('cust-type');
    
    const name = nameEl ? nameEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const address = addressEl ? addressEl.value.trim() : '';
    const locationType = typeEl ? typeEl.value.trim() : 'General';
    const note = document.getElementById('delivery-note') ? document.getElementById('delivery-note').value.trim() : '';
    
    console.log("📋 Form Data:", {name, phone, address, locationType});
    
    // Validate all required fields
    if(!name || !phone || !address || !locationType) {
        const missing = [];
        if(!name) missing.push('Name');
        if(!phone) missing.push('Phone');
        if(!address) missing.push('Address');
        if(!locationType) missing.push('Location Type');
        showToast(`⚠️ Missing: ${missing.join(', ')}`, 'warning');
        console.warn("Missing fields:", missing);
        switchTab('tab-delivery');
        return;
    }
    
    // Validate phone number (should be 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if(!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
        showToast("⚠️ Phone number must be 10 digits", 'warning');
        console.warn("Invalid phone format:", phone);
        switchTab('tab-delivery');
        return;
    }
    
    console.log("✅ All validations passed");
    
    // Get location type display name
    const locationTypeMap = {
        'home': '🏠 Home',
        'apartment': '🏢 Apartment',
        'pg': '🛏️ PG/Hostel',
        'office': '🏛️ Office',
        'shop': '🏪 Shop'
    };
    const locationTypeDisplay = locationTypeMap[locationType] || locationType;
    
    // 2. Calculate Total Amount
    let totalAmount = 0;
    cart.forEach(item => totalAmount += (item.price * item.qty));
    console.log("💰 Total Amount:", totalAmount);
    
    // Build Google Maps URL
    const locationLat = addressEl.dataset.latitude || null;
    const locationLng = addressEl.dataset.longitude || null;
    console.log("📍 GPS Coordinates:", {locationLat, locationLng});
    
    const mapsUrl = locationLat && locationLng
      ? `https://www.google.com/maps?q=${locationLat},${locationLng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    
    console.log("🗺️ Maps URL:", mapsUrl);
    
    // Build WhatsApp message
    const orderNote = `🛍️ *NEW ORDER — HYPE DELIVERY*

💰 *TOTAL AMOUNT:* ₹${totalAmount}

📦 *ORDER ITEMS:*
${cart.map(i => `• ${i.qty} × ${i.name} — ₹${i.price * i.qty}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━

👤 *CUSTOMER DETAILS*
Name: ${name}
Phone: ${phone}

📍 *DELIVERY ADDRESS*
${address}
(${locationTypeDisplay})

🗺️ *GOOGLE MAP LOCATION*
${mapsUrl}

━━━━━━━━━━━━━━━━━━━━━━

💳 *PAYMENT STATUS:* PENDING
UPI ID: 7297810859@slc
Account Name: MR SUNIL KUMAR MEHTA

🔗 *PAY VIA UPI*
upi://pay?pa=7297810859@slc&pn=SUNIL&am=${totalAmount}

✅ *Please complete the payment and reply with the payment screenshot to confirm your order.*`;
    
    console.log("📱 Building WhatsApp message...");
    
    // Send to WhatsApp
    const whatsappMessage = `https://wa.me/917297810859?text=${encodeURIComponent(orderNote)}`;
    console.log("✅ Opening WhatsApp...");
    
    showToast('📱 Opening WhatsApp...', 'info');
    setTimeout(() => {
        window.open(whatsappMessage, '_blank');
        console.log("✅ WhatsApp window opened");
    }, 300);
    
    // Clear cart and close modal
    setTimeout(() => {
        showToast('✅ Order sent! Complete payment...', 'success');
        toggleCart();
        cart = []; 
        updateCartUI();
        console.log("✅ Cart cleared and modal closed");
    }, 800);
    
    // Open UPI payment
    setTimeout(() => {
        window.open('upi://pay?pa=7297810859@slc&pn=SUNIL&am=' + totalAmount, '_blank');
        console.log("✅ UPI payment window opened");
    }, 1200);
}

function paymentSuccess(paymentId, amount, details) {
    // Show immediate confirmation
    showToast('✅ Payment successful! Order details being sent...', 'success');
    
    // Construct Order Summary
    const orderItems = cart.map(i => `${i.qty}x ${i.name}`).join(', ');
    
    // Get location type display name
    const locationTypeMap = {
        'home': '🏠 Home',
        'apartment': '🏢 Apartment',
        'pg': '🛏️ PG/Hostel',
        'office': '🏛️ Office',
        'shop': '🏪 Shop'
    };
    const locationTypeDisplay = locationTypeMap[details.locationType] || details.locationType;
    
    // Get Google Maps URL if available
    const addressEl = document.getElementById('cust-room');
    const mapUrl = addressEl ? addressEl.dataset.mapUrl : null;
    
    let locationString = `${details.area} - ${details.address} (${locationTypeDisplay})`;
    if (mapUrl) {
        // Properly encode the map URL
        locationString += `%0A🗺️ Google Maps: ${encodeURIComponent(mapUrl)}`;
    }
    
    const msg = `✅ ORDER PAID - Hype Delivery%0A` +
                `ID: ${paymentId}%0A` +
                `Amount: ₹${amount}%0A` +
                `Items: ${orderItems}%0A` +
                `────────────────%0A` +
                `Name: ${details.name}%0A` +
                `Address: ${locationString}%0A` +
                `Phone: ${details.phone}`;
                
    // Clear Cart & Close Modal
    toggleCart();
    cart = []; 
    updateCartUI();
    
    // Redirect to WhatsApp with encoded message
    setTimeout(() => {
        window.location.href = `https://wa.me/917297810859?text=${encodeURIComponent(msg)}`;
    }, 1000);
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
   GEOLOCATION SYSTEM - Auto Fill Location
   ========================================= */
function autoFillLocation() {
    const statusDiv = document.getElementById('location-quick-status');
    const roomInput = document.getElementById('cust-room');
    
    if (!navigator.geolocation) {
        statusDiv.innerHTML = "❌ Geolocation not supported";
        statusDiv.style.color = "#ef4444";
        showToast("Geolocation not supported");
        return;
    }
    
    statusDiv.innerHTML = "📍 Getting location...";
    statusDiv.style.color = "#d4af37";
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            
            // Generate Google Maps URL
            const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            
            // Store coordinates and map link
            roomInput.value = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            roomInput.dataset.mapUrl = googleMapsURL;
            roomInput.dataset.latitude = latitude;
            roomInput.dataset.longitude = longitude;
            
            statusDiv.innerHTML = `✅ Location detected (±${Math.round(accuracy)}m)`;
            statusDiv.style.color = "#10b981";
            
            getReverseGeocodeInfo(latitude, longitude, statusDiv);
            showToast("✅ Location captured!");
        },
        (error) => {
            let errorMsg = "❌ ";
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMsg += "Enable location access";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMsg += "Location unavailable";
                    break;
                case error.TIMEOUT:
                    errorMsg += "Request timed out";
                    break;
                default:
                    errorMsg += "Error getting location";
            }
            statusDiv.innerHTML = errorMsg;
            statusDiv.style.color = "#ef4444";
            showToast(errorMsg);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

function shareCurrentLocation() {
    autoFillLocation();
}
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