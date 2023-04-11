const cityStateSplit = (str) => {
  const stringArr = str.split(',')
  const city = stringArr[0]
  const state = (stringArr[1].trim())
  return [city, state]
}

console.log(cityStateSplit('New York, NY'))
console.log(cityStateSplit('New York, NY')[0])
console.log(cityStateSplit('New York, NY')[1])
