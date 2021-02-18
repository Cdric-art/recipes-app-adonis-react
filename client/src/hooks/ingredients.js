import {apiFetch} from '../components/Utils/api';
import {useReducer} from 'react';

function reducer(state, action) {
  console.log('INGREDIENTS REDUCER : ', action.type, action)
  switch (action.type) {
  case 'FETCHING_INGREDIENTS':
    return {...state, loading: true}
  case 'SET_INGREDIENTS':
    return {...state, ingredients: action.payload, loading: false};
  case 'ADD_INGREDIENTS':
    return {...state, ingredients: [...state.ingredients, action.payload]}
  case 'UPDATE_INGREDIENTS':
    return {...state, ingredients: state.ingredients.map(i => i === action.payload ? action.payload : i)}
  case 'DELETE_INGREDIENTS':
    return {...state, ingredients: state.ingredients.filter(i => i !== action.payload)}
  default:
    return state
  }
}

export function useIngredients() {
  const [state, dispatch] = useReducer(reducer, {
    ingredients: null,
    loading: false,
  });

  return {
    ingredients: state.ingredients,
    fetchIngredients: async () => {
      if (state.loading || state.ingredients) return null
      dispatch({type: 'FETCHING_INGREDIENTS'})
      const ingredients = await apiFetch('/ingredients');
      dispatch({type: 'SET_INGREDIENTS', payload: ingredients});
    },
    deleteIngredient: async (ingredient) => {
      await apiFetch(`/ingredients/${ingredient.id}`, {
        method: 'DELETE',
      })
      dispatch({type: 'DELETE_INGREDIENTS', payload: ingredient})
    }
  };
}
