# Contributing to Google Maps TypeScript Service

Thank you for your interest in contributing to Google Maps TypeScript Service! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and considerate of others when contributing to this project. We aim to foster an inclusive and welcoming community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:

1. A clear, descriptive title
2. A detailed description of the issue
3. Steps to reproduce the bug
4. Expected behavior
5. Actual behavior
6. Screenshots (if applicable)
7. Environment details (browser, OS, etc.)

### Suggesting Enhancements

We welcome suggestions for new features or improvements. Please create an issue with:

1. A clear, descriptive title
2. A detailed description of the proposed enhancement
3. Any specific implementation details you have in mind
4. Why this enhancement would be useful to most users

### Pull Requests

We actively welcome pull requests:

1. Fork the repository
2. Create a new branch from `main`
3. Make your changes
4. Add or update tests as necessary
5. Update documentation as needed
6. Submit a pull request

### Pull Request Guidelines

- Follow the existing code style
- Include tests for new features or bug fixes
- Update documentation for any changed functionality
- Keep pull requests focused on a single topic
- Reference any related issues in your PR description

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/google-maps-ts-service.git
   cd google-maps-ts-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Run tests:
   ```bash
   npm test
   ```

## Project Structure

```
google-maps-ts-service/
├── dist/                  # Distribution files
├── examples/              # Example applications
├── src/                   # Source code
│   ├── google-maps-service.ts  # Main service
│   └── types/             # TypeScript type definitions
├── tests/                 # Test files
├── package.json
└── tsconfig.json
```

## Coding Standards

- Use TypeScript for all new code
- Follow the established code style
- Document all public methods using JSDoc comments
- Write comprehensive unit tests

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

## Questions?

If you have any questions about contributing, please open an issue and we'll be happy to help!
