## 2026-03-25 - Expensive UI Re-rendering with Base64 Payloads
**Learning:** Storing large base64 data payloads (like generated mockups) in React state causes expensive UI re-rendering and DOM diffing if child components consuming these payloads are not aggressively memoized.
**Action:** Always wrap child components consuming large base64 arrays with `React.memo` and ensure callback props are memoized with `useCallback` to avoid unnecessary recreations.
