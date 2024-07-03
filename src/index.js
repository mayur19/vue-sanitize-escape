// src/index.js
import SanitizeEscape from './sanitize-escape.js';

export default {
    install(app, options = { sanitizeAll: false }) {
        // Check if it's a Vue 2 or Vue 3 app
        const isVue3 = !!app.config.globalProperties;

        // Access globalProperties based on Vue version
        const globalProperties = isVue3 ? app.config.globalProperties : app.prototype;

        globalProperties.$sanitizeEscape = SanitizeEscape;

        app.directive('sanitize', {
            mounted(el, binding) {
                // ... (same directive logic as before) ...
            },
        });

        if (options.sanitizeAll) {
            app.mixin({
                mounted() {
                    const inputElements = this.$el.querySelectorAll('input, textarea, select');
                    inputElements.forEach(el => {
                        if (!el.hasAttribute('v-sanitize')) {
                            // Apply directive based on Vue version
                            if (isVue3) {
                                app.directive('sanitize').mounted(el);
                            } else {
                                Vue.directive('sanitize').bind(el);
                            }
                        }
                    });
                },
            });
        }
    },
};

