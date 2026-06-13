// Learn more https://docs.expo.io/guides/customizing-metro
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { resolve } = require("metro-resolver");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const ioniconsFontPath = path.resolve(__dirname, "assets/fonts/Ionicons.ttf");

// Ignore testing files so Metro doesn't bundle them and trigger Expo Router errors
config.resolver.blockList.push(
  /\.test\.(js|ts|jsx|tsx)$/,
  /\.spec\.(js|ts|jsx|tsx)$/,
);

// Netlify skips files under node_modules/ (from .gitignore) when deploying dist/.
// Redirect Ionicons font resolution to assets/ so the exported path is deployable.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    moduleName.endsWith("fonts/Ionicons.ttf") ||
    moduleName === "@react-native-vector-icons/ionicons/fonts/Ionicons.ttf"
  ) {
    return {
      type: "assetFiles",
      filePaths: [ioniconsFontPath],
    };
  }

  return resolve(context, moduleName, platform);
};

module.exports = config;
