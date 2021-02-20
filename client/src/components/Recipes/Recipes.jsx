import React, {memo} from 'react';
import PropTypes from 'prop-types';
import Loader from '../Ui/Loader';
import Button from '../Ui/Button';

const Recipes = ({recipes, onClick}) => {
  return (
    <div className="container">
      <h1>Recettes</h1>
      {recipes === null ?
        <Loader/> :
        <div className='row'>
          {recipes.map(recipe => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <Recipe recipe={recipe} onClick={onClick}/>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

const Recipe = memo(({recipe, onClick}) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title">{recipe.title}</div>
        <p className="card-text">{recipe.short}</p>
        <Button onClick={() => onClick(recipe)}>Voir la recette</Button>
      </div>
    </div>
  );
});

export default Recipes;

Recipes.propTypes = {
  recipes: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};
