import React, {Component, PropTypes} from 'react';

import {intersect, diff, withoutIdx} from 'utils/array';
import {parseInitialRecipeStrings, compareRecipes} from 'utils/recipe';
import {AddPartForm, AvailableRecipesList, AvailablePartBadge} from 'components';
import initialRecipeList from 'recipeLists/initial';

export default class App extends Component {
  state = {
    availableParts: [],
    recipes: parseInitialRecipeStrings(initialRecipeList)
  };

  calculateAvailableRecipes() {
    const {availableParts} = this.state;

    return this.state.recipes
      .map(recipe => Object.assign(recipe, {
        partsHave: intersect(recipe.parts, availableParts),
        partsLeft: diff(recipe.parts, availableParts)
      }))
      .sort(compareRecipes);
  }

  onAddAvailablePart(part) {
    this.setState({availableParts: this.state.availableParts.slice(0).concat([part])});
  }

  removeAvailablePart(index) {
    this.setState({availableParts: withoutIdx(this.state.availableParts, index)});
  }

  renderAvailablePartBadge(part, idx) {
    return <AvailablePartBadge key={idx} part={part} onRemove={() => this.removeAvailablePart(idx)}/>;
  }

  render() {
    return (
      <div className="card">
        <div className="card-block">
          <AddPartForm onAdd={::this.onAddAvailablePart} />

          <div>
            <h4>You're now having the following parts:</h4>
            <div>
              {this.state.availableParts.map(::this.renderAvailablePartBadge)}
            </div>
          </div>

          <div>
            <h4>Available recipes:</h4>
            <AvailableRecipesList availableRecipes={::this.calculateAvailableRecipes()}/>
          </div>
        </div>
      </div>
    )
  }
}
