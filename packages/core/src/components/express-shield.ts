import {VoyagerShieldConfig} from "../config/voyager-shield-config";

import * as fs from "fs"
import * as path from 'path'

let template = require('es6-template-strings')

export function expressMiddlewareShield() {
    let shieldEndpointUrl  = VoyagerShieldConfig.config.shieldUrl;

    let filePath = path.join(__dirname, '..', '..', 'dist', 'public', 'index.html')
    let fileContent = fs.readFileSync(filePath, 'utf-8')

    return (_req: any, res: any) => {
        res.setHeader('Content-Type', 'text/html');
        res.write(template(fileContent, { shieldEndpointUrl }));
        res.end();
    };
}
