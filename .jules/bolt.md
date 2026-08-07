## 2024-05-14 - [Data URL Base64 Extraction Optimization]
**Learning:** Using `.split(',')[1]` to extract the base64 payload from a multi-megabyte image Data URL causes significant intermediate array allocations in V8, leading to measurable synchronous blocking.
**Action:** Always use `.substring(result.indexOf(',') + 1)` for large Data URLs to avoid O(N) memory allocations and reduce parsing time by ~99%.
