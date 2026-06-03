## 2025-02-28 - Base64 String Parsing
**Learning:** Extracting base64 payload from a Data URL using `.substring(indexOf(',') + 1)` avoids creating intermediate array objects and string allocations compared to `.split(',')[1]`. This is much more memory and CPU efficient, especially for large strings like image payloads.
**Action:** Always prefer `substring` with `indexOf` over `split` when extracting a specific known part of a large string if the separator is guaranteed to be present.
