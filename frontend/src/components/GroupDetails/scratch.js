const dateTimeFix = str => {
  const stringArr = str.split('T')
  const date = stringArr[0]
  let time = stringArr[1]
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

const futureDate = new Date('2023-05-01T22:00:00.000Z')
const currentDate = new Date()
// console.log('date', date)
// console.log('currentDate', currentDate)
// console.log(date.getTime())
// console.log(currentDate.getTime())

// console.log(dateTimeFix(date))



const cityStateSplit = (str) => {
  const stringArr = str.split(',')
  // console.log('stringArr', stringArr)
  if (stringArr.length) {
    const city = stringArr[0]
    const state = (stringArr[1].trim())
    return [city, state]
  }
}

console.log(cityStateSplit('Omaha, NE'))
