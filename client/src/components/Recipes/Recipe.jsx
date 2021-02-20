import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Ui/Loader';
import Modal from '../Ui/Modal';

const Recipe = ({recipe, onClose}) => {
  return (
    <Modal title={recipe.title} onClose={onClose}>
      {!recipe.content ?
        <Loader/> :
        <RecipeDetail recipe={recipe}/>
      }
    </Modal>
  );
};

const RecipeDetail = ({recipe}) => {
  const htmlContent = {__html: recipe.content.split('\n').join('<br/>')};

  return <>
    <div className="mb-3" dangerouslySetInnerHTML={htmlContent}/>
    <h5 className="mb-1">Ingredients</h5>
    <ul>
      {recipe.ingredients.map(i => <IngredientRow ingredient={i} key={i.id}/>)}
    </ul>
  </>;
};

const IngredientRow = ({ingredient}) => {
  return <li>
    <strong>{ingredient.quantity} {ingredient.unit}</strong>
    <span> {ingredient.title}</span>
  </li>
}

export default Recipe;

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};
