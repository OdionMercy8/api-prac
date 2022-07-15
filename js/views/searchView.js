import { element } from './base';
export const getInput = () => element.searchInput.value;

export const clearInput = () => {
    element.searchInput.value = '';
};

export const clearlist = () =>{
    element.searchlist.innerHTML = '';
    element.pages.innerHTML = ''
};

export const reduceTitle = ((title , limit = 20) =>{
    const newTitle = [] ;
    if (title.length >  limit) {
        title.split(' ').reduce((acc, cur ) =>{
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        },0)
        return `${newTitle.join(' ')}...`
    }

    return title;
    
})

export const hightlightedRec = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(ele => {
        ele.classList.remove('recipe--active')
    })

    document.querySelector(`a[href*="${id}"]`).classList.add('recipe--active')
}

const renderRecipe = recipe => {
   const markup = `
    <li>
    <a class = "results__link results__link--active" href="#${recipe.id}">
       <figure >
           <img src="${recipe.image}" alt=image class="results__fig">
       </figure>
       <div class="results__pages">
          <h4 class="results__name">${reduceTitle(recipe.title)}</h4>
          <p class="results__author"> vegetarian: ${recipe.vegetarian}</p>
       </div>
   </a> 
   </li>
   `
   ;
   element.searchlist.insertAdjacentHTML('beforeend', markup)
};

const createButtons = (page, type) => {
    return `
        <button class="pages__${type} page__btn" data-goto=${type === 'prev' ? page -1 : page + 1}>
            <div class="pages__text">page ${type === 'prev' ? page -1 : page + 1}</div> 
        </button>
    `
}

const renderButtons = (page, numberResults, resPerPage) => {
    const pages = Math.ceil(numberResults/resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        //display only next button
        button =createButtons(page , 'next')

    }else if (page < pages) {
       //display both buttons
       button = `${createButtons(page , 'prev')}
                 ${createButtons(page , 'next')}`

    }else if (page === pages  && pages > 1) {
        //display both prev button
        button =createButtons(page , 'prev')
    }else{
        return ' ';
    }

    element.pages.insertAdjacentHTML('afterbegin', button)

}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    renderButtons (page,recipes.length, resPerPage)
    const start = (page -1) * resPerPage
    const end = page * resPerPage
    recipes.slice(start, end).forEach(renderRecipe)
};
