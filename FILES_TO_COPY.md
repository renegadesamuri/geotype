# Essential Files for Geotype

## Source Code Files
- src/geotype.ts
- src/types/google-maps.d.ts
- src/__tests__/google-maps-service.test.ts
- src/__tests__/setup.ts

## Configuration Files
- package.json
- tsconfig.json
- jest.config.js
- .gitignore
- .npmignore
- .editorconfig

## Documentation
- README.md
- INTEGRATION.md
- QUICKSTART.md
- CONTRIBUTING.md
- LICENSE
- SECURITY.md

## GitHub Files
- .github/workflows/ci.yml
- .github/CODEOWNERS
- .github/ISSUE_TEMPLATE/bug_report.md
- .github/ISSUE_TEMPLATE/feature_request.md
- .github/pull_request_template.md

## Examples
- examples/basic-map/index.html
- examples/basic-map/app.js
- examples/typescript-integration/index.html
- examples/typescript-integration/map-app.ts
- examples/react-integration/index.html
- examples/react-integration/App.tsx
- examples/react-integration/GoogleMap.tsx
- examples/react-integration/index.tsx
- examples/cdn-usage/index.html

## Scripts
- scripts/prepare-publish.sh

After copying these files:

1. Initialize and build:
```bash
npm install
npm run build
```

2. Commit to GitHub:
```bash
git add .
git commit -m "Initial release: Geotype - TypeScript Google Maps Service"
git push -u origin main
```

Note: Make sure your git config is set up:
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```
