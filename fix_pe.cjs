const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /pointerEvents: (activeStep[a-zA-Z0-9 =<>]*)\?/g;
// Replace pointerEvents: activeStep === 1 ? ... with pointerEvents: (!focusedLayer || focusedLayer === id) && activeStep === 1 ? ...
// Wait, id is different for each layer!

// Layer 0: ingot
code = code.replace(/pointerEvents: activeStep === 1 \? 'auto' : 'none'/g, 
  "pointerEvents: (!focusedLayer || focusedLayer === 'ingot') && activeStep === 1 ? 'auto' : 'none'");

// Layer 1: substrate
code = code.replace(/<motion.div className="absolute inset-0" style=\{\{ transformStyle: "preserve-3d", pointerEvents: activeStep > 1 \? 'auto' : 'none' \}\} \n        animate=\{\{ z: getZ\(0, 0, 'substrate'\)/g,
  `<motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d", pointerEvents: (!focusedLayer || focusedLayer === 'substrate') && activeStep > 1 ? 'auto' : 'none' }} \n        animate={{ z: getZ(0, 0, 'substrate')`);

// Layer 2: oxide
code = code.replace(/<motion.div className="absolute inset-0" style=\{\{ transformStyle: "preserve-3d", pointerEvents: activeStep > 2 \? 'auto' : 'none' \}\} \n        animate=\{\{ z: getZ\(2, 50, 'oxide'\)/g,
  `<motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d", pointerEvents: (!focusedLayer || focusedLayer === 'oxide') && activeStep > 2 ? 'auto' : 'none' }} \n        animate={{ z: getZ(2, 50, 'oxide')`);

// Layer 3: metal
code = code.replace(/<motion.div className="absolute inset-0" style=\{\{ transformStyle: "preserve-3d", pointerEvents: activeStep > 2 \? 'auto' : 'none' \}\} \n        animate=\{\{ z: getZ\(4, 100, 'metal'\)/g,
  `<motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d", pointerEvents: (!focusedLayer || focusedLayer === 'metal') && activeStep > 2 ? 'auto' : 'none' }} \n        animate={{ z: getZ(4, 100, 'metal')`);

// Layer 4: resist
code = code.replace(/<motion.div className="absolute inset-0" style=\{\{ transformStyle: "preserve-3d", pointerEvents: activeStep === 4 \? 'auto' : 'none' \}\}/g,
  `<motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d", pointerEvents: (!focusedLayer || focusedLayer === 'resist') && activeStep === 4 ? 'auto' : 'none' }}`);


// PkgScene layers: base, interposer, top
code = code.replace(/<motion.div className="absolute inset-\[10%\]" style=\{\{ transformStyle: "preserve-3d" \}\}/g,
  `<motion.div className="absolute inset-[10%]" style={{ transformStyle: "preserve-3d", pointerEvents: (!focusedLayer || focusedLayer === 'base') ? 'auto' : 'none' }}`);

code = code.replace(/<motion.div className="absolute inset-\[15%\]" style=\{\{ transformStyle: "preserve-3d" \}\}/g,
  `<motion.div className="absolute inset-[15%]" style={{ transformStyle: "preserve-3d", pointerEvents: (!focusedLayer || focusedLayer === 'interposer') ? 'auto' : 'none' }}`);

code = code.replace(/<motion.div className="absolute inset-\[20%\]" style=\{\{ transformStyle: "preserve-3d" \}\}/g,
  `<motion.div className="absolute inset-[20%]" style={{ transformStyle: "preserve-3d", pointerEvents: (!focusedLayer || focusedLayer === 'top') ? 'auto' : 'none' }}`);


fs.writeFileSync('src/App.tsx', code);
