export interface ServerInfo {
  serverIP: string;
  version: string;
  status: string;
  nodeVersion: string;
  platform: string;
  arch: string;
  memoryUsage: MemoryUsage; 
  uptime: string;
  timestamp: string;
}
export interface MemoryUsage {
  rss: string;
  heapTotal: string;
  heapUsed: string;
  external: string;
  arrayBuffers: string;
}