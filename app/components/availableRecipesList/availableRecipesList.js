import React, {Component, PropTypes} from 'react';

export default class AvailableRecipesList extends Component {
  static propTypes = {
    availableRecipes: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
        {this.props.availableRecipes.map(({name, partsLeft, partsHave}) => (
          <div key={name}>
            <span>{`${partsLeft.length} parts left for "${name}": ${partsLeft.join(' + ')}. `}</span>
            <span>{`you already have: ${partsHave.join(' + ')}`}</span>
          </div>
        ))}
      </div>
    );
  }
}