import {App} from "./app";
import {GraphqlController} from "./controllers/graphql.controller";
import {ConstraintsController} from "./controllers/constraints.controller";

const app = new App({
    port: 3001,
    controllers: [
        new GraphqlController(),
        new ConstraintsController()
    ]
})

app.listen()
