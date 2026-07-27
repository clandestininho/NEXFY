## 2024-05-18 - Base64 Payload Extraction Memory Bottleneck
**Learning:** Extracting suffixes from large strings like `FileReader.readAsDataURL` base64 payloads using `.split(',')[1]` creates significant memory pressure and CPU overhead in Node.js/V8 by allocating large intermediate arrays.
**Action:** Always prefer `.substring(str.indexOf(',') + 1)` over `.split()` for large strings to avoid these allocations and drastically improve performance.
