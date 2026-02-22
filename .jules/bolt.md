## 2026-02-22 - Large Initial Bundle due to AI SDK
**Learning:** The `@google/genai` SDK is large and was included in the main bundle because `App.tsx` imported `geminiService` statically. This bloated the initial load.
**Action:** Use dynamic `import()` for heavy, interaction-dependent dependencies like AI SDKs to split them into separate chunks.
