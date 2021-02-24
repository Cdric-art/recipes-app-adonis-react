import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Ui/Loader';
import Modal from '../Ui/Modal';
import {useToggle} from '../../hooks';
import {EditRecipeForm} from './RecipeForm';
import Button from '../Ui/Button';

const Recipe = ({recipe, onClose, onEdit, onUpdate, onDelete, ingredients}) => {
  return (
    <Modal title={recipe.title} onClose={onClose}>
      {!recipe.ingredients ?
        <Loader/> :
        <RecipeDetail recipe={recipe} onEdit={onEdit} onUpdate={onUpdate} ingredients={ingredients}/>
      }
      <Button onClick={() => onDelete(recipe)} type="danger">Supprimer</Button>
    </Modal>
  );
};

const RecipeDetail = ({recipe, ingredients, onEdit, onUpdate}) => {

  const [editMode, toggleEditMode] = useToggle(false);

  const handleUpdate = async (data) => {
    await onUpdate(recipe, data)
    toggleEditMode()
  }

  const handleEditMode = () => {
    toggleEditMode();
    onEdit();
  };

  const htmlContent = {__html: recipe.content.split('\n').join('<br/>')};

  return editMode ?
    <EditRecipeForm recipe={recipe} ingredients={ingredients} onSubmit={handleUpdate}/>
    :
    <>
      <div className="mb-3" dangerouslySetInnerHTML={htmlContent}/>
      <h5 className="mb-1">Ingredients</h5>
      <ul>
        {recipe.ingredients.map(i => <IngredientRow ingredient={i} key={i.id}/>)}
      </ul>
      <button onClick={handleEditMode} className="btn btn-primary">Éditer</button>
    </>;
};

const IngredientRow = ({ingredient}) => {
  return <li>
    <strong>{ingredient.quantity} {ingredient.unit}</strong>
    <span> {ingredient.title}</span>
  </li>;
};

export default Recipe;

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};
