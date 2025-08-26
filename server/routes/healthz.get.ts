// server/routes/healthz.get.ts
export default defineEventHandler((event) => {
  setHeader(event, 'Cache-Control', 'no-store')
  return { status: 'ok' }
})