## 2026-04-01 - Memoizing Base64 Payload Consumers
**Learning:** When working with large base64 data payloads in React state, aggressively memoize child components (`React.memo`) that consume these payloads and ensure all callback props are memoized with `useCallback` to prevent expensive UI re-rendering and diffing.
**Action:** Always wrap components consuming large base64 arrays in `React.memo` and any associated handler functions in `useCallback`.
