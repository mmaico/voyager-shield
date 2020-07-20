import {GraphQLRequestContext} from "apollo-server-core";
import {MemoryStorage} from "./storage/memory-storage";


export class ConstraintShieldComponent {

    private static actions = new Map<String, (req: any, res: any) => void>([
        [
            "POST", (req: any, res: any) => {
                if (req.query.client != undefined && req.query.client != "undefined" && req.query.client.length > 0) {
                    MemoryStorage.memory().add(req.query.id, req.query.client);
                    res.status(201).json({message: "OK"});
                } else {
                    res.status(400).json({message: "Invalid client or value has already been added"});
                }
            }
        ],
        [
            "GET", (req: any, res: any) => {
                let result = ConstraintShieldComponent.mapToObject(MemoryStorage.memory().getConstraints());
                res.status(200).json(result);
            }
        ],
        [
            "DELETE", (req: any, res: any) => {
                MemoryStorage.memory().delete(req.query.id, req.query.client);
            }
        ]
     ])



    static shieldConstraintsEndpoint(req: any, res: any) {
        let method = req.query.method
        if (!ConstraintShieldComponent.actions.has(method.toUpperCase())) {
            res.status(405).json({message: "Method not Allowed. Supported only POST, GET and DELETE"});
            return;
        }

        // @ts-ignore
        ConstraintShieldComponent.actions.get(method.toUpperCase())(req, res)
    }

    static mapToObject(map: Map<any, any>) {
        let objects: object[] = []
        if (!(map instanceof Map)) return objects;

        // @ts-ignore
        for(let[key, value] of map) {
            let item = {client: key, constraints:value};
            objects.push(item)
        }
        return objects
    }

    static DEFAULT_ENDPOINT_URL: string = "/voyager-shield-api";

    static clientExtractor = (requestContext: GraphQLRequestContext<any>) => 'unknown'

}
