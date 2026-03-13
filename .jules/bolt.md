
## 2024-05-28 - React rendering with large Base64 payloads
**Learning:** React state changes in a parent component (like a dropdown selection) cause a re-render of child components by default. When a child component receives an array of large base64 image strings as props, this re-rendering process forces React to diff these massive strings, causing severe UI lag and jank, even if the image array itself hasn't changed.
**Action:** Always aggressively memoize child components (`React.memo`) that consume large base64 data payloads, and ensure all callback props passed to them are also memoized (`useCallback`) to prevent expensive and unnecessary UI diffing.
