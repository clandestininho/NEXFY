## 2025-02-28 - Base64 String Parsing
**Learning:** Extracting base64 payload from Data URLs via `.split(',')[1]` creates significant memory allocation and CPU overhead for large 5MB strings by creating arrays and copying strings.
**Action:** Always use `.substring(result.indexOf(',') + 1)` which operates with O(1) prefix search and avoids array allocation overhead.
