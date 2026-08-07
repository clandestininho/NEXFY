## 2024-05-15 - [useDropzone optimization]
**Learning:** Recreating static configuration objects like the `accept` mapping on every render causes unnecessary re-renders when passed to hooks like `useDropzone`.
**Action:** Hoist static configuration objects outside the component or wrap the entire options object in `useMemo` to provide a stable reference for the hook.
