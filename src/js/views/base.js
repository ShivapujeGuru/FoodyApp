export const elements = {
    searchForm: document.querySelector('.searchQuery'),
    searchInput: document.querySelector('#searchField'),
    loaderSvg: document.querySelector('#loderSvg'),
    recipesResultList: document.querySelector('#recipesResultList'),
    filterList: document.querySelector('#filterList'),
    resPagination: document.querySelector('#resPagination'),
    recipe: document.querySelector('#recipeProfileRender')
};

export const elementStrings = {
    loader: 'loaderImage'
};

export const renderLoader = parent => {
    const loader = ` 
    <div class="${elementStrings.loader}">
        <img src="images/three-dots.svg" alt="Loader">
    </div>`;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`)
    if (loader) loader.parentElement.removeChild(loader);
};




