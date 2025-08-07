const fs = require("fs");

module.exports = {
  command: "init",
  aliases: ["i"],
  desc: "Initialize the Lazy Commit configuration file",
  handler: () => {
    const configPath = "lazycommit.config.json";

    if (fs.existsSync(configPath)) {
      console.log("\x1b[33m%s\x1b[0m", `${configPath} existe déjà.`);
      return;
    }

    const defaultConfig = {
      folders: {
        api: "api",
        dto: "dto",
        mappers: "mappers",
        services: "services",
        utils: "utils",
        docs: "docs",
        tests: "tests"
      }
    };

    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
     console.log("\x1b[32m%s\x1b[0m", "Configuration file created: lazycommit.config.json");
  }
};
