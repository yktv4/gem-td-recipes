import React from 'react';

export const joinComponents = (components, glue) => components.map(
  (component, i, {length}) => <span key={i}>{component}{i + 1 < length ? glue : ''}</span>
);