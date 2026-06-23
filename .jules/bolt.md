## 2025-02-28 - Optimize Base64 Parsing
**Learning:** Extracting base64 payloads from Data URLs using `.split(',')[1]` causes massive, unnecessary array and string allocations, which heavily spikes memory and CPU time for large file uploads.
**Action:** Replace `.split(',')[1]` with `.substring(result.indexOf(',') + 1)` whenever extracting Data URL payloads. The HTML specification guarantees the presence of a comma.
