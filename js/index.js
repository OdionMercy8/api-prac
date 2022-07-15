import Search from './models/Search'
import Recipe from './models/recipe'
import List  from './models/list'
import Like  from './models/likes'
import {element, renderLoader,  clearLoader} from './views/base'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeview'
import * as listView from './views/listView'
import * as likeView from './views/LikesView'
import '../styles/base.scss'
import '../styles/components.scss'

//GLOBAL STATE 

const state = {};

//search controller

const controlSearch = async () =>{
    //get query from ui
    const _query = searchView.getInput()
   // console.log(_query);
    
    if (_query) {
        //new search object and add to state
        state.search = new Search(_query)

        //prepare the ui for results
        renderLoader(element.results)
        searchView.clearInput()
        searchView.clearlist()  

        try{
            //search for recipes
            await state.search.getRecipe();

            //render the results on the ui
            clearLoader()
            searchView.renderResults(state.search.result)
        }catch(err){
            alert('error :(')
        }

    }
}

element.search.addEventListener('click', e =>{
    controlSearch()
})

element.pages.addEventListener('click', e => {
    const btn = e.target.closest('.page__btn');
    if (btn) {
        const goto = parseInt(btn.dataset.goto , 10)
        searchView.clearlist() 
        searchView.renderResults(state.search.result ,goto)
    }
    
})


//recipe controller

const recipeLog = async () => {
    //get the id
    const id = window.location.hash.replace('#', '')

    if(id){

        //prepare the ui for the changes
        recipeView.clearRecipe()
        renderLoader(element.recipe)

        if (state.recipe) {
            searchView.hightlightedRec(id)  
        }
      
        //create the new object
        state.recipe = new Recipe(id)
     
        try{
            //get the data from the api 
            await state.recipe._getRecipe()

            //calc the servings
            state.recipe.calcServings();

            //render the recipe
            clearLoader()
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );
           
        }catch(err){
            alert(err)
            console.log(err)
        };
        
        
    };

};

window.addEventListener('hashchange', recipeLog)

window.addEventListener('load', recipeLog)


//servings

//list 

const controlList =() =>{
   if (!state.list) {
       state.list = new List()
   }
   
    state.recipe.ingredients.forEach(ele => {
        let item =  state.list.allItems(ele.amount, ele.unit, ele.realName)
        listView.renderList(item)
    });
}

const controlLike = () => {
    if (!state.likes) state.likes = new Like();
    const currentID = state.recipe.id

    if(!state.likes.isLiked(currentID)){
        //update the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            'me',
            state.recipe.img,
        );

        //toggle the love
        likeView.toggleLike(true)

        likeView.likemenu(state.likes.getNumLikes());


        //update yhe ui
        likeView.renderResults(newLike);
        console.log(state.likes);

    }else{
        //remove it from the 

        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            'me',
            state.recipe.img,
        );

        state.likes.deleteLike(currentID)

        //toggle the love
        likeView.toggleLike(false)

        likeView.likemenu(state.likes.getNumLikes());

           
         //update the state
         likeView.renderResults(newLike);

    };
};

window.addEventListener('load', () => {
    state.likes = new Like();

    //retore
    
    state.likes.readStorage()

    likeView.likemenu(state.likes.getNumLikes());

    state.likes.likes.forEach(like => likeView.renderResults(like))
})


//SHOPPING LIST LISTENER
element.list.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.listid;
    if (e.target.matches('.shopping__del, .shopping__del *' )) {
        listView.deleteItem(id)
        state.list.delItem(id)
    }else if (e.target.matches('.shopping__number')){
        if (e.target.value > -1) {
            let val = parseFloat(e.target.value, 10)
            state.list.updateCount(id, val)
            
        }
    }
})

element.recipe.addEventListener('click' , e => {
    if (e.target.matches(".recipe-remove")) {
        //DECREASE BUTTON
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec')
            recipeView.upateIngSer(state.recipe)
        }
    }else if (e.target.matches(".recipe-add")){
        //INCREASE BUTTON
        state.recipe.updateServings('inc')
        recipeView.upateIngSer(state.recipe)
    }else if(e.target.matches(".recipe__directions--btn")){
        // ADD TO LIST BUTTON
        controlList()
    }else if(e.target.matches(".recipe__like")){
        //LIKES BUTTON
        controlLike()
    }
})


//list

