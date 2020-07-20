import {Controller} from "./controller"
import * as express from 'express'
import {Config, VoyagerShieldConfig} from "../config/voyager-shield-config"

export class ConstraintsController implements Controller {
    private router = express.Router()

    constructor() {
        this.routes()
    }

    public routes() {
        VoyagerShieldConfig.init({
            app: this.router,
            clientExtractor: requestContext => {
                return 'saca'
            }
        } as Config)
    }

}
