module.exports = {
    optimization: {
      usedExports: true, // Enables Tree Shaking
      splitChunks: {
        chunks: 'all', // Splits vendor files (React, Router, etc.)
      },
    },
  };
  