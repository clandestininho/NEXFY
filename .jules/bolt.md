
## 2024-04-18 - [Base64 Extraction Optimization]
**Learning:** Extracting the base64 payload from a Data URL using `.substring(result.indexOf(',') + 1)` is significantly more CPU and memory efficient than `.split(',')[1]`, especially for large payload sizes. This is because `.split()` creates an intermediate array and copies the string into it, causing unnecessary allocations that can impact main thread performance during file processing operations.
**Action:** When working with large Data URLs and needing only the base64 payload, use `.substring()` with `indexOf(',')` to avoid unnecessary memory overhead and intermediate object creation.
