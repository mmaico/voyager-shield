import {Controller} from "./controller"
import * as express from 'express'
import {getIntrospectionQuery} from "graphql";
const fetch = require('node-fetch');

export class GraphqlController implements Controller {
    private path = "/graphql"
    private router = express.Router()

    constructor() {
        this.routes()
    }

    public routes() {
        this.router.post(this.path, ((req, res) => {
            this.graphqlSchema().then(value => res.status(200).json(value))
        }))
    }

    async graphqlSchema(): Promise<any> {
        console.log("called");
        const res = await fetch("http://localhost:4000/graphql", {
            method: 'POST',
            body: JSON.stringify({ query: getIntrospectionQuery()}),
            headers: { 'content-type': 'application/json' }
        })

        if (!res.ok) throw Error(`${res.status} ${res.statusText} \n ${await res.text()}`)

        return await res.json()
    }

}
