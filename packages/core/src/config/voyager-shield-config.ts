import {GraphQLRequestContext} from "apollo-server-core";


import {ConstraintShieldComponent} from "../components/constraint-shield.component";
import {Storage} from "../components/storage/storage";

import {DefaultStorage} from "../components/storage/default-storage";
import {expressMiddlewareShield} from "../components/express-shield";


declare interface Config {
    app: any
    shieldUrl: string
    graphQLSchemaURL: string
    shieldUrlApi: string
    clientExtractor: (requestContext: GraphQLRequestContext<any>) => string
    storage: Storage
}

class VoyagerShieldConfig {
    public static config: Config

    public static init(config: Config) {
        VoyagerShieldConfig.config = config

        let app = config.app

        ConstraintShieldComponent.clientExtractor = config.clientExtractor

        VoyagerShieldConfig.config.shieldUrl = config.shieldUrl == undefined ? '/voyager-shield' : config.shieldUrl
        VoyagerShieldConfig.config.graphQLSchemaURL = config.graphQLSchemaURL == undefined ? '/graphql' : config.graphQLSchemaURL
        VoyagerShieldConfig.config.storage = config.storage == undefined ? new DefaultStorage(): config.storage
        VoyagerShieldConfig.config.shieldUrlApi = config.shieldUrlApi == undefined ? ConstraintShieldComponent.DEFAULT_ENDPOINT_URL : config.shieldUrlApi

        app.use(VoyagerShieldConfig.config.shieldUrl, expressMiddlewareShield())
        app.use(VoyagerShieldConfig.config.shieldUrlApi, ConstraintShieldComponent.shieldConstraintsEndpoint)
    }
}
export { VoyagerShieldConfig, Config}
