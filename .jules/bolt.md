## 2026-07-06 - [Optimize Base64 Parsing]
**Learning:** Extracting base64 payloads from `FileReader.readAsDataURL` outputs using `.split(',')[1]` creates significant memory pressure in Node.js/V8 by allocating intermediate arrays. Always prefer `.substring(str.indexOf(',') + 1)`.
**Action:** Use `substring` with `indexOf` when parsing known formatted strings to avoid unnecessary array allocations.
