import {VoyagerShieldConfig} from "../..";


export class Field {
    id: string

    constructor(id: string) {
        this.id = id
    }
}

export class MemoryStorage {

    private static constraints = new Map<string, Field[]>();

    static load(values: Map<string, Field[]>) {
        MemoryStorage.constraints = values;
    }

    add(field: string, client: string): void {
        client = client == null || client == undefined ? "unknown" : client.toLowerCase()

        if (MemoryStorage.constraints.get(client) == null) {
            MemoryStorage.constraints.set(client, [{id: field}])
            VoyagerShieldConfig.config.storage.add(field, client);
            return
        }

        if (MemoryStorage.constraints.get(client)?.filter(fieldItem => field === fieldItem.id).length == 0) {
            MemoryStorage.constraints.get(client)?.push({id: field})
            VoyagerShieldConfig.config.storage.add(field, client);
            return
        }
    }

    delete(field: string, client: string): void {
        if (MemoryStorage.constraints.get(client.toLowerCase()) == undefined) {
            console.log("Not deleted because the field or client was not selected.")
            return;
        }

        // @ts-ignore
        MemoryStorage.constraints.set(client.toLowerCase(), MemoryStorage.constraints.get(client.toLowerCase())?.filter(fieldItem => !fieldItem.id.includes(field)))
        VoyagerShieldConfig.config.storage.delete(field, client.toLowerCase());
    }

    hasPermission(client: string, field: string): boolean {
        if (MemoryStorage.constraints.get(client.toLowerCase()) == undefined || MemoryStorage.constraints.get(client.toLowerCase())?.length == 0) {
            return true;
        }
        // @ts-ignore
        return MemoryStorage.constraints.get(client)?.filter(fieldItem => fieldItem.id.includes(field)).length > 0;
    }

    getConstraints(): Map<string, Field[]> {
        return MemoryStorage.constraints;
    }

    static memory(): MemoryStorage {
        return new MemoryStorage();
    }
}
