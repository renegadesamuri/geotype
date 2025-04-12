# Next Steps for Publishing @geotype/maps

## 1. Initial Setup

1. Create an npm account if you haven't already:
   ```bash
   npm adduser
   ```

2. Login to npm:
   ```bash
   npm login
   ```

## 2. Beta Release

1. Install dependencies:
   ```bash
   npm install
   ```

2. Check what will be published:
   ```bash
   npm run publish:check
   ```

3. Publish beta version:
   ```bash
   npm run publish:beta
   ```

4. Test the beta package:
   ```bash
   npm install @geotype/maps@beta
   ```

## 3. Testing Checklist

- [ ] Test basic map initialization
- [ ] Test geocoding functionality
- [ ] Test marker management
- [ ] Test directions service
- [ ] Test places autocomplete
- [ ] Test React component
- [ ] Test TypeScript types
- [ ] Test CDN usage
- [ ] Test examples in documentation

## 4. Official Release

Once beta testing is complete and all tests pass:

1. Update version:
   ```bash
   npm run version:minor
   ```

2. Publish official release:
   ```bash
   npm run publish:public
   ```

## 5. Post-Release

1. Create GitHub release
2. Update documentation if needed
3. Announce release on relevant platforms
4. Monitor initial feedback and issues

## 6. Future Updates

For future updates:

- Bug fixes: `npm run version:patch`
- New features: `npm run version:minor`
- Breaking changes: `npm run version:major`

## Links

- npm package: https://www.npmjs.com/package/@geotype/maps
- GitHub repository: https://github.com/geotype/maps
- Documentation: https://github.com/geotype/maps#readme

## Notes

- The package is currently in beta (v1.0.0-beta.1)
- All releases should be properly tested before publishing
- Keep documentation up to date with changes
- Follow semantic versioning principles
