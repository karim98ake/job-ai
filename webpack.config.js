module.exports = {
    webpack: (config, { isServer }) => {
      // Désactiver les warnings de source maps pour les modules spécifiques
      config.module.rules.push({
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: [
          /node_modules\/next\/src\/client/,
          /node_modules\/next\/src\/shared/,
          /node_modules\/next\/src\/server/
        ],
      });
  
      // Retourne la configuration webpack modifiée
      return config;
    },
  };
  