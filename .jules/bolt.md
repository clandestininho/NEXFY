## 2024-04-28 - Base64 String Parsing Optimization
**Learning:** Extracting the base64 payload from a `FileReader` Data URL string (which can be several megabytes large) using `.split(',')[1]` creates unnecessary intermediate array and string allocations, forcing the JS engine to scan the entire string.
**Action:** Always use `.substring(result.indexOf(',') + 1)` instead of `.split(',')[1]` for large Data URLs to significantly reduce CPU usage and memory overhead.
