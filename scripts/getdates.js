// scripts/getdates.js
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Set the current year
  const yearSpan = document.getElementById('currentyear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Set the last modified date
  const lastMod = document.getElementById('lastModified');
  if (lastMod) {
    lastMod.textContent = 'Last Modified: ' + document.lastModified;
  }
});
