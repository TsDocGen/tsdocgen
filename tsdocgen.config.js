const config = {
    outDir: 'docs',
    projects: [{
        entryPoint: 'src/index.ts',
        rootDir: 'src',
        tsConfig: 'tsconfig.json',
        packageJson: 'package.json',
        exportedDeclarationsOnly: true,
        readme: 'README.md'
    }]
};

module.exports = config;