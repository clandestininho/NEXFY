
## 2024-05-18 - Avoid npm install lockfile pollution
**Learning:** Running `npm install` in this environment to install dependencies for verification creates a `package-lock.json` file. Since `pnpm` is explicitly mentioned in the prompt's instructions (and the project uses `bun` for testing), committing `package-lock.json` introduces cross-package-manager conflicts and repository bloat, leading to code review rejections.
**Action:** When running `npm install` for verification purposes, always remember to remove the generated `package-lock.json` (`rm package-lock.json`) before committing changes or requesting code review. Alternatively, strictly use `bun install` if the environment supports it to match the test runner.
