export interface IRepository<T> {
    findAll(filter?: any): Promise<T[]>;
    findOne(filter: any): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}
