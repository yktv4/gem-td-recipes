export const compareRecipes = (a, b) => a.partsLeft.length > b.partsLeft.length
  ? 1
  : (a.partsLeft.length === b.partsLeft.length ? 0 : -1);

export function parseSteamCommunityRecipes(stringsArray) {
  return stringsArray.map(recipe => {
    const [parts, name] = recipe.split(' = ');
    return {parts: parts.split('+').map(t => t.trim()), name};
  });
}

export function parseRedditGemTdThreadRecipes(objectFromGameFiles) {
  const result = [];
  for (let name in objectFromGameFiles) {
    result.push({parts: objectFromGameFiles[name], name});
  }
  return result;
}