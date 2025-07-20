# Magisk Setup for Security Testing

## Prerequisites
- Unlocked bootloader on test device
- ADB and Fastboot installed
- Custom recovery (TWRP recommended)

## Download Magisk
```bash
# Download latest Magisk APK
curl -L -o magisk.apk https://github.com/topjohnwu/Magisk/releases/latest/download/Magisk-v26.4.apk

# Download Magisk Manager
curl -L -o magisk_manager.apk https://github.com/topjohnwu/Magisk/releases/latest/download/app-release.apk
```

## Installation Steps

### Method 1: Via Custom Recovery
1. Boot into recovery mode
2. Flash Magisk ZIP file
3. Reboot system

### Method 2: Patch Boot Image
```bash
# Extract boot.img from device firmware
adb shell su -c "dd if=/dev/block/bootdevice/by-name/boot of=/sdcard/boot.img"
adb pull /sdcard/boot.img

# Patch with Magisk Manager app
# Install patched boot image
fastboot flash boot magisk_patched.img
```

## Verification
```bash
# Check root access
adb shell su -c "id"

# Verify Magisk installation
adb shell "magisk --version"
```

## Security Testing Modules
- **Frida Server**: For dynamic analysis
- **SSL Kill Switch**: Certificate pinning bypass
- **Xposed Framework**: Runtime modifications
- **Root Cloak**: Hide root from detection

## Important Notes
- Only use on authorized test devices
- Document all modifications
- Maintain chain of custody for evidence
- Follow responsible disclosure practices

## Cleanup
```bash
# Remove root access
fastboot flash boot original_boot.img
fastboot reboot
```