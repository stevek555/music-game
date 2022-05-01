/* bandle config */                                                                                                                                                                                                                                                                                                                                     const audioConfig = require("./__mocks__/audio-config");
module.exports = {
  presets: [
    'next/babel',
  ],
  plugins: [
    ['styled-components', {
      ssr: true,
      displayName: false,
    }],
  ],
};