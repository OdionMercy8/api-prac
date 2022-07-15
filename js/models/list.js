import uniqid from 'uniqid'
export  default class List {
    constructor() {
        this.items = [];
    }

    allItems(amount, unit , ingredient){
        const item = {
            id : uniqid(),
            amount,
            unit,
            ingredient,
        }

        this.items.push(item)
        return item
    }

    delItem(id){
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index , 1);
    }

    updateCount(id, newcount){
        this.items.find(el => el.id === id).amount = newcount
    }
}