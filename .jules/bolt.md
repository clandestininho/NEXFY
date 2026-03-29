## 2024-03-29 - [Data URL Base64 Extraction]
**Learning:** Extracting base64 payload from a Data URL using `.split(',')[1]` is highly inefficient for large files (e.g., 5MB+ image uploads) because it allocates an intermediate array and copies large strings, causing CPU and memory spikes.
**Action:** Use `.substring(result.indexOf(',') + 1)` to extract the base64 data, avoiding unnecessary memory allocations and providing a significant performance boost during file processing.

## 2024-03-29 - [File Part Caching]
**Learning:** Redundant base64 conversions for the same `File` object unnecessarily consume CPU cycles and memory, especially during successive mockup generations of the same uploaded product image.
**Action:** Utilize a `WeakMap<File, Part>` to cache the generated `Part` objects, keyed by the original `File` object.
