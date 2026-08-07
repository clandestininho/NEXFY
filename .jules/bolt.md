## 2024-05-24 - Optimize DataURL base64 extraction
**Learning:** Using `split(',')[1]` on large `DataURL` strings creates a huge intermediate array and string allocations, forcing V8 to process the whole multi-megabyte payload twice.
**Action:** Always use `.substring(result.indexOf(',') + 1)` when extracting the base64 payload from `DataURL` strings. It safely bypasses the array allocation since the HTML spec guarantees the comma separator.
