import * as base from './base';

export const getInput = () => base.elements.searchInput.value;

export const clearInput = () => {
    base.elements.searchInput.value = ''
};

export const clearResults = () => {
    base.elements.recipesResultList.innerHTML = '';
    base.elements.resPagination.innerHTML = '';
};

var recipeQueries = ["carrot", "broccoli", "asparagus", "cauliflower", "corn", "cucumber", "green pepper", "lettuce", "mushrooms", "onion", "potato", "pumpkin", "red pepper", "tomato", "beetroot", "brussel sprouts", "peas", "zucchini", "radish", "sweet potato", "artichoke", "leek", "cabbage", "celery", "chili", "garlic", "basil", "coriander", "parsley", "dill", "rosemary", "oregano", "cinnamon", "saffron", "green bean", "bean", "chickpea", "lentil", "apple", "apricot", "avocado", "banana", "blackberry", "blackcurrant", "blueberry", "boysenberry", "cherry", "coconut", "fig", "grape", "grapefruit", "kiwifruit", "lemon", "lime", "lychee", "mandarin", "mango", "melon", "nectarine", "orange", "papaya", "passion fruit", "peach", "pear", "pineapple", "plum", "pomegranate", "quince", "raspberry", "strawberry", "watermelon", "salad", "pizza", "pasta", "popcorn", "lobster", "steak", "bbq", "pudding", "hamburger", "pie", "cake", "sausage", "tacos", "kebab", "poutine", "seafood", "chips", "fries", "masala", "paella", "som tam", "chicken", "toast", "marzipan", "tofu", "ketchup", "hummus", "chili", "maple syrup", "parma ham", "fajitas", "champ", "lasagna", "poke", "chocolate", "croissant", "arepas", "bunny chow", "pierogi", "donuts", "rendang", "sushi", "ice cream", "duck", "curry", "beef", "goat", "lamb", "turkey", "pork", "fish", "crab", "bacon", "ham", "pepperoni", "salami", "ribs"];

export const filterListData = () => {
    for (let i = 0; i <= recipeQueries.length - 1; i++) {
        let renderRecipesFilter = `
        <div class="item childItem">
            <div class="ui child checkbox childCheck radio">
                <input type="checkbox" value="${recipeQueries[i]}">
                <label>${recipeQueries[i]}</label>
            </div>
        </div>`
        base.elements.filterList.insertAdjacentHTML('beforeend', renderRecipesFilter);
    };
};

export const randomQuery = () => {
    let queryIndex = Math.ceil(Math.random() * (127 - 1) + 1);
    let randomSearchQuery = recipeQueries[queryIndex];
    return randomSearchQuery;
}

export const renderResult = (recipes, page = 1, resPerPage = 9) => {
    // render results for current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    if (recipes) {
        recipes.slice(start, end).forEach(renderRecipe);
    } else {
        clearResults();
        resultsNotFound();
    }

    // render results for pagination
    renderButtons(page, recipes.length, resPerPage);
};

// type : 'next' or 'prev'
const creatButton = (page, type) => `
<button class="ui small basic button btnComn Btn${type}" data-goto=${type == 'prev' ? page - 1 : page + 1}>
    <i class="ui angle ${type == 'next' ? 'right' : 'left'} icon"></i>
    <p>${type == 'prev' ? page - 1 : page + 1}</p>
</button>`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
  
    let button
    if (page === 1 && pages > 1) {
        // display only button to go to next page 
        button = creatButton(page, 'next');
    } else if (page == pages && pages > 1) {
        // display only button to got to prev page
        button = creatButton(page, 'prev');
    }
    else if (page > 1) {
        // display both bottons
        button = `
            ${creatButton(page, 'prev')}
            ${creatButton(page, 'next')}
        `;
    } else {
        button = ``; 
    }


    base.elements.resPagination.insertAdjacentHTML('afterbegin', button);
}

const renderRecipe = recipe => {
    let limitRecepiTitle = recipe.title.length > 22 ? recipe.title.slice(0, 20) + ' . .' : recipe.title;
    let ratingValue = (Math.random() * 5).toFixed(1);
    let limitRating = (ratingValue > 2.5) ? ratingValue : 2.6;
    // onclick="window.location='${recipe.source_url}'"
    const markup = `
    <div class="five wide column">
        <a href="#${recipe.recipe_id}">
            <div class="ui card recipeCard">
                <div class="image">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </div>
                <div class="content">
                    <div class="title">
                        <h4>${limitRecepiTitle}</h4>
                    </div>
                    <div class="meta">
                        <span>
                            <i class="small star icon"></i>
                            ${limitRating}
                        </span>
                        <span class="right floated">
                            <i class="small user icon"></i>
                            ${recipe.publisher}
                        </span>
                    </div>
                </div>
            </div>
        </a>
    </div>`;
    base.elements.recipesResultList.insertAdjacentHTML('beforeend', markup);
};

const resultsNotFound = () => {
    const notFound = `
    <div class="notFound">
        <img src="images/empty.svg" alt="Empty">
        <div class="notFoundText">
            <p>oops ! Sorry we could not find any matching results for "${getInput()}"</p>
        </div>
    </div>
    `
    base.elements.recipesResultList.insertAdjacentHTML('beforeend', notFound);
};

