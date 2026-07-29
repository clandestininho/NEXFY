## 2024-07-01 - Avoid Split on Data URLs
**Learning:** Using `.split(',')[1]` on large strings like those produced by `FileReader.readAsDataURL` forces V8 to allocate intermediate arrays and scan the entire string. Using `.substring(result.indexOf(',') + 1)` prevents this and is dramatically faster.
**Action:** Always prefer `substring` over `split` when extracting the base64 payload from data URLs to avoid memory pressure.
