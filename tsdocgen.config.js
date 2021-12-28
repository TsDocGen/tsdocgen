const config = {
    outDir: 'docs',
    projects: [{
        // entryPoint: 'src/index.ts',
        // entryPoint: 'src/models/documentation/BaseDoc.ts',
        entryPoint: 'src/errors.ts',
        rootDir: 'src',
        tsConfig: 'tsconfig.json',
        packageJson: 'package.json',
        exportedDeclarationsOnly: true,
        readme: 'README.md',
    }],
    theme: 'ant-design'
};

module.exports = config;