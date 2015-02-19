declare module 'vogels' {
  export function define(name: string, callback: (Schema) => void): Model;

  export class Schema {
    String: defineSchemaField;
    Number: defineSchemaField;
    Boolean: defineSchemaField;
  }

  export class Model {
    public config(opts: ModelConfiguration);

    public update(data: any, callback: (err: any) => void);
    public update(data: any, expected: Object, callback: (err: any) => void);

    public query(hashKey: string): Queries.Query.Executable;

    public get(hashKey: string, rangeKey: string, constraint: Queries.Get.Constraint,
      callback: (err: any, result: Queries.Get.Result) => void);

    public destroy(hashKey: string, rangeKey: string, callback: (err: any) => void);

    public createTable(opts: Object, callback: (err: any) => void);

    public describeTable(callback: (err: any, data?: {Table: Table}) => void);
  }

  export module Queries {
    export interface Item {
      get(field: string): any;
    }

    export module Query {
      export interface Result {
        Items: Queries.Item[];
      }

      export interface Executable {
        filter(field: string): Queries.Query.Executable;
        gt(value: number): Queries.Query.Executable;
        lt(value: number): Queries.Query.Executable;
        loadAll(): Queries.Query.Executable;
        exec(callback: (err: any, data: Queries.Query.Result) => void): void;
      }
    }

    export module Get {
      export interface Constraint {
        ConsistentRead?: Boolean;
        AttributesToGet?: string[];
      }

      export interface Result extends Queries.Item {}
    }
  }


  export interface defineSchemaField {
    (name: string, constraint?: FieldConstraint): Field;
  }

  export interface FieldConstraint {
    hashKey?: Boolean;
    rangeKey?: Boolean;
    default?: any;
  }

  export interface Field {
    required:() => void;
  }

  export interface ModelConfiguration {
    tableName?: string;
    dynamodb?: any;
  }

  export interface Table {
    TableStatus: string;
  }
}
