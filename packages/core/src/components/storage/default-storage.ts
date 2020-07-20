import {Storage} from "./storage";
import {Field, MemoryStorage} from "./memory-storage";


export class DefaultStorage implements Storage {

    add(field: string, client: string): void {
       MemoryStorage.memory().add(field, client)
    }

    delete(field: string, client: string): void {
        MemoryStorage.memory().delete(field, client)
    }

    load(): Promise<Map<string, Field[]>> {
        return new Promise((resolve) => resolve(MemoryStorage.memory().getConstraints()));
    }


}
