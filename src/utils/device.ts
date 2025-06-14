export function getDeviceInfo(): string {
  const ua = navigator.userAgent;

  // iPod
  const iPodMatch = ua.match(/iPod.*OS (\d+_\d+)/);
  if (iPodMatch) return `iPod iOS ${iPodMatch[1].replace("_", ".")}`;

  // iPhone
  const iPhoneMatch = ua.match(/iPhone OS (\d+_\d+)/);
  if (iPhoneMatch) return `iPhone iOS ${iPhoneMatch[1].replace("_", ".")}`;

  // iPad
  const iPadMatch = ua.match(/iPad; CPU OS (\d+_\d+)/);
  if (iPadMatch) return `iPad iOS ${iPadMatch[1].replace("_", ".")}`;

  // Android
  const androidMatch = ua.match(/Android (\d+(\.\d+)?)/);
  if (androidMatch) {
    const androidVersion = androidMatch[1];
    const deviceMatch = ua.match(/Android.*?;\s([^)]+)\)/);
    const rawDevice = deviceMatch
      ? deviceMatch[1].split("Build")[0].trim()
      : "Android";
    return `${rawDevice} Android ${androidVersion}`;
  }

  // Windows
  const windowsMatch = ua.match(/Windows NT (\d+\.\d+)/);
  if (windowsMatch) {
    const versionMap: Record<string, string> = {
      "10.0": "10 / 11",
      "6.3": "8.1",
      "6.2": "8",
      "6.1": "7",
      "6.0": "Vista",
      "5.1": "XP",
    };
    const version = windowsMatch[1];
    return `Windows ${versionMap[version] ?? version}`;
  }

  // macOS
  const macMatch = ua.match(/Mac OS X (\d+[_\.\d]+)/);
  if (macMatch) {
    return `Mac OS X ${macMatch[1].replace(/_/g, ".")}`;
  }

  // ChromeOS
  if (/CrOS/.test(ua)) return "Chrome OS";

  // Linux
  if (/Linux/.test(ua)) return "Linux";

  // Fallback
  return "Otro";
}
