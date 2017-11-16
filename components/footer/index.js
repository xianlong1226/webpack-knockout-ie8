require('./style.scss');

function createViewModel(params) {
  var viewModel = ko.mapping.fromJS(require('./data.json'));

  return viewModel;
}

ko.components.register('global-footer', {
  viewModel: {
    createViewModel: createViewModel
  },
  template: require('./template.html')
});