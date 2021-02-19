import {apiFetch} from '../components/Utils/api';
import {useCallback, useReducer} from 'react';

function reducer(state, action) {
  console.log('INGREDIENTS REDUCER : ', action.type, action);
  switch (action.type) {
  case 'FETCHING_INGREDIENTS':
    return {...state, loading: true};
  case 'SET_INGREDIENTS':
    return {...state, ingredients: action.payload, loading: false};
  case 'ADD_INGREDIENTS':
    return {...state, ingredients: [action.payload, ...state.ingredients]};
  case 'UPDATE_INGREDIENTS':
    return {...state, ingredients: state.ingredients.map(i => i === action.payload ? action.payload : i)};
  case 'DELETE_INGREDIENTS':
    return {...state, ingredients: state.ingredients.filter(i => i !== action.payload)};
  default:
    throw new Error(`Action inconnue ${action.type}`);
  }
}

export function useIngredients() {
  const [state, dispatch] = useReducer(reducer, {
    ingredients: null,
    loading: false,
  });

  return {
    ingredients: state.ingredients,
    fetchIngredients: useCallback(async () => {
      if (state.loading || state.ingredients) {
        return null;
      }
      dispatch({type: 'FETCHING_INGREDIENTS'});
      const ingredients = await apiFetch('/ingredients');
      dispatch({type: 'SET_INGREDIENTS', payload: ingredients});
    }, [state]),
    deleteIngredient: useCallback(async (ingredient) => {
      await apiFetch(`/ingredients/${ingredient.id}`, {
        method: 'DELETE',
      });
      dispatch({type: 'DELETE_INGREDIENTS', payload: ingredient});
    }, []),
    updateIngredient: useCallback(async (ingredient, data) => {
      const newIngredient = await apiFetch(`/ingredients/${ingredient.id}`, {
        method: 'PUT',
        body: data,
      });
      dispatch({type: 'UPDATE_INGREDIENTS', payload: newIngredient, target: ingredient});
    }, []),
    createIngredient: useCallback(async (data) => {
      const newIngredient = await apiFetch('/ingredients', {
        method: 'POST',
        body: data,
      });
      dispatch({type: 'ADD_INGREDIENTS', payload: newIngredient});
    }, [])
  };
}
