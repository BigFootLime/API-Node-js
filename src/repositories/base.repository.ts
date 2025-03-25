// Purpose: Base repository interface for the CRUD operations.
// The IRepository interface defines the methods for CRUD operations.

export interface IRepository<T> {
    // This example uses the Promise class to handle asynchronous operations.
    // The findAll method returns a Promise that resolves to an array of T objects.
    findAll(filter?: any): Promise<T[]>;
    findOne(filter: any): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}
