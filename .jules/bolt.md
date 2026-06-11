## 2025-03-09 - Extracted Data URL Payload Efficiently
**Learning:** Extracting base64 payload from Data URLs with `.split(',')[1]` creates unnecessary arrays and string copies which is extremely costly for large files.
**Action:** Always use `.substring(result.indexOf(',') + 1)` instead of `.split(',')[1]` when working with large strings to avoid allocation overhead.
