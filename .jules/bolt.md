## 2024-05-11 - Base64 Parsing Memory Optimization
**Learning:** Extracting base64 payloads from Data URLs using `.split(',')[1]` causes unnecessary array and string allocations, which can be a significant bottleneck for large file handling in the browser.
**Action:** Always prefer `.substring(result.indexOf(',') + 1)` for extracting the base64 portion of a Data URL to minimize CPU and memory overhead.
