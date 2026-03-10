## 2026-03-09 - Aggressively memoize large base64 payload consumers
**Learning:** Components consuming large base64 data URIs from React state (like ImageGrid in this app) are very expensive to re-render and cause noticeable UI blocking when unrelated state changes (e.g., progress bars, loading spinners).
**Action:** Aggressively memoize child components (`React.memo`) that take these payloads as props, and ensure all callback functions passed to them are memoized with `useCallback` to prevent unnecessary and expensive UI diffing.
