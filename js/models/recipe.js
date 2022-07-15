import axios from  'axios'

export default class Recipe {
    constructor(id) {
       this.id = id;
    }
    async _getRecipe () {
        const key = 'bb58fd93fa904e578113ffc36c5c64b8';
        //1st key = bb58fd93fa904e578113ffc36c5c64b8  oseiweife@gmail
        //2nd key =  7a14283c7fba4f4782744ff1581c2800  ioseiwe@gmail
        try{
            const result = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}`);
            this.title = result.data.title;
            this.img = result.data.image;
            this.url = result.data.sourceUrl;
            this.ingredients = result.data.extendedIngredients.map(ele => {
                let newIng = {
                    amount : ele.amount,
                    unit : ele.unit,
                    realName : ele.name
                }

                return newIng
                
            });
            this.time = result.data.readyInMinutes
           
        }catch(error){
            console.log(error)
            alert('something when wrong :(')
        }
    }

    calcServings(){
        this.servings = 4
    }

    updateServings(type){
        //update the servings
        const newServings = type === 'dec'? this.servings - 1 : this.servings + 1;

        //update the amount
        this.ingredients.forEach(ing => {
            ing.amount = ing.amount * (newServings / this.servings)
        });
        this.servings = newServings

    }

}