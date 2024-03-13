import fs from 'fs';
import path from 'path';

const ADD_HEADER = `// PATCH THE OPTIONS
const Chrome = require('selenium-webdriver/chrome');
const options = new Chrome.Options();
options.addArguments('headless')
options.addArguments('--remote-debugging-pipe')
// END OF PATCH
`;

const PATCH_BUILDER_CONSUME = `driver = await new Builder().forBrowser('chrome').build()`
const PATCH_BUILDER_PRODUCE = `
driver = await new Builder().forBrowser('chrome')
  .setChromeOptions(options) // PATCH THE OPTIONS
  .build()`;

if (!fs.existsSync('e2e_patched')) {
  fs.mkdirSync('e2e_patched')
}


for(const file of fs.readdirSync('e2e')) {
  const p = path.join('e2e', file);
  const p_patched = path.join('e2e_patched', `${path.basename(file, '.spec.js')}.spec.cjs`);
  const content = fs.readFileSync(p, 'utf-8');
  const patched_content = ADD_HEADER + content.replace(PATCH_BUILDER_CONSUME, PATCH_BUILDER_PRODUCE)
  fs.writeFileSync(p_patched, patched_content, 'utf-8');
}