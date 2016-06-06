export const compareRecipes = (a, b) => a.partsLeft.length > b.partsLeft.length
  ? 1
  : (a.partsLeft.length === b.partsLeft.length ? 0 : -1);

export function parseInitialRecipeStrings(stringsArray) {
  return stringsArray.map(recipe => {
    const idParts = recipe.split(' = ');
    const parts = idParts[0];
    const name = idParts[1];
    return {parts: parts.split('+').map(t => t.trim()), name};
  });
}