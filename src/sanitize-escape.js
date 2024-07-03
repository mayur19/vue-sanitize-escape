export default {
    sanitize(input, type = 'string') {
        if (typeof input !== type) {
            // If the input type doesn't match the expected type, try to convert it to a string
            if (type === 'string' && (typeof input === 'object' || typeof input === 'number')) {
                input = input.toString();
            } else {
                throw new Error(`Expected type ${type}, got ${typeof input}`);
            }
        }

        if (type === 'string') {
            return this.sanitizeString(input);
        } else if (type === 'number') {
            return this.sanitizeNumber(input);
        } else if (type === 'object' || type === 'array') {
            const sanitizedObj = Array.isArray(input) ? [] : {};
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    sanitizedObj[key] = this.sanitize(input[key], typeof input[key]);
                }
            }
            return sanitizedObj;
        }

        // Handle other types as needed (e.g., dates, booleans)
        return input;
    },

    sanitizeString(str) {
        return str
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
            .replace(/javascript:/gi, '') // Remove javascript: URLs
            .replace(/on[a-z]+\s*=\s*(["'])(?:[^\\1]+?|\\1\\1)*\1\s*/gi, '') // Remove on* attributes
            .replace(/href\s*=\s*(["'])(?:javascript|data):[^"']*\1\s*/gi, '') // Remove unsafe hrefs
            .replace(/<[^>]+>?/g, '') // Remove remaining tags
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
    },

    sanitizeNumber(num) {
        // SQL injection protection: Ensure input is a valid number
        return Number.isNaN(num) ? 0 : num;
    },

    sanitizeObject(obj) {
        // Deeply sanitize objects/arrays
        for (const key in obj) {
            obj[key] = this.sanitize(obj[key], typeof obj[key]);
        }
        return obj;
    },

    escape (input) {
        // Basic escaping
        return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
    }
};
