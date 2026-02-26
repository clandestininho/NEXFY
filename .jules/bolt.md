## 2024-05-22 - Client-Side Image Compression
**Learning:** Sending uncompressed user uploads (e.g., 5MB+ PNGs) to multiple parallel API endpoints is a major performance bottleneck for bandwidth and latency. Client-side compression to ~1536px (JPEG/WebP) can reduce payload size by 10x-20x without perceptible quality loss for AI vision tasks.
**Action:** Always inspect payload sizes for API integrations and implement client-side optimization where possible.
