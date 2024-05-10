module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src/',
          '@icons': './src/assets/icons',
          '@images': './src/assets/images',
          '@lotties': './src/assets/lotties',
          '@components': './src/components',
          '@libs': './src/libs',
          '@hooks': './src/hooks',
          '@atoms': './src/atoms',
          '@utils': './src/utils',
          '@styles': './src/styles',
          '@pages': './src/pages',
          '@apis': './src/apis',
          '@interfaces': './src/interfaces',
          '@common': './src/common',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
