import React, {useEffect, useState} from 'react';
import Ingredients from './Ingredients/ingredients';
import {useIngredients} from '../hooks/ingredients';
import Recipes from './Recipes/Recipes';
import {useRecipes} from '../hooks/recipes';
import Recipe from './Recipes/Recipe';
import {useToggle} from '../hooks';
import {CreateRecipeForm} from './Recipes/RecipeForm';
import Modal from './Ui/Modal';

function Navbar({currentPage, onClick, onButtonClick}) {

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
      <button className="btn btn-outline-light" onClick={onButtonClick}>Ajouter</button>
    </nav>
  );
};

const Site = () => {

  const [page, setPage] = useState('recipes');
  const [add, toggleAdd] = useToggle(false);
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
    createRecipe,
    deselectRecipe,
    updateRecipe,
    deleteRecipe,
  } = useRecipes();

  let content = null;

  if (page === 'ingredients') {
    content = <Ingredients ingredients={ingredients} onDelete={deleteIngredient} onUpdate={updateIngredient}
                           onCreate={createIngredient}/>;
  } else if (page === 'recipes') {
    content = <Recipes recipes={recipes} onClick={fetchRecipe}/>;
  }

  useEffect(() => {
    if (page === 'ingredients' || add === true) {
      fetchIngredients();
    }
    if (page === 'recipes') {
      fetchRecipes();
    }
  }, [page, fetchIngredients, fetchRecipes, add]);

  return (
    <>
      <Navbar currentPage={page} onClick={setPage} onButtonClick={toggleAdd}/>
      {recipe ? <Recipe
        recipe={recipe}
        ingredients={ingredients}
        onClose={deselectRecipe}
        onEdit={fetchIngredients}
        onUpdate={updateRecipe}
        onDelete={deleteRecipe}
      /> : null}
      {content}
      {
        add && (
          <Modal onClose={toggleAdd} title="Créer une recette">
            <CreateRecipeForm ingredients={ingredients} onSubmit={createRecipe}/>
          </Modal>)
      }
    </>
  );
};

export default Site;
