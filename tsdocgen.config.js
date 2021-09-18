const config = {
    projects: [{
        entryPoint: 'src/index.ts',
        tsConfig: 'tsconfig.json',
        packageJson: 'package.json',
        exportedDeclarationsOnly: true,
        readme: 'README.md'
    }]
};

module.exports = config;