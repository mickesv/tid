// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.addEventListener('DOMContentLoaded', () => {
    // Replace text in footer
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

})



// Preload forms
const fs = require('fs');
const path = require('path');

window.forms=[];
window.forms['Project'] = fs.readFileSync(path.join(__dirname, 'projectForm.html')).toString();
window.forms['Characters'] = fs.readFileSync(path.join(__dirname, 'charactersForm.html')).toString();
window.forms['Event'] = fs.readFileSync(path.join(__dirname, 'eventForm.html')).toString();


