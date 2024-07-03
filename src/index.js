import SanitizeEscape from './sanitize-escape';

export default {
    install(Vue, options = { sanitizeAll: false }) {
        Vue.prototype.$sanitizeEscape = SanitizeEscape;

        Vue.directive('sanitize', {
            bind(el, binding) {
                const inputType = binding.arg || 'string';

                // Sanitize initial value on bind
                el.value = SanitizeEscape.sanitize(el.value, inputType);

                // Sanitize on input events
                el.addEventListener('input', () => {
                    el.value = SanitizeEscape.sanitize(el.value, inputType);
                });
            },
        });

        if (options.sanitizeAll) {
            Vue.mixin({
                mounted() {
                    const inputElements = this.$el.querySelectorAll('input, textarea, select');
                    inputElements.forEach(el => {
                        // Check if the v-sanitize directive isn't already applied
                        if (!el.hasAttribute('v-sanitize')) {
                            Vue.directive('sanitize').bind(el); // Apply the directive manually
                        }
                    });
                },
            });
        }
    },
};
