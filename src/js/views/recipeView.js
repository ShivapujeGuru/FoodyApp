import * as base from './base';
import {Fraction} from 'fractional';

export const clearRecipe = () => {
    base.elements.recipe.innerHTML = '';
};

const formatCount = count => {
    if (count) {
        // Ex: count 2.5 ---> 2 1/2

        const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));

        if(!dec) return count;

        if(int === 0) {
            const fr = new Fraction(count);
            return `${fr.numerator}/${fr.denominator}`;
        } else {
            const fr = new Fraction(count - int);
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }

    }
    return '?'
}

const creatIngredient = ingredient => `
<li> 
    <span>${formatCount(ingredient.count)} </span>
    <span>${ingredient.unit} </span>
    ${ingredient.ingredient}
</li>`;

export const renderRecipe = recipe => {
    const markup = `
    <div class="profileTitle">
        <h2>${recipe.title}</h2>
    </div>
    <div class="profileImage">
        <img src="${recipe.img}" alt="${recipe.title}">
    </div>
    <div class="meta">
        <p>by ${recipe.publisher}</p>
    </div>
    <div class="profileContent">
        <div class="TimeAndServe">
            <div class="timeToPrepare">
                <i class="ui time outline icon"></i>
                <span>${recipe.time} </span>
                <span>Minutes</span>
            </div>
            <div class="numOfServings">
                <i class="ui female icon"></i>
                <span>${recipe.servings} </span>
                <span>Servings</span>
            </div>
            <div class="addToFavorite">
                <button class="ui circular icon button" id="favorite">
                    <i class="ui star outline icon"></i>
                </button>
            </div>
        </div>    
        
        <div class="profileIngredients ui raised yellow segment">
            <div class="ingredientsTitle">
                <img src="images/ingredients.png" alt="Ingredients">
                <h3>Ingredients</h3>
            </div>
            <div class="ingredientsContent">
                <ul>
                ${recipe.ingredients.map(el => creatIngredient(el)).join('')}
                </ul>
                <button class="ui basic yellow button addCartBtn">
                    <i class="ui cart plus icon"></i>
                    <span>Add to Shopping List</span>
                </button>
            </div>
            <div class="howToCook">
                <div class="howToCookTitle">
                    <img src="images/kitchen.png" alt="How_to_Cook">
                    <h3>How to Cook it ?</h3>
                </div>
                <div class="howToCookBody">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, placeat perferendis. Voluptatibus adipisci numquam ex nesciunt tempora laudantium, autem maiores error, deserunt aut voluptatum? Placeat necessitatibus sunt ipsam quod? Harum!</p>
                </div>
            </div>
        </div>
    </div>`;

    base.elements.recipe.insertAdjacentHTML('beforeend', markup);

    // favorite button toogle ui
    $('#favorite').click(function () {
        $('#favorite').children().toggleClass('outline');
    })
}