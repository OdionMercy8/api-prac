import axios from 'axios'


export default class Search{
    constructor(query){
        this.query = query;
    }
    
    async getRecipe(){
        const number = 100;
        const key = '7a14283c7fba4f4782744ff1581c2800';
        try{
            const result = await axios(`https://api.spoonacular.com/recipes/random?number=${number}&tags=${this.query}&apiKey=${key}`);
            this.result = result.data.recipes;
        }catch(error){
            alert(error)
        }   
    }
}

