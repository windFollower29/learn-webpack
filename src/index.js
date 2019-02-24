import { observable, action, autorun, computed, trace } from 'mobx'


// console.log('index')

let TREE = [
  {
    key: '0',
    // title: '0',
    // hover: false,
    children: [
      {
        // hover: false,
        key: '0-0',
        // title: '0-0'
      },
      {
        // hover: false,
        key: '0-1',
        // title: '0-1',
        children: [
          {
            // hover: false,
            key: '0-1-0',
            // title: '0-1-0',
          },
          {
            // hover: false,
            key: '0-1-1',
            // title: '0-1-1'
          }
        ]
      }
    ]
  },
  {
    // title: '1',
    key: '1'
  },
]


let drag,
    dragKey = '1', 
    dropKey = '0';

class Store {
  @observable demo = TREE

  @action
  emit (clone) {
    console.log('---')
    this.demo = [...clone]
  }

  @action
  findDrag () {
    loop(this.demo, dragKey, (item, idx, arr) => {
      arr.splice(idx, 1)
      console.log('减')
      drag = item
    })
  }
}

let store;
window.store = store = new Store

autorun((r) => {
  r.trace()
  console.log('auto:', JSON.stringify(store.demo))
})

var loop = (data, key, cb) => {

  data.forEach((item, idx, arr) => {

    if (item.key === key) {
      cb(item, idx, arr)
      // return
    }

    if (item.children) {
      loop(item.children, key, cb)
    }
  })
}

let clone = [...store.demo]


function task() {

  // 放到0的孩子中
  loop(store.demo, dragKey, (item, idx, arr) => {
    arr.splice(idx, 1)
    // console.log('减')
    drag = item
  })
  
  // let drag = store.demo.splice(1, 1)
  loop(clone, dropKey, (item, idx, arr) => {
    // console.log('+')
    item.children.unshift(drag)
  })
  
  // 放到0的兄弟中
  loop(clone, dragKey, (item, idx, arr) => {
    // console.log(item, idx, arr)
    arr.splice(idx, 1)
    drag = item
  })
  
  loop(clone, dropKey, (item, idx, arr) => {
    // console.log('顶层：')
    clone.unshift(drag)
  })

  // store.emit(clone)
  store.demo = [...clone]
}

task()


