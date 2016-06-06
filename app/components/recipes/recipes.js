import React, {Component, PropTypes} from 'react';

import {intersect, diff, withoutIdx} from 'utils/array';
import {parseInitialRecipeStrings, compareRecipes} from 'utils/recipe';
import {AddPartForm, AvailableRecipesList, AvailablePartBadge} from 'components';

export default class Recipes extends Component {
  static propTypes = {
    initialRecipeList: PropTypes.array.isRequired
  };

  state = {
    availableParts: [],
    recipes: parseInitialRecipeStrings(this.props.initialRecipeList)
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
      <div>

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
    )
  }
}
