
## 2024-06-13 - Data URL string extraction performance
**Learning:** Using `.split(',')[1]` to extract the base64 payload from a Data URL string is incredibly inefficient for large files (like 5MB+ images) because it creates intermediate strings and arrays in memory before discarding them. Since the HTML specification guarantees Data URLs always contain a comma, `.substring(result.indexOf(',') + 1)` is functionally identical but bypasses all intermediate allocations.
**Action:** Always prefer string index-based operations (`substring`, `indexOf`) over array-based splits (`split`) when extracting suffixes from large strings, particularly in hot paths like file upload handlers.
