import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Recipes from './Recipes';
import initialRecipeList from './../recipeLists/initial';

export default props => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Recipes initialRecipeList={initialRecipeList}/>
    </MuiThemeProvider>
  )
}