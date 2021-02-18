import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Loader from '../Utils/Loader';
import Button from '../Utils/Button';

const Ingredients = ({ingredients, onDelete}) => {
  return (
    <div>
      <h1>Ingredients</h1>
      {ingredients === null ? <Loader/> : <IngredientsList ingredients={ingredients} onDelete={onDelete}/>}
    </div>
  );
};

function IngredientsList({ingredients, onDelete}) {
  return (
    <ul>
      {ingredients.map(ingredient => (
        <Ingredient key={ingredient.id} ingredient={ingredient} onDelete={onDelete}/>
      ))}
    </ul>
  );
}

function Ingredient({ingredient, onDelete}) {

  const [loading, setLoading] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true)
    await onDelete(ingredient)
  };

  return <li>
    {ingredient.title}
    <Button onClick={handleDelete} type='danger' loading={loading}>Supprimer</Button>
  </li>;
}

export default Ingredients;

Ingredients.propTypes = {
  ingredients: PropTypes.array,
};
IngredientsList.propTypes = {
  ingredients: PropTypes.array,
};

