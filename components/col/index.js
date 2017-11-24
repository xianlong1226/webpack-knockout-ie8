const {
  parseProps
} = require('../utils/ko-component-utils')

const props = {
  span: {
    type: Number,
    'default': 24,
  },
  gutter: Number,
  offset: Number,
  pull: Number,
  push: Number
}
/**
 * 列布局
 */
const ViewModel = function (params) {
  let self = this;
  parseProps(props, params, self)

  self.classObj = () => {
    const ret = {};
    let arr = ['span', 'offset', 'pull', 'push']
    for (let i = 0; i < arr.length; i++){
      let prop = arr[i]
      if (self[prop]) {
        prop === 'span' && (ret[`k-col-${self[prop]}`] = true)
        prop !== 'span' && (ret[`k-col-${prop}-${self[prop]}`] = true)
      }
    }
    return ret
  }

  self.styleObj = (gutter = 0) => {
    gutter = gutter || self.gutter || 0
    const paddingLeft = gutter / 2 + 'px'
    const styleObj = {
      paddingLeft: paddingLeft,
      paddingRight: paddingLeft
    }
    return styleObj
  }
}

ko.components.register('k-col', {
  viewModel: {
    createViewModel: function(params, componentInfo) {
      return new ViewModel(params, componentInfo)
    }
  },
  template: require('./template.html')
});