import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';
import Loader from '../Ui/Loader';
import Button from '../Ui/Button';
import {Trash, Upload} from '../Ui/Icons';
import {ApiErrors} from '../Utils/api';
import Field from '../Ui/Field';

const Ingredients = ({ingredients, onDelete, onUpdate, onCreate}) => {
  return (
    <div className="container">
      <h1>Ingredients</h1>
      <CreateIngredientForm onSubmit={onCreate}/>
      {ingredients === null ? <Loader/> :
        <IngredientsList ingredients={ingredients} onDelete={onDelete} onUpdate={onUpdate}/>}
    </div>
  );
};

export default Ingredients;

function IngredientsList({ingredients, onDelete, onUpdate}) {
  return (
    <div>
      {ingredients.map(ingredient => (
        <Ingredient key={ingredient.id} ingredient={ingredient} onDelete={onDelete} onUpdate={onUpdate}/>
      ))}
    </div>
  );
}

function CreateIngredientForm({onSubmit}) {

  const [loading, setLoading] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    try {
      await onSubmit(new FormData(e.target));
      setLoading(false);
      e.target.reset();
    } catch (e) {
      if (e instanceof ApiErrors) {
        setErrors(e.errors);
      } else {
        throw e;
      }
      setLoading(false);
    }
  };

  const errorFor = (field) => {
    const error = errors.find(e => e.field === field);
    if (error) {
      return error.message;
    }
    return null;
  };

  return <form onSubmit={handleSubmit} className="d-flex align-items-start">
    <Field placeholder="Nom de l'ingrédient" className="mr-2" error={errorFor('title')} name="title"/>
    <Field placeholder="Unité de mesure" className="mr-2" error={errorFor('unit')} name="unit"/>
    <Button type='submit' loading={loading}>Créer</Button>
  </form>;
}

const Ingredient = memo(({ingredient, onDelete, onUpdate}) => {

  const [loading, setLoading] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onDelete(ingredient);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);
    try {
      await onUpdate(ingredient, new FormData(e.target));
      setLoading(false);
    } catch (e) {
      if (e instanceof ApiErrors) {
        setErrors(e.errors);
      } else {
        throw e;
      }
      setLoading(false);
    }
  };

  const errorFor = (field) => {
    const error = errors.find(e => e.field === field);
    if (error) {
      return error.message;
    }
    return null;
  };

  return <form onSubmit={handleSubmit} className="d-flex align-items-start">
    <Field className="mr-2" defaultValue={ingredient.title} error={errorFor('title')} name="title"/>
    <Field className="mr-2" defaultValue={ingredient.unit} error={errorFor('unit')} name="unit"/>
    <Button type='submit' loading={loading}><Upload/></Button>
    <Button onClick={handleDelete} type='danger' loading={loading}><Trash/></Button>
  </form>;
});

Ingredients.propTypes = {
  ingredients: PropTypes.array,
};
IngredientsList.propTypes = {
  ingredients: PropTypes.array,
};

