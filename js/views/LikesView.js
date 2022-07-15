import { element } from './base';
import {reduceTitle} from './searchView'

export const toggleLike = (isliked) =>{
    if (isliked) {
        document.querySelector('.recipe__like').classList.add('white')
    }else{
        document.querySelector('.recipe__like').classList.remove('white')
    }
    
};


export const likemenu = numlike => {
    (numlike > 0) ? element.like.style.visibility = 'visible' :  element.like.style.visibility = 'hidden'
    //element.like.style.visibility = numlike > 0 ? 'visible' : 'hidden';
};

export const renderResults = (like) => {
    const markup = `
    <li>
    <a class = "like__link like__link--active" href="#${like.id}">
       <figure >
           <img src="${like.image}" alt=image class="like__fig">
       </figure>
       <div class="like__pages">
          <h4 class="like__name">${reduceTitle(like.title)}</h4>
          <p class="like__author"> vegetarian: ${like.vegetarian}</p>
       </div>
    </a> 
    </li>
    `;

    element._likeList.insertAdjacentHTML('beforeend', markup)
}

export const deleteLike = (id) => {
    const ele = document.querySelector(`like__link[href*="${id}"]`).parentElement
    if(el) ele.parentElement.removeChild(ele);
}