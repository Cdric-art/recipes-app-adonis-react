import {useCallback, useReducer} from 'react';
import {apiFetch} from '../components/Utils/api';

function reducer(state, action) {
  console.log('RECIPES REDUCER : ', action.type, action);
  switch (action.type) {
  case 'FETCHING_RECIPES':
    return {...state, loading: true};
  case 'FETCHING_RECIPE':
    return {...state, recipeId: action.payload.id};
  case 'SET_RECIPES':
    return {...state, loading: false, recipes: action.payload};
  case 'SET_RECIPE':
    return {
      ...state,
      recipes: state.recipes.map(r => r.id === action.payload.id ? action.payload : r),
    };
  case 'ADD_RECIPE':
    return {...state, recipes: [action.payload, ...state.recipes]}
  case 'DESELECT_RECIPE':
    return {...state, recipeId: null};
  default:
    throw new Error(`Action inconnue ${action.type}`);
  }
}

export function useRecipes() {

  const [state, dispatch] = useReducer(reducer, {
    recipes: null,
    loading: false,
    recipeId: null,
  });

  const recipe = state.recipes ? state.recipes.find(r => r.id === state.recipeId) : null;

  return {
    recipes: state.recipes,
    recipe: recipe,
    fetchRecipes: async () => {
      if (state.loading || state.recipes !== null) {
        return null;
      }
      dispatch({type: 'FETCHING_RECIPES'});
      const recipes = await apiFetch('/recipes');
      dispatch({type: 'SET_RECIPES', payload: recipes});
    },
    fetchRecipe: useCallback(async (recipe) => {
      dispatch({type: 'FETCHING_RECIPE', payload: recipe});
      if (!recipe.ingredients) {
        recipe = await apiFetch(`/recipes/${recipe.id}`);
        dispatch({type: 'SET_RECIPE', payload: recipe});
      }
    }, []),
    createRecipe: useCallback(async (data) => {
      const recipe = await apiFetch('/recipes', {
        method: 'POST',
        body: data
      })
      dispatch({type: 'ADD_RECIPE', payload: recipe})
    }, []),
    deselectRecipe: async () => {
      dispatch({type: 'DESELECT_RECIPE'});
    },
  };

}
