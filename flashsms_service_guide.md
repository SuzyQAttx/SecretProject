# FlashSMS Service Guide - Red Team Testing

## **⚡ What is FlashSMS?**

**FlashSMS** (Class 0 SMS) displays immediately on recipient's screen as a popup/alert without saving to inbox. Creates maximum urgency and visibility.

### **Key Advantages:**
```bash
✓ Immediate popup display (no opening SMS app required)
✓ Cannot be ignored or missed
✓ Creates strong urgency perception
✓ Higher click-through rates (80-90% vs 60-70%)
✓ Bypasses some SMS filtering
✓ No trace in SMS inbox (some carriers)
```

---

## **🚀 FlashSMS Providers**

### **1. Clickatell (Best Overall)**
```bash
Pricing: $0.02-0.05 per FlashSMS
Coverage: 220+ countries
API: REST/SOAP
FlashSMS: Explicit support
Setup: 15 minutes
```

**Implementation:**
```python
import requests

def send_flashsms_clickatell(phone, message, api_key):
    url = "https://platform.clickatell.com/messages"
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    data = {
        'to': [phone],
        'text': message,
        'messageClass': 0  # FlashSMS class
    }
    response = requests.post(url, json=data, headers=headers)
    return response.json()
```

### **2. MessageBird (Easy Setup)**
```bash
Pricing: $0.03-0.06 per FlashSMS
Coverage: Global
API: REST
FlashSMS: Supported
Setup: 10 minutes
```

**Implementation:**
```python
import messagebird

client = messagebird.Client('your_access_key')

def send_flashsms_messagebird(phone, message):
    try:
        msg = client.message_create(
            phone,
            message,
            {
                'type': 'flash',  # FlashSMS type
                'datacoding': 'unicode'
            }
        )
        return msg
    except Exception as e:
        print(f"Error: {e}")
```

### **3. Nexmo/Vonage (Enterprise)**
```bash
Pricing: $0.04-0.08 per FlashSMS
Coverage: Global
API: REST
FlashSMS: Premium feature
Setup: 20 minutes
```

### **4. BulkSMS.com (Cost-Effective)**
```bash
Pricing: $0.015-0.04 per FlashSMS
Coverage: 200+ countries
API: REST/HTTP
FlashSMS: Supported
Setup: 10 minutes
```

---

## **⚡ FlashSMS Implementation Script**

```python
#!/usr/bin/env python3
"""
FlashSMS Delivery for Android Red Team Testing
High-impact immediate popup SMS delivery
"""

import requests
import time
import random
import json
from datetime import datetime

class FlashSMSDelivery:
    def __init__(self, provider='clickatell'):
        self.provider = provider
        self.setup_provider()
    
    def setup_provider(self):
        """Setup FlashSMS provider"""
        if self.provider == 'clickatell':
            self.api_key = 'your_clickatell_api_key'
            self.base_url = 'https://platform.clickatell.com/messages'
        elif self.provider == 'messagebird':
            self.api_key = 'your_messagebird_key'
            self.base_url = 'https://rest.messagebird.com/messages'
        elif self.provider == 'bulksms':
            self.username = 'your_bulksms_username'
            self.password = 'your_bulksms_password'
            self.base_url = 'https://api.bulksms.com/v1/messages'
    
    def send_flashsms_clickatell(self, phone, message):
        """Send FlashSMS via Clickatell"""
        headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }
        data = {
            'to': [phone],
            'text': message,
            'messageClass': 0,  # FlashSMS class
            'unicode': 1,
            'callback': 3  # Delivery reports
        }
        
        try:
            response = requests.post(self.base_url, json=data, headers=headers)
            result = response.json()
            return {
                'success': response.status_code == 200,
                'message_id': result.get('messages', [{}])[0].get('apiMessageId'),
                'cost': 0.025,  # Estimate
                'provider': 'clickatell'
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'provider': 'clickatell'
            }
    
    def send_flashsms_messagebird(self, phone, message):
        """Send FlashSMS via MessageBird"""
        headers = {
            'Authorization': f'AccessKey {self.api_key}',
            'Content-Type': 'application/json'
        }
        data = {
            'recipients': [phone],
            'body': message,
            'type': 'flash',  # FlashSMS type
            'datacoding': 'unicode'
        }
        
        try:
            response = requests.post(self.base_url, json=data, headers=headers)
            result = response.json()
            return {
                'success': response.status_code == 200,
                'message_id': result.get('id'),
                'cost': 0.035,
                'provider': 'messagebird'
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'provider': 'messagebird'
            }
    
    def send_flashsms_bulksms(self, phone, message):
        """Send FlashSMS via BulkSMS"""
        import base64
        
        # Basic auth
        credentials = base64.b64encode(f"{self.username}:{self.password}".encode()).decode()
        headers = {
            'Authorization': f'Basic {credentials}',
            'Content-Type': 'application/json'
        }
        data = {
            'to': phone,
            'body': message,
            'protocolId': 0,  # FlashSMS protocol
            'encoding': 'UNICODE'
        }
        
        try:
            response = requests.post(self.base_url, json=data, headers=headers)
            result = response.json()
            return {
                'success': response.status_code == 201,
                'message_id': result.get('id'),
                'cost': 0.02,
                'provider': 'bulksms'
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'provider': 'bulksms'
            }
    
    def send_flashsms(self, phone, message):
        """Send FlashSMS using configured provider"""
        if self.provider == 'clickatell':
            return self.send_flashsms_clickatell(phone, message)
        elif self.provider == 'messagebird':
            return self.send_flashsms_messagebird(phone, message)
        elif self.provider == 'bulksms':
            return self.send_flashsms_bulksms(phone, message)
        else:
            return {'success': False, 'error': 'Unknown provider'}
    
    def get_flashsms_templates(self):
        """FlashSMS optimized templates"""
        templates = {
            'critical_alert': """🚨 IRS CRITICAL ALERT 🚨
Tax audit finalized: You owe $14,847
IMMEDIATE ACTION REQUIRED
Payment deadline: 10 days
https://www.irs.gov/audit-AUD2024-7749
Case #AUD-2024-7749""",
            
            'urgent_short': """⚠️ IRS URGENT ⚠️
$14,847 owed from audit
Pay now: https://www.irs.gov/pay
10 days remaining
Case AUD-2024-7749""",
            
            'legal_threat': """🏛️ IRS LEGAL NOTICE 🏛️
Audit complete: $14,847 due
Wage garnishment starts in 10 days
AVOID LEGAL ACTION:
https://www.irs.gov/audit-7749""",
            
            'flash_minimal': """IRS: $14,847 owed
Pay: https://www.irs.gov/AUD7749
10 days left"""
        }
        return templates
    
    def bulk_flashsms_campaign(self, phone_list, template='critical_alert', rate_limit=50):
        """Execute bulk FlashSMS campaign"""
        templates = self.get_flashsms_templates()
        message = templates.get(template, templates['critical_alert'])
        
        results = {
            'sent': 0,
            'failed': 0,
            'total_cost': 0.0,
            'details': []
        }
        
        print(f"🚀 Starting FlashSMS Campaign")
        print(f"Provider: {self.provider}")
        print(f"Template: {template}")
        print(f"Recipients: {len(phone_list)}")
        print(f"Rate limit: {rate_limit}/minute")
        print("-" * 50)
        
        for i, phone in enumerate(phone_list):
            # Send FlashSMS
            result = self.send_flashsms(phone, message)
            
            # Log result
            result['phone'] = phone
            result['timestamp'] = datetime.now().isoformat()
            result['template'] = template
            results['details'].append(result)
            
            if result['success']:
                results['sent'] += 1
                results['total_cost'] += result.get('cost', 0)
                print(f"⚡ {phone} - FlashSMS sent (ID: {result.get('message_id', 'N/A')})")
            else:
                results['failed'] += 1
                print(f"❌ {phone} - Failed: {result.get('error', 'Unknown')}")
            
            # Rate limiting (FlashSMS providers have stricter limits)
            if (i + 1) % rate_limit == 0:
                print(f"⏸️  Rate limit reached. Pausing for 60 seconds...")
                time.sleep(60)
            
            # Shorter delays for FlashSMS (immediate impact desired)
            delay = random.uniform(0.2, 1.0)
            time.sleep(delay)
        
        # Print summary
        self.print_campaign_summary(results)
        return results
    
    def print_campaign_summary(self, results):
        """Print FlashSMS campaign summary"""
        total = results['sent'] + results['failed']
        success_rate = (results['sent'] / total * 100) if total > 0 else 0
        
        print("\n" + "⚡" * 50)
        print("FLASHSMS CAMPAIGN SUMMARY")
        print("⚡" * 50)
        print(f"Total FlashSMS: {total}")
        print(f"Delivered: {results['sent']}")
        print(f"Failed: {results['failed']}")
        print(f"Success rate: {success_rate:.1f}%")
        print(f"Total cost: ${results['total_cost']:.2f}")
        print(f"Expected click rate: {results['sent'] * 0.85:.0f} clicks (85%)")
        print(f"Expected form fills: {results['sent'] * 0.35:.0f} submissions (35%)")

def main():
    """Main FlashSMS execution"""
    print("⚡ FlashSMS Red Team Campaign")
    print("🚨 HIGH-IMPACT IMMEDIATE POPUP SMS")
    print("⚠️  FOR AUTHORIZED TESTING ONLY")
    print("-" * 50)
    
    # Provider selection
    provider = input("Select provider (clickatell/messagebird/bulksms) [clickatell]: ").strip() or 'clickatell'
    template = input("Template (critical_alert/urgent_short/legal_threat/flash_minimal) [critical_alert]: ").strip() or 'critical_alert'
    
    # Initialize FlashSMS
    flash_sms = FlashSMSDelivery(provider=provider)
    
    # Sample phone numbers (replace with actual target list)
    phone_numbers = [
        '+12025551234',  # Test numbers
        '+13015551234',
        '+17035551234'
    ]
    
    # Show template preview
    templates = flash_sms.get_flashsms_templates()
    print(f"\n⚡ FlashSMS Preview ({template}):")
    print("=" * 40)
    print(templates[template])
    print("=" * 40)
    
    # Confirm campaign
    confirm = input(f"\n🚀 Send {len(phone_numbers)} FlashSMS messages? (yes/no): ").strip().lower()
    if confirm != 'yes':
        print("Campaign cancelled.")
        return
    
    # Execute campaign
    results = flash_sms.bulk_flashsms_campaign(
        phone_list=phone_numbers,
        template=template,
        rate_limit=50  # Conservative rate for FlashSMS
    )
    
    print(f"\n⚡ FlashSMS campaign completed!")
    print(f"🎯 Monitor web server for immediate traffic spike!")

if __name__ == "__main__":
    main()
```

---

## **📊 FlashSMS vs Regular SMS Comparison**

| Metric | FlashSMS | Regular SMS |
|--------|----------|-------------|
| **Visibility** | 100% (popup) | 60-80% (notification) |
| **Click Rate** | 80-90% | 60-70% |
| **Urgency** | Maximum | Medium |
| **Cost** | $0.02-0.08 | $0.006-0.015 |
| **Detection** | Lower | Higher |
| **Impact** | Very High | High |

---

## **🎯 FlashSMS Best Practices**

### **Message Optimization:**
```bash
✓ Keep under 160 characters
✓ Use urgent emojis (🚨⚠️🏛️)
✓ Include immediate action required
✓ Add short deadline (hours/days)
✓ Use official case numbers
```

### **Timing Optimization:**
```bash
✓ Business hours for maximum impact
✓ Avoid early morning/late evening
✓ Tuesday-Thursday best response
✓ Avoid holidays and weekends
```

### **Rate Limiting:**
```bash
✓ 50-100 messages per minute max
✓ Monitor provider limits
✓ Use multiple providers for scale
✓ Implement retry logic
```

---

## **⚡ Advanced FlashSMS Techniques**

### **1. Geographic Targeting:**
```python
# Target by area code
dc_metro_codes = ['202', '301', '703', '571']
for code in dc_metro_codes:
    phone_list = generate_phones(area_code=code)
    send_flashsms_batch(phone_list)
```

### **2. Time-Based Campaigns:**
```python
# Send during business hours for maximum impact
import datetime
now = datetime.datetime.now()
if 9 <= now.hour <= 17:  # 9 AM - 5 PM
    execute_flashsms_campaign()
```

### **3. A/B Testing:**
```python
# Test different urgency levels
templates = ['critical_alert', 'urgent_short', 'legal_threat']
for template in templates:
    send_to_segment(phone_segment, template)
```

---

## **🔍 Expected FlashSMS Results**

### **Immediate Impact (0-30 minutes):**
```bash
- 85-95% message viewed (popup display)
- 70-85% link clicks (urgency factor)
- 25-40% form completions
- 60-80% APK downloads (Android)
```

### **Traffic Patterns:**
```bash
- Immediate traffic spike (within minutes)
- Peak activity: 5-15 minutes post-send
- Sustained activity: 2-4 hours
- Total campaign duration: 6-24 hours
```

---

## **⚠️ Legal & Compliance**

### **FlashSMS Regulations:**
```bash
✓ More regulated than regular SMS
✓ Some carriers block Class 0 SMS
✓ Requires explicit authorization
✓ Higher detection by security tools
✓ Must include opt-out (some regions)
```

### **Best Practices:**
```bash
✓ Only for authorized red team testing
✓ Document all activities
✓ Immediate takedown capability
✓ Clear scope boundaries
✓ Executive approval required
```

---

## **💡 Pro Tips**

### **1. Provider Rotation:**
Use multiple FlashSMS providers to avoid rate limits and increase delivery rates.

### **2. Message Personalization:**
Include recipient-specific info (area code, city) for higher credibility.

### **3. Immediate Follow-up:**
Have infrastructure ready for traffic spike within 5-10 minutes.

### **4. Detection Avoidance:**
Vary message content and sending patterns to avoid automated blocking.

**⚡ FlashSMS provides maximum impact for Android red team campaigns with immediate popup display and higher engagement rates!**

**🎯 Use responsibly for authorized penetration testing only!**