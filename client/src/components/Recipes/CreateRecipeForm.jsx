import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Field from '../Ui/Field';
import Loader from '../Ui/Loader';
import Button from '../Ui/Button';
import {Trash} from '../Ui/Icons';

const CreateRecipeForm = ({ingredients}) => {

  const {
    ingredients: recipeIngredients,
    addIngredient,
    updateQuantity,
  } = useIngredients();

  const filteredIngredients = (ingredients || []).filter(ingredient => {
    return !recipeIngredients.some(i => i.id === ingredient.id);
  });

  return (
    <div className="row">
      <div className="col-md-6">
        <Field name="title">Titre</Field>
        <Field name="short" type="textarea">Description courte</Field>
        <Field name="content" type="textarea">Description</Field>
      </div>
      <div className="col-md-6">
        <h5>Ingredients</h5>
        {recipeIngredients.map(i => <IngredientRow key={i.id} ingredient={i} onChange={updateQuantity}/>)}
        {ingredients ? <Select ingredients={filteredIngredients} onChange={addIngredient}/> : <Loader/>}
      </div>
    </div>
  );
};

const IngredientRow = ({ingredient, onChange}) => {

  const handleChange = (e) => {
    onChange(ingredient, e.target.value)
  }

  return <div className="d-flex mb-3 align-items-center justify-content-between">
    <div>{ingredient.title}</div>
    <Field onChange={handleChange} className="mb-0" defaultValue={ingredient.quantity} placeholder="quantité"/>
    <div>{ingredient.unit}</div>
    <Button type="danger"><Trash/></Button>
  </div>;
};

/**
 * Select pour sélectionner les ingredients
 * @param {array} ingredients
 * @param {function} onChange
 */
const Select = ({ingredients, onChange}) => {

  const handleChange = (e) => {
    onChange(ingredients[parseInt(e.target.value, 10)]);
  };

  return <select className="form-control" onChange={handleChange}>
    <option>Sélectionner un ingredients</option>
    {ingredients.map((i, k) => (
      <option key={i.id} value={k}>{i.title}</option>
    ))}
  </select>;
};

/**
 * Hook perso pour l'ajout et la mise a jour des ingredients du select
 * @returns {{addIngredient: addIngredient, ingredients: *[]}}
 */
const useIngredients = () => {
  const [ingredients, setIngredients] = useState([]);

  return {
    ingredients: ingredients,
    addIngredient: (ingredient) => {
      setIngredients(state => [...state, ingredient]);
    },
    updateQuantity: (ingredient, quantity) => {
      setIngredients(state => state.map(i => i === ingredient ? {...i, quantity} : i));
    },
  };
};

CreateRecipeForm.propTypes = {
  ingredients: PropTypes.array,
};

export default CreateRecipeForm;
