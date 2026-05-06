## 2025-05-06 - Optimize Base64 Extraction
**Learning:** Using `.split(',')[1]` on large base64 strings creates unnecessary intermediate array and string allocations. `.substring(result.indexOf(',') + 1)` avoids this and is significantly more CPU and memory efficient for large payloads.
**Action:** Use `.substring(result.indexOf(',') + 1)` for extracting base64 data from Data URLs.
