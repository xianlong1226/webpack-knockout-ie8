require('./style.scss')

function createViewModel (params) {
    var viewModel = ko.mapping.fromJS(require('./data.json'));
    ko.mapping.fromJS({
        data: params.data
    },viewModel);

    return viewModel;
}

ko.components.register('self_components_example', {
  viewModel: {
    createViewModel: createViewModel
  },
  template: require('./template.html')
});