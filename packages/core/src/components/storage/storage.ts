import {Field} from "./memory-storage";

export interface Storage {
    load(): Promise<Map<string, Field[]>>
    delete(field: string, client: string): void;
    add(field: string, client: string): void;
}
