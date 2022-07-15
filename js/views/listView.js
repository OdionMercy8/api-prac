import { element } from "./base";
export  const renderList = (item) => {
    const markup = `
    <li class="shopping__item" data-listid=${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.amount}" step="${item.amount}" class="shopping__number"><span class = "shopping__unit">${item.unit}</span>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__del"><span class="shopping__icon"> * </span></button>
    </li> 
    `

    element.list.insertAdjacentHTML('beforeend', markup)
}

export const deleteItem = (id) =>{
    const item = document.querySelector(`[data-listid="${id}"]`)
    item.parentElement.removeChild(item);
}