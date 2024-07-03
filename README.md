# vue-sanitize-escape

[![npm version](https://img.shields.io/npm/v/vue-sanitize-escape.svg)](https://www.npmjs.com/package/vue-sanitize-escape)
[![License](https://img.shields.io/npm/l/vue-sanitize-escape.svg)](https://github.com/your-username/vue-sanitize-escape/blob/main/LICENSE)
[![Build Status](https://github.com/mayur19/vue-sanitize-escape/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/your-username/vue-sanitize-escape/actions)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/your-username/vue-sanitize-escape)

A Vue.js plugin to fortify your application against common web vulnerabilities like Cross-Site Scripting (XSS), SQL
Injection, and Open Redirects.

## Features

- **Sanitization:**
    - Deeply sanitizes strings, numbers, objects, and arrays.
    - Removes dangerous HTML tags (e.g., <script>, <iframe>, on* attributes).
    - Neutralizes potential SQL injection attempts.
    - Protects against open redirect attacks.
- **Escaping:**
    - Escapes special characters in strings to prevent XSS vulnerabilities.
- **Vue.js Integration:**
    - Simple installation as a Vue plugin.
    - Convenient $sanitizeEscape object for direct access to functions.
    - Custom Vue directive (v-sanitize) for automatic input sanitization.
- **Lightweight and Dependency-Free:**
    - No external dependencies, ensuring minimal overhead.
    - Focused on core sanitization and escaping tasks.

## Installation

```bash
npm install vue-sanitize-escape
```

## Usage

### Vue.js
```javascript
import Vue from 'vue';
import VueSanitizeEscape from 'vue-sanitize-escape';

// Sanitizes all inputs by default. In this case no need to use v-sanitize directive
Vue.use(VueSanitizeEscape, { sanitizeAll: true });

// sanitizeAll defaults to false
Vue.use(VueSanitizeEscape);
```
### Sanitize Input
```javascript
this.$sanitizeEscape.sanitize(userInput, type);
```
- userInput: The input to sanitize (string, number, object, array).
- type: Optional (default: 'string'). Specifies the type of the input.

### Escape HTML Entities
```javascript
this.$sanitizeEscape.escape(userInput);
```

### v-sanitize Directive
```javascript
<input type="text" v-model="userInput" v-sanitize />
```
This directive will automatically sanitize the input on change. You can optionally specify the type as an argument:
```javascript
<input type="number" v-model="userAge" v-sanitize:number />
```

### Why Use vue-sanitize-escape?
- Ease of Use: Seamlessly integrates with Vue.js projects.
- Option to integrate by default for all inputs. Otherwise, it can be used for the targeted inputs.
- No Dependencies: Avoids the overhead and potential vulnerabilities of third-party libraries.
- Customizable: Tailor the sanitization behavior to your specific needs by extending or modifying the core functions.
- Performance: Designed to be lightweight and efficient, minimizing impact on your application's performance.
- Security-Focused: Specifically crafted to address common web vulnerabilities and enhance the security of your Vue.js application.
- Regularly Updated: The library will be actively maintained to adapt to new security threats and best practices.

### Contributing
Contributions are welcome! Please feel free to submit issues and pull requests.

### License
This project is licensed under the MIT License.