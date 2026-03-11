## 2024-05-24 - [React Re-renders with Large Payloads]
**Learning:** Components receiving large base64 data payloads in props (like `ImageGrid` taking an array of data URIs) cause extremely expensive React virtual DOM diffing and UI lag during unrelated parent re-renders (such as updating a progress bar state).
**Action:** Aggressively memoize child components (`React.memo`) that consume large base64 data strings and ensure callback props (like `onDownload`) are memoized with `useCallback` to prevent unnecessary and costly re-rendering.
