const data = require('./data.json')

/**
 * Mock GET method. Returns data based on numeric key.
 * @param {number} id   ID corresponding to key in the `data` object defined above. For mocking purposes, should be 1, 2, or 3.
 */
const get = id => new Promise((resolve, reject) => {
  const result = data[id]
  if(result) {
    setTimeout(() => resolve(result), 250)
  } else {
    setTimeout(reject, 250)
  }
})

/**
 * Mock POST method. Returns whatever is passed after a delay of 250ms. For mocking purposes, has a 20% chance of throwing an error.
 * @param {any} data 
 */
const post = data => new Promise((resolve, reject) => {
  if(Math.random() < .2) {
    setTimeout(() => reject({
      data,
      success:false,
      payload:'Whoops – API error.'
    }), 250)
  } else {
    setTimeout(() => resolve({
      data,
      success:true,
      payload:'Successful upload'
    }), 250)
  }
})

export default ({
  get,
  post,
})
