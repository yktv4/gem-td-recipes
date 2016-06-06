import './css/style.css'

import React from 'react'
import ReactDOM from 'react-dom'
import Recipes from './components/Recipes'
import initialRecipeList from './recipeLists/initial';

ReactDOM.render(<Recipes initialRecipeList={initialRecipeList} />, document.getElementById('root'));
