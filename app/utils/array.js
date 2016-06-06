export const withoutIdx = (arr, idx) => arr.slice(0, idx).concat(arr.slice(idx + 1, arr.length));

export function withoutVal(arr, val) {
  const valIdx = arr.indexOf(val);
  return ~valIdx ? withoutIdx(arr, valIdx) : arr;
}

export function diff(a, b) {
  b = b.slice(0); //copy array to prevent its modifications
  return a.reduce(
    (carry, item) => {
      const foundIdx = b.indexOf(item);
      if (~foundIdx) {
        b = withoutVal(b, item);
        return withoutVal(carry, item);
      } else {
        return carry;
      }
    },
    a
  )
}

export function intersect(a, b) {
  b = b.slice(0); //copy array to prevent its modifications
  return a.reduce(
    (carry, item) => {
      const foundIdx = b.indexOf(item);
      if (~foundIdx) {
        b = withoutVal(b, item);
        carry.push(item);
      }
      return carry;
    },
    []
  )
}
