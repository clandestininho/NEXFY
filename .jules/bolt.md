## 2024-05-15 - [Base64 Extraction Optimization]
**Learning:** When parsing base64 payload from a Data URL (which often handles images of several MBs), using `.split(',')[1]` creates unnecessary intermediate array and string allocations that consume memory and CPU cycles.
**Action:** Always prefer `.substring(result.indexOf(',') + 1)` over `.split(',')[1]` to extract payload strings, as it's significantly more efficient for large files and bypasses unnecessary array creation.
