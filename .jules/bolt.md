
## 2025-06-04 - Optimize base64 extraction from Data URLs
**Learning:** Using `.split(',')[1]` to extract the base64 payload from a large Data URL (e.g., from `FileReader.readAsDataURL` on a 5MB image) is highly inefficient. It creates an intermediate array and forces V8 to scan and copy the entire massive string, resulting in high CPU and memory overhead.
**Action:** Always prefer `.substring(result.indexOf(',') + 1)` for extracting payloads from Data URLs. It completely avoids intermediate array allocation and large string copies because it stops searching after the first comma (which is located in the small metadata prefix).
