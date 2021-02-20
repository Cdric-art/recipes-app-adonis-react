import React, {useEffect, useState} from 'react';
import Ingredients from './Ingredients/ingredients';
import {useIngredients} from '../hooks/ingredients';
import Recipes from './Recipes/Recipes';
import {useRecipes} from '../hooks/recipes';
import Recipe from './Recipes/Recipe';

function Navbar({currentPage, onClick}) {

  const navClass = (page) => {
    let className = 'nav-item';
    if (page === currentPage) {
      className = ' active';
    }
    return className;
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-5">
      <a href="#home" className="navbar-brand">Recettes</a>
      <ul className="navbar-nav mr-auto">
        <li className={navClass('recipes')}>
          <a href="#recipes" className="nav-link" onClick={() => onClick('recipes')}>Recettes</a>
        </li>
        <li className={navClass('ingredients')}>
          <a href="#ingredients" className="nav-link" onClick={() => onClick('ingredients')}>Ingredients</a>
        </li>
      </ul>
    </nav>
  );
};

const Site = () => {

  const [page, setPage] = useState('recipes');
  const {
    ingredients,
    fetchIngredients,
    deleteIngredient,
    updateIngredient,
    createIngredient,
  } = useIngredients();
  const {
    recipes,
    recipe,
    fetchRecipes,
    fetchRecipe,
    deselectRecipe,
  } = useRecipes()

  let content = null;

  if (page === 'ingredients') {
    content = <Ingredients ingredients={ingredients} onDelete={deleteIngredient} onUpdate={updateIngredient}
                           onCreate={createIngredient}/>;
  } else if (page === 'recipes') {
    content = <Recipes recipes={recipes} onClick={fetchRecipe}/>;
  }

  useEffect(() => {
    if (page === 'ingredients') {
      fetchIngredients();
    }
    if (page === 'recipes') {
      fetchRecipes();
    }
  }, [page, fetchIngredients, fetchRecipes]);

  return (
    <>
      <Navbar currentPage={page} onClick={setPage}/>
      {recipe ? <Recipe recipe={recipe} onClose={deselectRecipe}/> : null}
      {content}
    </>
  );
};

export default Site;
