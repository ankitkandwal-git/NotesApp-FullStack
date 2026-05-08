const path = require('path');
const express = require('express');

// Serve the built frontend from the dist folder
function setupFrontend(app) {
  const distPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(distPath));
  // Express v5 (path-to-regexp v6) doesn't accept the legacy '/*' pattern.
  // Use a RegExp catch-all instead.
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

module.exports = setupFrontend;
