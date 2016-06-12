import React, {Component, PropTypes} from 'react';
import {joinComponents} from 'utils/react';
import styles from './styles.scss';

const Part = ({name, onClick, title}) => <a href="javascript:void(0)" className={styles.partLeft} {...{onClick, title}}>
  {name}
</a>;

export default class AvailableRecipesList extends Component {
  static propTypes = {
    availableRecipes: PropTypes.array.isRequired,
    onAddPart: PropTypes.func.isRequired,
    onRemovePart: PropTypes.func.isRequired
  };

  renderPartLeft(name) {
    return <Part
      name={name}
      onClick={e => this.props.onAddPart(name)}
      title="Click here to mark this part as available"
    />;
  }

  renderPartHave(name) {
    return <Part
      name={name}
      onClick={e => this.props.onRemovePart(name)}
      title="Click here to delete this part from available parts"
    />;
  }

  renderSingleRow({name, partsLeft, partsHave, percentDone}) {
    return (
      <tr key={name}>
        <td>{name}</td>
        <td>{percentDone}%</td>
        <td>{joinComponents(partsLeft.map(::this.renderPartLeft), ' + ')}</td>
        <td>{joinComponents(partsHave.map(::this.renderPartHave), ' + ')}</td>
      </tr>
    )
  }

  render() {
    return (
      <table className={`table table-sm ${styles.table}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Progress</th>
            <th>Left</th>
            <th>Have</th>
          </tr>
        </thead>
        <tbody>
          {this.props.availableRecipes.map(::this.renderSingleRow)}
        </tbody>
      </table>
    );
  }
}