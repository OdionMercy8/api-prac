import { element } from './base';
import {Fraction} from 'fractional';

const eachIng = (ingredient) => {
    return `
    <li class="recipe__ingredient--item">
    <span class= "recipe__ingredient--amount"> ${formatNumber(ingredient.amount)}</span>
    <spn class= "recipe__ingredient--unit">${ingredient.unit} </spn>
        ${ingredient.realName}
    </li>
    `
}

const formatNumber = (count) => {
    if (count) {
        const [int , dec] = count.toString().split('.').map(el => parseInt(el , 10)) 

        if(!dec) {return count}

        if (int === 0) {
            const fr = new Fraction(count)
            return `${fr.numerator} / ${fr.denominator}`
        }else {
            const fr = new Fraction(count - int)
            return `${int}  ${fr.numerator} / ${fr.denominator}`
        }
    }

    return '?';
}

export const clearRecipe = () => {
    element.recipe.innerHTML = ''
}

export const renderRecipe = (recipe, isLiked) => {
    const markup =  `
    <figure class="recipe__box">
        <img src="${recipe.img}" alt="" class="recipe__img">
        <h3 class="recipe__title">
            <span class="span">${recipe.title}</span>
        </h3>
    </figure>
    <div class="recipe__details">
    <div class="recipe__info"> 
        <span class="recipe__info--data  recipe__minute">${recipe.time}</span>
        <span class="recipe__info--text">minutes</span>
    </div>

    <div class="recipe__info recipe__info--2">
        <span class="recipe__info--data  recipe__people">${recipe.servings}</span>
        <span class="recipe__info--text">servings</span>

        <div class="recipe__info--buttons">
            <div class="recipe__info--btn  recipe-remove">-</div>
            <div class="recipe__info--btn  recipe-add">+</div>     
        </div>
    </div>
    <div class="recipe__like">
        lv
    </div>
    </div>

    <div class="recipe__ingredient">
        <h3 class="recipe__ingredient--heading"> recipe  INGREDIENTS  </h3>
        <ul class="recipe__ingredient--list">
        ${recipe.ingredients.map(el => eachIng(el)).join(' ')}
        </ul>

        <button class="recipe__directions--btn">
            add to shooping list 
        </button>
    </div>

    <div class="recipe__directions">
        <div class="recipe__directions--heading ">
            how to cook it
        </div>
        <div class="recipe__directions--para">
            This recipe was carefully designed and tested by <span class="all"> All Recipes</span> All Recipes. Please check out directions at their website.
        </div>
        <a href= "${recipe.url}" target = "_blank" class="recipe__directions--btn">
            directions
        </a>
    </div>
    `

    element.recipe.insertAdjacentHTML('afterbegin', markup)
}

export const upateIngSer = (recipe) => {
    document.querySelector('.recipe__people').textContent = recipe.servings

    const count = document.querySelectorAll('.recipe__ingredient--amount');
    count.forEach((ele, i) =>{
        ele.textContent = formatNumber(recipe.ingredients[i].amount)
    })
}
