const deepCopyFunction = (inObject: any) => {
  let value;
  let key;

  if (typeof inObject !== 'object' || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  const outObject = Array.isArray(inObject) ? [] : {};

  // eslint-disable-next-line no-restricted-syntax,guard-for-in
  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    // @ts-ignore
    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};

export default deepCopyFunction;
