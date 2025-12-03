# Utilities Directory

This directory contains utility functions and helpers for the Apollo Hologram Euystacio framework.

## Available Utilities

Utilities can be added here:

- **validators.js**: Input validation helpers
- **formatters.js**: Data formatting utilities
- **crypto.js**: Cryptographic helpers for audit signatures
- **logger.js**: Logging utilities

## Usage Example

```javascript
const { validateAction, formatMetrics } = require('./utils');

// Validate an action
const isValid = validateAction(actionData);

// Format metrics for display
const formatted = formatMetrics(rawMetrics);
```
