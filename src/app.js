// // import './foo.js'

// // console.log('app')

// import { observable, action, autorun, trace } from 'mobx'

// let TREE = [
//   {
//     key: '0',
//     // title: '0',
//     // hover: false,
//     children: [
//       {
//         // hover: false,
//         key: '0-0',
//         // title: '0-0'
//       },
//       {
//         // hover: false,
//         key: '0-1',
//         // title: '0-1',
//         children: [
//           {
//             // hover: false,
//             key: '0-1-0',
//             // title: '0-1-0',
//           },
//           {
//             // hover: false,
//             key: '0-1-1',
//             // title: '0-1-1'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     // title: '1',
//     key: '1'
//   },
// ]

// class Store {
//   @observable arr = TREE
//   // @observable arr = [
//   //   {
//   //     key: 1
//   //   },
//   //   {
//   //     key: 2
//   //   }
//   // ]
// }

// const store = new Store
// autorun((r) => {
//   r.trace()
//   console.log(JSON.stringify(store.arr))
// })

// store.arr.splice(1, 1)
// store.arr.push({ key: 3 })
// store.arr.splice(1, 1)
// store.arr.push({ key: 3 })
// store.arr.splice(1, 1)
// store.arr.push({ key: 3 })
// store.arr.splice(1, 1)
// store.arr.push({ key: 3 })