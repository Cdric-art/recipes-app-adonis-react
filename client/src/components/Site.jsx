import React, {useEffect, useState} from 'react';
import Ingredients from './Ingredients/ingredients';
import {useIngredients} from '../hooks/ingredients';

function Navbar({currentPage, onClick}) {

  const navClass = (page) => {
    let className = 'nav-item';
    if (page === currentPage) {
      className = ' active';
    }
    return className;
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-5">
      <a href="#home" className="navbar-brand">Recettes</a>
      <ul className="navbar-nav mr-auto">
        <li className={navClass('recipes')}>
          <a href="#recipes" className="nav-link" onClick={() => onClick('recipes')}>Recettes</a>
        </li>
        <li className={navClass('ingredients')}>
          <a href="#ingredients" className="nav-link" onClick={() => onClick('ingredients')}>Ingredients</a>
        </li>
      </ul>
    </nav>
  );
};

const Site = () => {

  const [page, setPage] = useState('ingredients');
  const {
    ingredients,
    fetchIngredients,
    deleteIngredient,
    updateIngredient,
    createIngredient,
  } = useIngredients();

  let content = null;

  if (page === 'ingredients') {
    content = <Ingredients ingredients={ingredients} onDelete={deleteIngredient} onUpdate={updateIngredient} onCreate={createIngredient}/>;
  }

  useEffect(() => {
    if (page === 'ingredients') {
      fetchIngredients();
    }
  }, [page, fetchIngredients]);

  return (
    <>
      <Navbar currentPage={page} onClick={setPage}/>
      {content}
    </>
  );
};

export default Site;
