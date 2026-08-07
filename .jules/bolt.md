
## 2024-05-18 - Base64 String Parsing Memory Bottleneck
**Learning:** In Node.js/V8, calling `.split(',')[1]` on very large strings (like 10MB base64 images from `FileReader.readAsDataURL`) creates massive intermediate arrays in memory before extracting the final string, causing severe CPU overhead and GC pauses (e.g., ~128ms parsing time).
**Action:** Always prefer `.substring(str.indexOf(',') + 1)` for extracting suffixes from large data payloads, which avoids intermediate array allocations and executes almost instantly (~0.06ms).
