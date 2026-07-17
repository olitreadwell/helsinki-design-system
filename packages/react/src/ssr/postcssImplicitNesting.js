/**
 * Prepends `&` to nested rule selectors that omit it.
 * Required before postcss-nesting so implicit nesting (e.g. `> span`, `label`)
 * is flattened into valid selectors for getCriticalHdsRules().
 */
const postcssImplicitNesting = () => ({
  postcssPlugin: 'postcss-implicit-nesting',
  Rule(rule) {
    const { parent } = rule;

    if (parent && parent.type === 'rule') {
      const selector = rule.selector.trim();

      if (!selector.includes('&')) {
        rule.selector = `& ${selector}`;
      }
    }
  },
});

postcssImplicitNesting.postcss = true;

export default postcssImplicitNesting;
