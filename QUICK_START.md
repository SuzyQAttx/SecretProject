# Quick Start - Mock Social Engineering Challenge

## Setup (External Attacker Simulation)

This simulates a realistic attack where you have **NO** prior access to the target device.

### 1. Start Infrastructure
```bash
# Terminal 1: Start your existing HTML server
python3 -m http.server 8000

# Terminal 2: Start C2 data collection server
python3 c2_server.py
```

### 2. Attack Vector Deployment

**Phishing Site**: `http://localhost:8000`
- Serves your existing IRS phishing page
- JavaScript automatically attempts data exfiltration
- Cross-origin attacks to localhost:5000

**C2 Server**: `http://localhost:5000`
- Collects exfiltrated data
- Serves malicious APK
- Multiple backup channels

### 3. Test the Attack Chain

1. **Visit phishing site** on target device: `http://localhost:8000`
2. **Fill out form** with test data
3. **Click "Pay Now"** button
4. **Monitor C2 server** for data collection

### 4. Monitor Attack Success

```bash
# View collected data in real-time
curl http://localhost:5000/stats

# View all collected data
curl http://localhost:5000/data

# Clear data for next test
curl http://localhost:5000/clear
```

## Attack Methods Deployed

### 1. **Data Exfiltration**
- ✅ Form data harvesting (SSN, payment info)
- ✅ Device fingerprinting  
- ✅ Multiple exfiltration channels
- ✅ Fallback image beacons

### 2. **Mobile Exploitation**
- ✅ APK social engineering download
- ✅ WebView JavaScript bridge attacks
- ✅ Android Intent scheme exploitation
- ✅ Clipboard manipulation

### 3. **Persistence Techniques**
- ✅ localStorage data persistence
- ✅ Multiple C2 channels
- ✅ Base64 encoded beacons
- ✅ CORS bypass attempts
- ✅ Stealth image tracking

## Expected Results

When someone visits your localhost:8000 phishing site:

1. **Device fingerprint** automatically collected
2. **Form submission** triggers multiple exfiltration attempts
3. **Mobile devices** get APK download prompts
4. **All data** logged to `redteam_data.json`

## Success Indicators

```bash
# Check if attack is working
tail -f redteam_data.json

# You should see:
# - device_fingerprint events (page visits)
# - form_data events (successful submissions)  
# - image_beacon events (fallback channels)
# - apk_download events (mobile targets)
```

## Challenge Objectives

- [ ] Deploy phishing site successfully
- [ ] Collect device fingerprints from visitors
- [ ] Harvest form data (credentials/payment info)
- [ ] Deliver mobile APK payload
- [ ] Demonstrate data exfiltration
- [ ] Document attack effectiveness

## Cleanup

```bash
# Stop servers
Ctrl+C in both terminals

# Remove collected data
rm -f redteam_data.json

# Remove test APK
rm -f irs_security_update.apk
```

## Notes for Educational Use

This setup simulates a **realistic external attack** where:
- No prior device access
- No IP addresses known
- Must rely on social engineering
- Multiple attack vectors for redundancy
- Educational payload demonstration

Perfect for **authorized red team exercises** and **cybersecurity training**.