import * as fs from 'fs';
import * as path from 'path';
import type { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package';

/**
 * Reads and parses the package.json file for a project.
 * @returns The parsed package.json contents
 */
function getPackageJson(location: string = 'package.json'): JSONSchemaForNPMPackageJsonFiles {
    return JSON.parse(
        fs.readFileSync(path.join(process.cwd(), location)).toString()
    );
}

export default getPackageJson;