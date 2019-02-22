import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import 'antd/dist/antd.css'

import { observable, computed, action, set } from 'mobx'
import { observer } from 'mobx-react'

import cloneDeep from 'lodash/cloneDeep'

import { 
  Tree,
  Collapse,
  Modal,
  Input,
  message,
} from 'antd';

const Panel = Collapse.Panel;
const { TreeNode } = Tree;
const confirm = Modal.confirm

import {generateData} from './util'

let CATEGORY = [
  {
    key: '0',
    title: '0',
    // hover: false,
    children: [
      {
        // hover: false,
        key: '0-0',
        title: '0-0'
      },
      {
        // hover: false,
        key: '0-1',
        title: '0-1',
        children: [
          {
            // hover: false,
            key: '0-1-0',
            title: '0-1-0',
          },
          {
            // hover: false,
            key: '0-1-1',
            title: '0-1-1'
          }
        ]
      }
    ]
  },
  {
    title: '1',
    key: '1'
  },
]

const CATEGORY_MODAL_ACTION = {
  addCategory: 1,
  addSubCategory: 2,
  modify: 3
}

const deepFind = (key, data = [], cb) => {

  for (let i = 0; i < data.length; i++) {

    let obj = data[i]

    if (obj.key == key) {
      
      cb(obj, i, data)
      // return true
    }

    if (obj.children && obj.children.length) {
      
      let bool = deepFind(key, obj.children, cb)
      // if (bool) return true
    }
  }

}

class Store {

  @observable state = {
    category: CATEGORY
  }

  @observable modal = {
    show: false,
    info: {},
    type: '',   // add/modify
    title: '',
    categoryName: '',
  }

  @action.bound
  onAddCategory (info) {
    let _category = this.state.category

    this.state.category = [..._category, {
      key: this.modal.categoryName,
      title: this.modal.categoryName,
    }]
  }


  @action.bound
  onAddSubCategory () {
    // let key = info.node.props.title
    let key = this.modal.info.title

    deepFind(key, this.state.category, obj => {
      (obj.children = obj.children || []).push({
        key: this.modal.categoryName,
        title: this.modal.categoryName
      })
    })
    this.state.category = [...this.state.category]

  }

  @action.bound
  onModifyCategory () {
    let key = this.modal.info.title

    deepFind(key, this.state.category, obj => {
      obj.title = this.modal.categoryName
      obj.key = obj.title
    })
    this.state.category = [...this.state.category]
  }

  @action.bound
  onRemoveCategory (info) {
    const self = this
    let key = info.node.props.title
    let isSubCategory = !info.node.getNodeChildren().length

    let title = isSubCategory ? '删除二级分类' : '删除一级分类'
    let content = isSubCategory
      ? `删除二级分类，其对应的文章会同时删除，请问是否确认删除该分类？`
      : `删除一级分类，其对应的二级分类及文章会同时删除，请问是否确认删除该分类？`

      confirm({
        title,
        content,
        onOk () {
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          // }).catch(() => console.log('Oops errors!'));
          console.log('before_remove', key, self.state.category)
          deepFind(key, self.state.category, (obj, i, arr) => {
            console.log('remove', obj, i, arr)
            arr.splice(i, 1)
            self.state.category = [...self.state.category]
          })
        },
        onCancel() {},
      })


  }

  @action.bound
  openCategoryModal (type, info) {

    const isAdd = type === CATEGORY_MODAL_ACTION.addCategory || type === CATEGORY_MODAL_ACTION.addSubCategory

    this.modal.type = type
    this.modal.show = true
    this.modal.title = isAdd ? '新增' : '编辑'
    
    if (type === CATEGORY_MODAL_ACTION.addCategory) {
      this.modal.categoryName = ''
      return
    }
    
    let data = info.node.props
    
    this.modal.categoryName = type === isAdd ? '' : data.title
    set(this.modal, { info: data })
  }

  @action.bound
  confirmCategoryModal () {
    console.log('confirm', this.modal)

    const _type = this.modal.type

    if (_type === CATEGORY_MODAL_ACTION.addSubCategory) {

      this.onAddSubCategory()
    } else if (_type === CATEGORY_MODAL_ACTION.addCategory) {

      this.onAddCategory()
    } else if (_type === CATEGORY_MODAL_ACTION.modify) {

      this.onModifyCategory()
    }

    this.closeCategoryModal()
  }

  @action.bound
  closeCategoryModal () {
    this.modal.show = false
  }

  @action.bound
  onChange (field, val) {
    this.modal[field] = val
  }

  @action.bound
  updateCategory (data) {
    // console.log('update', data)
    this.state.category = [...(data || this.state.category)]
  }
}

const store = new Store

@observer
export default class Category extends Component {

  render() {

    const {
      category
    } = store.state

    const {
      modal,

      onAddCategory,
      onAddSubCategory,
      onModifyCategory,
      onRemoveCategory,
      openCategoryModal,
    } = store

    let header = (
      <div className="cl">

        <a href="javascript:" 
          className="fr"
          onClick={openCategoryModal.bind(null, CATEGORY_MODAL_ACTION.addCategory)}
        >新增一级分类</a>

        <div>分类管理</div>
      </div>
    )

    const TreeNodeDom = props => {
      return (
        <div>
          <div>{props.title}

            {
              props.show &&
              <span className="ml10">hover才显示</span>
            }

          </div>
        </div>
      )
    }

    const loop = data => data.map((item, idx) => {
      if (item && item.children && item.children.length) {

        return (
          <TreeNode 
            title={item.title}
            // title={<TreeNodeDom show={item.hover} title={item.title} />}
            key={item.key || item.title}>
            {loop(item.children)}
          </TreeNode>
        )
      }

      return (
        <TreeNode
          title={item.title}
          // title={<TreeNodeDom show={item.hover} title={item.title} />}
          key={item.key || item.title}>
          <div>hh</div>
        </TreeNode>
      )
    })

    return (

      <React.Fragment>

        <Collapse activeKey="1" style={{width: 300}}>
          <Panel key="1"
            showArrow={false}
            header={header}>
            <div>
              <Tree
                showLine
                onDrop={this.onDrop}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                className="draggable-tree"  
                draggable

              >
                {loop(category)}
              </Tree>
            </div>
          </Panel>
        </Collapse>
      
        <Modal
          title={modal.title}
          visible={modal.show}
          onOk={store.confirmCategoryModal.bind(null)}
          onCancel={() => store.modal.show = false}
        >
          <Input value={modal.categoryName} onChange={e => store.onChange('categoryName', e.target.value)} />
        </Modal>
      </React.Fragment>
    )
  }

  componentDidMount () {
    window.store = store
    this.getContainer()
  }

  getContainer () {
    if(!this.container) {
      this.container = document.createElement('div')
      document.body.appendChild(this.container)
    }

    return this.container
  }

  renderToolbar (info) {
    let dom = ReactDOM.findDOMNode(info.node)

    if (this.toolbar) {
      // ReactDOM.unmountComponentAtNode(this.container)
      this.toolbar = null
    }

    let hasChildren = info.node.getNodeChildren().length

    this.toolbar = (
      <div className="ml10">
        {
          !!hasChildren &&
          <a href="javascript:" className="ml5" onClick={store.openCategoryModal.bind(null, CATEGORY_MODAL_ACTION.addSubCategory, info)}>加</a>
          
        }
        <a href="javascript:" className="ml5" onClick={store.openCategoryModal.bind(this, CATEGORY_MODAL_ACTION.modify, info)}>改</a>
        <a href="javascript:" className="ml5" onClick={store.onRemoveCategory.bind(null, info)}>丢</a>
      </div>
    )


    // 取前两个dom元素
    let arr = Array.prototype.map.call(dom.children, (node, idx) => idx < 2 ? node.offsetWidth : 0)

    let childrenWidth = arr.reduce((a, b) => a + b) + 10

    const container = this.getContainer()
    Object.assign(this.container.style, {
      position: 'absolute',
      left: `${dom.offsetLeft + childrenWidth}px`,
      top: `${dom.offsetTop + 7}px`,
      // left: `${info.event.pageX}px`,
      // top: `${info.event.pageY}px`,
    })

    ReactDOM.render(this.toolbar, container)
  }

  // deepFind (flag, value, data = store.state.category) {
  //   for (let i = 0; i < data.length; i++) {

  //     if (data[i].title == flag) {
  //       data[i].hover = value
  //       console.log('deepfind', data[i].title)
  //       // return true
  //     } else {
  //       data[i].hover = value && !value
  //     }

  //     if (data[i].children && data[i].children.length) {
        
  //       let bool = this.deepFind(flag, value, data[i].children)
  //       // if (bool) return true
  //     }
  //   }
  // }

  onDrop = info => {
    console.log('onDrop', info)
    
    const dropKey = info.node.props.title;
    const dragKey = info.dragNode.props.title;
    // const dropKey = info.node.props.eventKey;
    // const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };
    // const data = [...store.state.category.slice()];
    const data = [...store.state.category];
    // const data = cloneDeep(store.state.category.slice())
    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    console.log('减去', data)

    if (!info.dropToGap) {
      // Drop on the content

      // TODO: 只能添加到一级目录下
      if (dropPos.length > 2) {
        message.error('不能移动到二级目录之下！')
        return
      }

      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&  // Has children
      info.node.props.expanded &&                     // Is expanded
      dropPosition === 1                              // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.unshift(dragObj);
        // let _children = item.children.slice()
        // _children.unshift(dragObj);
      });
    } else {
      // Drop on the gap
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    store.updateCategory(data)
  }

  onMouseEnter = (info) => {
    // console.log('onMouseEnter', info.node.props)
    // this.deepFind(e.node.props.title.props.title, true)
    // store.updateCategory()
    let dom = ReactDOM.findDOMNode(info.node)
    // console.log( dom )
    this.renderToolbar(info)
  }

  onMouseLeave = (info) => {
    // console.log('omMouseLeave', info)
    // this.deepFind(info.node.props.title.props.title, false)
    // store.updateCategory()

    // this.removeContainer()
  }

  componentWillUnmount () {
    this.removeContainer()
  }

  removeContainer () {
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container)
      document.body.removeChild(this.container)
      this.container = null
    }
  }

}