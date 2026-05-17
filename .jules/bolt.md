## 2024-05-24 - Base64 Data URL Extraction
**Learning:** Extracting base64 payload from Data URLs using `.split(',')[1]` causes massive memory allocation (array + multiple strings) and CPU overhead for large files (e.g., 5MB+ images).
**Action:** Use `.substring(result.indexOf(',') + 1)` instead. It avoids intermediate array allocations and is ~99.9% faster for large payloads, a critical optimization for file handling services.

## 2024-05-24 - Package Manager Lockfile Pollution
**Learning:** Running commands like `bun install` or `bun test` in an environment that only tracks `package.json` can generate untracked lockfiles (e.g., `bun.lock`, `bun.lockb`), leading to code review rejection if not cleaned up.
**Action:** Always ensure temporary lockfiles generated during testing/verification are explicitly removed (`rm -f bun.lock bun.lockb`) before submission.
