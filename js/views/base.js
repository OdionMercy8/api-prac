export const element = {
    searchInput : document.querySelector('.search__here'),
    searchForm : document.querySelector('.search'),
    search : document.querySelector('.search__box'),
    searchlist : document.querySelector('.results__list'),
    results :  document.querySelector('.results'),
    pages :   document.querySelector('.pages'),
    recipe :   document.querySelector('.recipe'),
    list :   document.querySelector('.shopping__list'),
    like :   document.querySelector('.like__panel'),
   _likeList :   document.querySelector('.like__list'),
};

export const  renderLoader = parent => {
    const loader = `<div>
                       <div class = "loader">/</div>
                   </div>`;
    parent.insertAdjacentHTML('afterbegin', loader)               
}

export const clearLoader = () => {
    const loader =  document.querySelector('.loader')
    loader.parentElement.removeChild(loader)
}
