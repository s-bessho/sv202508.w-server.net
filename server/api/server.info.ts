import os from 'os';

export default defineEventHandler(() => {
  const formatMemoryUsage = (memoryUsage: NodeJS.MemoryUsage) => ({
    rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
    heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
    heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
    external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
    arrayBuffers: `${(memoryUsage.arrayBuffers / 1024 / 1024).toFixed(2)} MB`,
  });
  const getServerIP = () => {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
      const interfaces = networkInterfaces[interfaceName];
      if (interfaces) {
        for (const iface of interfaces) {
          // IPv4アドレスかつ内部アドレスでないものを取得
          if (iface.family === 'IPv4' && !iface.internal) {
            return iface.address;
          }
        }
      }
    }
    return 'IP not found'; // IPアドレスが見つからない場合
  };

  return {
    serverIP:getServerIP(),
    version: "1.0.0",
    status: "running",
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    memoryUsage: formatMemoryUsage(process.memoryUsage()),
    uptime: `${process.uptime().toFixed(2)} seconds`,
    timestamp: new Date().toLocaleString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Tokyo'
      })
    };
});