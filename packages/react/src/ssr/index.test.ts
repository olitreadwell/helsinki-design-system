import { getCriticalHdsRules, getCriticalHdsRulesSync } from './index';
import { parseProjectStyles } from './used-styles-hds/loadStyleDefinitions';
import { bodyHtml } from './test-data/bodyHtml';
import { hdsStyles } from './test-data/hdsStyles';

const nestedStyles =
  '.tag_hds-tag{>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}.TextInput-module_root{&.TextInput-module_invalid{label{color:var(--label-color-invalid)}}}';

describe('getCriticalHdsRules', () => {
  it('should collect critical styles successfully', async () => {
    const criticalHdsStyles = await getCriticalHdsRules(bodyHtml, hdsStyles);

    expect(criticalHdsStyles).toMatchSnapshot();
  });

  it('should flatten nested CSS when parsing styles for critical rule extraction', () => {
    const { ast } = parseProjectStyles({ 'index.css': nestedStyles });
    const selectors = ast['index.css'].selectors.map((rule) => rule.selector);

    expect(selectors.some((selector) => /\.tag_hds-tag\s*>\s*span/.test(selector))).toBe(true);
    expect(
      selectors.some((selector) => selector.includes('.TextInput-module_root.TextInput-module_invalid label')),
    ).toBe(true);
  });

  it('should not return malformed nested CSS with non-matching markup', async () => {
    const criticalHdsStyles = await getCriticalHdsRules('<empty></empty>', nestedStyles);

    // Only matchable class selectors — nothing critical, and no nested fragments leaked
    expect(criticalHdsStyles).toBe('');
  });

  it('should include flattened nested selectors when matching markup is provided', async () => {
    const criticalHdsStyles = await getCriticalHdsRules(
      '<div class="tag_hds-tag"><span></span></div><div class="TextInput-module_root TextInput-module_invalid"><label></label></div>',
      nestedStyles,
    );

    expect(criticalHdsStyles).toMatch(/\.tag_hds-tag\s*>\s*span\s*\{/);
    expect(criticalHdsStyles).toContain('.TextInput-module_root.TextInput-module_invalid label');
  });
});

describe('getCriticalHdsRulesSync', () => {
  it('should collect exactly same rules as getCriticalHdsRules()', async () => {
    const syncCriticalHdsStyles = getCriticalHdsRulesSync(bodyHtml, hdsStyles);
    const asyncCriticalHdsStyles = await getCriticalHdsRules(bodyHtml, hdsStyles);
    expect(syncCriticalHdsStyles).toBe(asyncCriticalHdsStyles);
  });
});
