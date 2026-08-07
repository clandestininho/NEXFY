## 2024-06-12 - Optimize base64 extraction from Data URLs
**Learning:** Extracting the base64 payload from a Data URL using `.split(',')[1]` allocates unnecessary intermediate arrays and string duplicates, which degrades performance and memory usage significantly for large files.
**Action:** Use `.substring(result.indexOf(',') + 1)` instead, which avoids intermediate memory allocations.
