const {
  parseProps
} = require('../utils/ko-component-utils')

const props = {
  gutter: {
    type: Number,
    observable: true
  }, // 栅格间隔   default: 0
}

/**
 * 行布局
 */
const ViewModel = function (params) {
  let self = this;
  parseProps(props, params, self)
  // computed
  self.style = () => {
    const ret = {}
    if (self.gutter()) {
      ret.marginLeft = `-${self.gutter() / 2}px`
      ret.marginRight = ret.marginLeft
    }
    return ret
  }
}

ko.components.register('k-row', {
  viewModel: {
    createViewModel: function (params, componentInfo) {
      return new ViewModel(params, componentInfo)
    }
  },
  template: require('./template.html')
});