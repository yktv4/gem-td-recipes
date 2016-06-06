import React from 'react';

import {Recipes} from 'components';
import initialRecipeList from 'recipeLists/initial';

export default props => {
  return (
    <div className="container">
      <Recipes initialRecipeList={initialRecipeList}/>
    </div>
  )
}