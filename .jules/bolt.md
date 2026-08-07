
## 2025-03-09 - Data URL Parsing Optimization
**Learning:** Extracting base64 payload from `FileReader.readAsDataURL` outputs using `.split(',')[1]` causes large temporary string/array allocations. Since Data URLs are guaranteed to contain a comma separator, `.substring(result.indexOf(',') + 1)` is a completely safe and vastly more efficient replacement.
**Action:** Use `.substring` and `.indexOf` instead of `.split` when extracting the payload part from Data URLs, especially for potentially large image files to minimize GC overhead and memory pressure.
