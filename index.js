function promiseQueue(items, factory, {
  interval = 0
} = {}) {
  let lastIndex = items.length - 1
  let results = []

  return items.reduce((queue, item, index) => {
    return queue.then(() => {
      if (typeof factory === 'function') {
        return factory(item)
      }
      
      return item
    }).then(result => {
      results.push(result)
      
      if ((interval > 0) && (index !== lastIndex)) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(result)
          }, interval)
        })
      }

      return result
    })
  }, Promise.resolve()).then(() => results)
}

module.exports = promiseQueue
