## 2024-05-24 - React Memoization for Large Base64 Payloads
**Learning:** When working with large base64 data payloads (like generated mockup images) in React state, passing them down as props can cause extremely expensive UI re-rendering and diffing if the parent component re-renders for other reasons (like progress updates or drag events).
**Action:** Aggressively memoize child components (`React.memo`) that consume these payloads and ensure all callback props are memoized with `useCallback` to prevent these expensive re-renders.
