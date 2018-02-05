# PromiseQueueous

> Runs JavaScript Promises in a queue

## Installation

```
npm install promisequeueous --save
```

## Usage

The module exports a function that takes 3 arguments:

1. `items`: An array of items that will generate Promises
1. `factory`: A factory function that:
    - Is called for each item, with its value as the only parameter
    - Returns a Promise
1. `options`: An optional options object, with one or more of these properties:
    - `interval`: Time (in milliseconds) to wait in between Promise executions

## Examples

- Run Promises sequentially, printing the result at the end

    ```js
    const promiseQ = require('promisequeueous')

    const factoryFn = value => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(value), 2000)
      })
    }

    promiseQ([1, 2, 3], factoryFn).then(console.log) // Returns: [1, 2, 3]
    ```

- Run Promises sequentially with an interval of 3 seconds between each

    ```js
    const promiseQ = require('promisequeueous')

    const factoryFn = value => {
      console.log('Promise: starting...')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('Promise: done after 2 seconds')

          resolve(value)
        }, 2000)
      })
    }

    promiseQ([1, 2, 3], factoryFn).then(console.log) // Returns: [1, 2, 3]

    /*
      00:00:00: Prints "Promise: starting..."
      00:00:02: Prints "Promise: done..."
      00:00:05: Prints "Promise: starting..."
      00:00:07: Prints "Promise: done..."
      00:00:10: Prints "Promise: starting..."
      00:00:12: Prints "Promise: done..."
    */
    ```
