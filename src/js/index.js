import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as base from './views/base';


/**
* FILTER CONTROLLER
*/
$(document).ready(function () {
    $('.list .master.checkbox').checkbox({
        // check all children
        onChecked: function () {
            let $childCheckbox = $(this).closest('.checkbox').siblings('.list').find('.checkbox');
            $childCheckbox.checkbox('check');
        },
        // uncheck all children
        onUnchecked: function () {
            let $childCheckbox = $(this).closest('.checkbox').siblings('.list').find('.checkbox');
            $childCheckbox.checkbox('uncheck');
        }
    });
    $('.list .child.checkbox').checkbox({
        // Fire on load to set parent value
        fireOnInit: true,
        // Change parent state on each child checkbox change
        onChange: function () {
            let $listGroup = $(this).closest('.list'),
                $parentCheckbox = $listGroup.closest('.item').children('.checkbox'),
                $checkbox = $listGroup.find('.checkbox'),
                allChecked = true,
                allUnchecked = true;

            // check to see if all other siblings are checked or unchecked
            $checkbox.each(function () {
                if ($(this).checkbox('is checked')) {
                    allUnchecked = false;
                } else {
                    allChecked = false;
                }
            });
            // set parent checkbox state, but dont trigger its onChange callback
            if (allChecked) {
                $parentCheckbox.checkbox('set checked');
            }
            else if (allUnchecked) {
                $parentCheckbox.checkbox('set unchecked');
            }
            else {
                $parentCheckbox.checkbox('set indeterminate');
            }
        }
    });

    // Render queries from array 
    searchView.filterListData();
});

/**
* FILTER CONTROLLER
*/

/* 
Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Linked recipes 
*/
const state = {};


base.elements.searchForm.addEventListener('submit', keyword => {
    keyword.preventDefault();
    controllSearch();
});

window.addEventListener('load', function () {
    controllSearch();
});

/**
* SEARCH CONTROLLER
*/

const controllSearch = async () => {
    // 1) Get query from the view
    const query = searchView.getInput() ? searchView.getInput() : searchView.randomQuery();

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        try {
            // 3) Prepare UI results
            searchView.clearResults();
            base.renderLoader(base.elements.loaderSvg);

            // 4) Search for recipes
            await state.search.getResults();

            // Render the results on UI
            base.clearLoader();
            searchView.renderResult(state.search.result);

            searchView.clearInput();
        } catch (error) {
            console.log('Something went wrong with search...');
            base.clearLoader();
            searchView.clearInput();
        }
    };
};

base.elements.resPagination.addEventListener('click', function (e) {
    const btn = e.target.closest('.btnComn');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResult(state.search.result, goToPage);
    }
});

/**
* PROFILE CONTROLLER
*/

const controlRecipe = async () => {
    // 1) get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // 2)prepare UI for changes

        // 3) creat new recipe OBJECT
        state.recipe = new Recipe(id);

        try {
            recipeView.clearRecipe()
            base.renderLoader(base.elements.loaderSvg)
            // 4) get recipe DATA
            await state.recipe.getRecipe();

            base.clearLoader();
            state.recipe.parseIngredients();

            // 5) calculate SERVINGS and TIME
            state.recipe.calcTime();
            state.recipe.calcServings();

            // 6) render recipe
            recipeView.renderRecipe(state.recipe)
        } catch (error) {
            base.clearLoader();
            alert('Error processing Recipes !');
        }
    }
}

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));



