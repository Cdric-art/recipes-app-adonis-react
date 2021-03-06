import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import Field from '../Ui/Field';
import Loader from '../Ui/Loader';
import Button from '../Ui/Button';
import {Trash} from '../Ui/Icons';
import {ApiErrors} from '../Utils/api';

export function CreateRecipeForm({ingredients, onSubmit}) {
  return <RecipeForm ingredients={ingredients} onSubmit={onSubmit} button="Ajouter"/>;
}
export function EditRecipeForm({ingredients, onSubmit, recipe}) {
  return <RecipeForm ingredients={ingredients} onSubmit={onSubmit} recipe={recipe} button="Éditer"/>;
}
const RecipeForm = ({ingredients, onSubmit, recipe = {}, button}) => {

  const {
    ingredients: recipeIngredients,
    addIngredient,
    updateQuantity,
    deleteIngredient,
    resetIngredients,
  } = useIngredients(recipe.ingredients);

  const [errors, setErrors] = useState({})

  const filteredIngredients = (ingredients || []).filter(ingredient => {
    return !recipeIngredients.some(i => i.id === ingredient.id);
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = Object.fromEntries(new FormData(form))
    data.ingredients = recipeIngredients
    setErrors({})
    try {
      await onSubmit(data)
      form.reset()
      resetIngredients()
    } catch (e) {
      if (e instanceof ApiErrors) {
        console.error(e)
        setErrors(e.errorsPerField)
      } else {
        throw e
      }
    }
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <Field name="title" error={errors.title} defaultValue={recipe.title} required>Titre</Field>
        <Field name="short" type="textarea" error={errors.short} defaultValue={recipe.short} required>Description courte</Field>
        <Field name="content" type="textarea" error={errors.content} defaultValue={recipe.content} required>Description</Field>
      </div>
      <div className="col-md-6">
        <h5>Ingredients</h5>
        {recipeIngredients.map(i => <IngredientRow key={i.id} ingredient={i} onChange={updateQuantity} onDelete={deleteIngredient}/>)}
        {ingredients ? <Select ingredients={filteredIngredients} onChange={addIngredient}/> : <Loader/>}
      </div>
      <div className="col-md-12 mt-3">
        <Button type="submit">{button}</Button>
      </div>
    </form>
  );
};

const IngredientRow = ({ingredient, onChange, onDelete}) => {

  const handleChange = (e) => {
    onChange(ingredient, e.target.value);
  };

  return <div className="d-flex mb-3 align-items-center justify-content-between">
    <div>{ingredient.title}</div>
    <Field onChange={handleChange} className="mb-0" defaultValue={ingredient.quantity} placeholder="quantité" type="number" required/>
    <div>{ingredient.unit}</div>
    <Button type="danger" onClick={() => onDelete(ingredient)}><Trash/></Button>
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
const useIngredients = (initial) => {
  const [ingredients, setIngredients] = useState(initial || []);

  return {
    ingredients: ingredients,
    addIngredient: useCallback((ingredient) => {
      setIngredients(state => [...state, ingredient]);
    }, []),
    updateQuantity: useCallback((ingredient, quantity) => {
      setIngredients(state => state.map(i => i === ingredient ? {...i, quantity} : i));
    }, []),
    deleteIngredient: useCallback((ingredient) => {
      setIngredients(state => state.filter(i => i !== ingredient));
    }, []),
    resetIngredients: useCallback(() => {
      setIngredients([])
    }, [])
  };
};

RecipeForm.propTypes = {
  ingredients: PropTypes.array,
  onSubmit: PropTypes.func,
  recipe: PropTypes.object,
  button: PropTypes.string,
};
