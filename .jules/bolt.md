## 2024-05-24 - [React Memoization with Large Base64 Payloads]
**Learning:** When passing large base64 data payloads (like generated mockup images) down the component tree, lack of memoization (`React.memo` and `useCallback`) causes expensive UI re-renders and diffing during unrelated state changes (e.g., when a user simply drags a file over the dropzone). This causes noticeable UI lag.
**Action:** Aggressively memoize child components (`React.memo`) that consume these large data payloads, and ensure all callback props passed to them are memoized with `useCallback`.
