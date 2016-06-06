import React, {Component, PropTypes} from 'react';

import {intersect, diff, withoutIdx} from 'utils/array';
import {parseInitialRecipeStrings, compareRecipes} from 'utils/recipe';
import {AddPartForm, AvailableRecipesList, AvailablePartBadge} from 'components';
import initialRecipeList from 'recipeLists/initial';
import styles from './styles.scss';

export default class App extends Component {
  state = {
    availableParts: [],
    recipes: parseInitialRecipeStrings(initialRecipeList)
  };

  calculateAvailableRecipes() {
    const mapLowerCase = string => string.toLowerCase();
    const availableParts = this.state.availableParts.map(mapLowerCase);

    return this.state.recipes
      .map(recipe => ({
        ...recipe,
        partsHave: intersect(recipe.parts.map(mapLowerCase), availableParts),
        partsLeft: diff(recipe.parts.map(mapLowerCase), availableParts)
      }))
      .map(recipe => ({
        ...recipe,
        percentDone: Math.floor(recipe.partsHave.length / recipe.parts.length * 100)
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
    const {availableParts} = this.state;

    return (
      <div className="m-t-1">
        <div className="card">
          <div className="card-block">
            <div className="clearfix">
              <div className="col-lg-4 col-lg-push-4">
                <AddPartForm onAdd={::this.onAddAvailablePart}/>
              </div>
            </div>

            <div>
              {availableParts.map(::this.renderAvailablePartBadge)}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-block">
            <AvailableRecipesList availableRecipes={::this.calculateAvailableRecipes()}/>
          </div>
        </div>

        <footer className={styles.footer}>
          &copy; <a href="http://yakutovi.ch">yakutovi.ch</a> | <a href="https://github.com/yktv4/gem-td-recipes" target="_blank">Fork me on Github</a>
        </footer>
      </div>
    )
  }
}
