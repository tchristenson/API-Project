// const cityStateSplit = (str) => {
//   const stringArr = str.split(',')
//   const city = stringArr[0]
//   const state = (stringArr[1].trim())
//   return [city, state]
// }

// console.log(cityStateSplit('New York, NY'))
// console.log(cityStateSplit('New York, NY')[0])
// console.log(cityStateSplit('New York, NY')[1])

const dateTimeFix = str => {
  const stringArr = str.split('T')
  const date = stringArr[0]
  let time = stringArr[1]
  console.log(time)
  time = [time.split(':')[0], time.split(':')[1]]
  let hours = time[0]
  let minutes = time[1]

  if (hours > 12) {
    hours -= 12
    hours = hours.toString()
    time = hours.concat(':').concat(minutes).concat('pm')
  }
  else if (hours === 12) {
    hours = hours.toString()
    time = hours.concat(':').concat(minutes).concat('pm')
  }
  else {
    hours = hours.toString()
    time = hours.concat(':').concat(minutes).concat('am')
  }
  return [date, time]
}

// console.log(dateTimeFix('2023-04-10T07:00:00.000Z'))
// console.log(dateTimeFix('2023-04-10T14:30:00.000Z'))
// console.log(dateTimeFix('2023-04-10T01:30:00.000Z'))
// console.log(dateTimeFix('2023-04-10T13:50:00.000Z'))
// console.log(dateTimeFix('2023-04-10T18:00:00.000Z'))
// console.log(dateTimeFix('2023-04-10T17:13:00.000Z'))

// typeof true !== bool
console.log(typeof false === 'boolean')
console.log(typeof true === 'boolean')
console.log(typeof 2 === 'boolean')
console.log(typeof 'sfesf' === 'boolean')
