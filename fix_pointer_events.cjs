const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// For SceneLabel, remove pointerEvents from animate and add to style
code = code.replace(
  /animate=\{\{ opacity: visible \? 1 : 0, x: visible \? 0 : -20, pointerEvents: visible \? 'auto' : 'none' \}\}/g,
  `style={{ pointerEvents: visible ? 'auto' : 'none' }}\n    animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}`
);

// We'll also wrap setHoveredTooltip calls so they only fire if !focusedLayer, to prevent rapid flashes
code = code.replace(/onMouseEnter=\{\(\) => setHoveredTooltip\('([^']+)'\)\}/g, "onMouseEnter={() => !focusedLayer && setHoveredTooltip('$1')}");
code = code.replace(/onMouseLeave=\{\(\) => setHoveredTooltip\(null\)\}/g, "onMouseLeave={() => !focusedLayer && setHoveredTooltip(null)}");

fs.writeFileSync('src/App.tsx', code);
