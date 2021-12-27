const config = {
    outDir: 'docs',
    projects: [{
        // entryPoint: 'src/index.ts',
        entryPoint: 'src/models/documentation/AbstractDoc.ts',
        rootDir: 'src',
        tsConfig: 'tsconfig.json',
        packageJson: 'package.json',
        exportedDeclarationsOnly: true,
        readme: 'README.md',
    }],
    theme: 'ant-design'
};

module.exports = config;