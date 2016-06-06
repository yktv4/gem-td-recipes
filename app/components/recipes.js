import React, {Component, PropTypes} from 'react'
import {intersect, diff, withoutIdx} from './../utils/array';
import {parseInitialRecipeStrings, compareRecipes} from './../utils/recipe';

export default class Recipes extends Component {
  static propTypes = {
    initialRecipeList: PropTypes.array.isRequired
  };

  state = {
    availableParts: [],
    availablePartsInputValue: '',
    recipes: parseInitialRecipeStrings(this.props.initialRecipeList)
  };

  addAvailablePart() {
    const {availablePartsInputValue, availableParts} = this.state;
    availableParts.push(availablePartsInputValue);
    this.setState({availableParts});

  }

  removeAvailablePart(index) {
    this.setState({availableParts: withoutIdx(this.state.availableParts, index)});
  }

  renderClosestRecipes() {
    const {availableParts} = this.state;

    return this.state.recipes
      .map(recipe => Object.assign(recipe, {
        partsHave: intersect(recipe.parts, availableParts),
        partsLeft: diff(recipe.parts, availableParts)
      }))
      .sort(compareRecipes)
      .map(({name, partsLeft, partsHave}) => (
        <div key={name}>
          <span>{`${partsLeft.length} parts left for "${name}": ${partsLeft.join(' + ')}. `}</span>
          <span>{`you already have: ${partsHave.join(' + ')}`}</span>
        </div>
      ));
  }

  render() {
    const {availablePartsInputValue} = this.state;

    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="tower id"
            value={availablePartsInputValue}
            onChange={e => this.setState({availablePartsInputValue: e.target.value})}
          />
          <button onClick={::this.addAvailablePart}>add</button>
        </div>

        <div>
          <h4>You're now having the following parts:</h4>
          <div>
            {this.state.availableParts.map(
              (part, idx) => <span key={part + idx}>
                {part} <a href="javascript:void(0)" onClick={e => this.removeAvailablePart(idx)}>[X]</a>
              </span>
            )}
          </div>
        </div>

        <div>
          <h4>Here's what you have:</h4>
          {this.renderClosestRecipes()}
        </div>
      </div>
    )
  }
}
