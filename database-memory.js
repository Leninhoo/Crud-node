import { randomUUID } from "node:crypto";
export class DataBaseMemory{

    #items = new Map();

    create(item) {
        const itemID = randomUUID();
        this.#items.set(itemID, item);
    }
    update(id, item){
        this.#items.set(id, item);
    }
    delete(id){
        this.#items.delete(id);
    }
    list(search){
        return Array.from(this.#items.entries())
        .map((itemArray) => {
            const id = itemArray[0];
            const data = itemArray[1];

            return{
                id,
                ...data
            }})
        .filter(item => {
                if (search) {
                return item.title.includes(search)
            }
            return true;
        });
    }
}