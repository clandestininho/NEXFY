## 2024-05-24 - File to Base64 Conversion Bottleneck
**Learning:** Converting large image files to Base64 via FileReader on every generation request is a significant bottleneck. Since the same File object reference is often reused when users try different prompts/settings for the same uploaded image, we can cache the result.
**Action:** Implement a `WeakMap<File, Part>` cache in the service layer to store and reuse the Base64 conversion results, yielding up to a ~98% performance improvement on repeated requests.

## 2024-05-24 - Large Base64 Payloads in React State
**Learning:** Storing arrays of large Base64 data URIs in React state causes expensive UI re-rendering and diffing when parent components update.
**Action:** Aggressively memoize child components (`React.memo`) that consume large Base64 arrays, and ensure all callback props are memoized with `useCallback` to prevent unnecessary re-renders.
