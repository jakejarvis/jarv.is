/** @type {import("npm-check-updates").RunOptions} */
const config = {
  deep: true,
  // workspaces: true,
  // root: true,
  target: (dependencyName) => {
    if (/next$|(^@next\/.*$)/.test(dependencyName)) {
      return "@canary";
    }

    return "latest";
  },
};

module.exports = config;
