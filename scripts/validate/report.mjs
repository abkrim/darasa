/**
 * @typedef {Object} Finding
 * @property {string|null} slug
 * @property {string} type
 * @property {'error'|'warning'} severity
 * @property {string} detail
 * @property {string} [lastChecked]
 */

/**
 * @param {Finding[]} findings
 * @param {{title?:string}} [opts]
 */
export function formatReport(findings, opts = {}) {
  const errors = findings.filter((f) => f.severity === 'error');
  const warnings = findings.filter((f) => f.severity === 'warning');
  const byFicha = new Map();
  for (const f of findings) {
    const key = f.slug || '(sin ficha)';
    if (!byFicha.has(key)) byFicha.set(key, []);
    byFicha.get(key).push(f);
  }
  let text = `# ${opts.title || 'validation'}\n${errors.length} error(s), ${warnings.length} warning(s)\n\n`;
  for (const [ficha, items] of [...byFicha.entries()].sort()) {
    text += `## ${ficha}\n`;
    for (const it of items) {
      text += `  [${it.severity}] ${it.type}: ${it.detail}`;
      if (it.lastChecked) text += ` (last: ${it.lastChecked})`;
      text += '\n';
    }
    text += '\n';
  }
  return { text, hasError: errors.length > 0, errors, warnings, findings };
}

/** @param {Finding[]} findings */
export function toJson(findings) {
  return JSON.stringify({ findings }, null, 2);
}
