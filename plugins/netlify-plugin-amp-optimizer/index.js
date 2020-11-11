const ampOptimizer = require('@ampproject/toolbox-optimizer').create();
const fs = require('fs');
const glob = require('glob');

module.exports = {
  onPostBuild: async ({ constants, utils }) => {
    const pattern = constants.PUBLISH_DIR + '/**/amp.html';

    const files = await new Promise((resolve, reject) => {
      glob(pattern, { nodir: true }, (err, files) => {
        (err) ? reject(err) : resolve(files);
      });
    });

    await Promise.all(
      files.map(async (file) => {
        const html = await fs.promises.readFile(file, 'utf-8');
        const optimizedHtml = await ampOptimizer.transformHtml(html);
        await fs.promises.writeFile(file, optimizedHtml);
      })
    );

    utils.status.show({
      title: `${files.length} AMP pages optimized!`
    });
  }
};
