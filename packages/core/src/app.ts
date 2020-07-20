import * as express from 'express'
import { Application } from 'express'

export class App {
    public app: Application
    public port: number

    constructor(appInit: { port: number, controllers: any}) {
        // @ts-ignore
        this.app = express()
        this.port = appInit.port
        this.routes(appInit.controllers)
        this.assets()
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    private assets() {
        //this.app.use(express.static('public'))
        this.app.use(express.static('node_modules'))
        this.app.use(express.static('dist/public'))
        this.app.use(express.static('dist'))
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(` App listening on the http://localhost:${this.port}`)
        })
    }
}
