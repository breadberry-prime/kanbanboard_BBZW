import {Document} from "https://deno.land/x/filedb/mod.ts";

export enum COLUMN_NAME {
    BACKLOG,
    IN_PROGRESS,
    DONE
}

export interface Task extends Document{
    value?: string
    column?: COLUMN_NAME
}
