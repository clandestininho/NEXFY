## 2025-03-05 - Optimize base64 parsing memory overhead
**Learning:** Using `.split(',')[1]` on large strings (e.g. results from `FileReader.readAsDataURL()`) causes significant memory pressure in V8 due to intermediate array allocations.
**Action:** Use `.substring(result.indexOf(',') + 1)` instead to extract payloads without intermediate arrays.
