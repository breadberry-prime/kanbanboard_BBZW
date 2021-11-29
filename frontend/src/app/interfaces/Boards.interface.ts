export enum COLUMN_NAME {
  BACKLOG,
  IN_PROGRESS,
  DONE
}

export enum VIEW_STATUS {
  CREATE,
  ALTERNATE
}

export interface Task{
  value?: string
  column?: COLUMN_NAME
}
