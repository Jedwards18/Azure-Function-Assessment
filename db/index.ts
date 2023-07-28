export interface IDatabase {
    write(data: JSON): Promise<void>;
    connect(): any;
}

export class DataPersister {
    private _database: IDatabase;

    public constructor(database: IDatabase) {
        this._database = database;
    }

    public async persist(data: JSON): Promise<void> {
        try {
            await this._database.write(data);
        } catch (error: any) {
            throw error;
        }
    }

    public connect() {
        try {
            this._database.connect()
        } catch (error: any) {
            throw error;
        }
    }
}

export class PostgresDatabase implements IDatabase {
    write(data: JSON): Promise<void> {
        throw new Error('Method not implemented.');
    }

    connect(): any {
        console.log('connected to PostgreSQL db')
    }
}

export class SqlDatabase implements IDatabase {
    write(data: JSON): Promise<void> {
        throw new Error('Method not implemented.');
    }

    connect(): any {
        console.log('connected to PostgreSQL db')
    }
}

export class FileWriter implements IDatabase {
    write(data: JSON): Promise<void> {
        throw new Error('Method not implemented.');
    }

    connect(): any {
        console.log('connected to PostgreSQL db')
    }
}

