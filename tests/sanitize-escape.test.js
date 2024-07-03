// sanitize-escape.test.js

const {describe, expect, test, beforeAll} = require('@jest/globals');

describe('SanitizeEscape', () => {
    let SanitizeEscape;

    beforeAll(async () => {
        SanitizeEscape = (await import('../src/sanitize-escape')).default;
    });
    // XSS Tests
    test('escapes strings for XSS - script tags', () => {
        const input = '<script>alert("XSS");</script>';
        const expected = '&lt;script&gt;alert(&quot;XSS&quot;);&lt;/script&gt;';
        expect(SanitizeEscape.escape(input)).toBe(expected);
    });

    test('escapes strings for XSS - on* attributes', () => {
        const input = '<img src="x" onerror="alert(\'XSS\')">';
        const expected = '&lt;img src=&quot;x&quot; onerror=&quot;alert(&#x27;XSS&#x27;)&quot;&gt;';
        expect(SanitizeEscape.escape(input)).toBe(expected);
    });

    test('escapes strings for XSS - data: URI attacks', () => {
        const input = '<a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgneHNzJyk8L3NjcmlwdD4=">Click me</a>';
        const expected = '&lt;a href=&quot;data:text/html;base64,PHNjcmlwdD5hbGVydCgneHNzJyk8L3NjcmlwdD4=&quot;&gt;Click me&lt;/a&gt;';
        expect(SanitizeEscape.escape(input)).toBe(expected);
    });

    test('escapes strings for XSS - SVG attacks', () => {
        const input = '<svg onload=alert(1)>';
        const expected = '&lt;svg onload=alert(1)&gt;';
        expect(SanitizeEscape.escape(input)).toBe(expected);
    });

    // SQL Injection Tests
    test('escapes strings for SQL Injection', () => {
        const input = "1' OR '1'='1"; // Classic SQL Injection
        const expected = "1&#x27; OR &#x27;1&#x27;=&#x27;1";
        expect(SanitizeEscape.escape(input)).toBe(expected);
    });

    // Open Redirect Tests
    test('escapes strings for Open Redirect', () => {
        const input = "https://yourwebsite.com/redirect?url=http://malicious-site.com";
        const expected = "https://yourwebsite.com/redirect?url=http://malicious-site.com";
        expect(SanitizeEscape.escape(input)).toBe(expected);
    });

    // Remote Code Execution (RCE) Tests
    test('escapes strings for RCE - OS Command Injection', () => {
        const input = "123; ls -la"; // Simple OS command injection
        const expected = "123; ls -la"; // escaping should not change anything in this case.
        expect(SanitizeEscape.escape(input)).toBe(expected);
    });

    // Escaping Tests
    test('escapes HTML entities', () => {
        const input = "<script>alert(\"Hello\");</script>";
        const expected = "&lt;script&gt;alert(&quot;Hello&quot;);&lt;/script&gt;";
        expect(SanitizeEscape.escape(input)).toBe(expected);
    });
});
