# Bolt's Journal

## 2024-05-22 - Initial Setup
**Learning:** The journal file was missing.
**Action:** Created the journal file to track performance learnings.

## 2024-05-22 - Incremental Rendering Pattern
**Learning:** For AI image generation apps, waiting for all parallel requests to complete before showing any result is a bad UX pattern. Users perceive it as slow.
**Action:** Implement incremental rendering by passing a callback to the service layer that updates the UI state as each individual promise resolves, rather than waiting for `Promise.all` to finish everything. This improves Perceived Performance significantly.
