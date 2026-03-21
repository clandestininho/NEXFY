
## 2024-03-21 - Memoizing Large Base64 Payloads in React
**Learning:** Passing arrays of large base64 data URIs as props to unmemoized child components causes severe performance degradation, as the Virtual DOM needlessly diffs these large strings whenever a parent state (like a loading indicator or progress bar) changes.
**Action:** Aggressively memoize (`React.memo`) any component that consumes large base64 strings, and ensure all of its callback props are wrapped in `useCallback` to maintain referential equality across renders.
