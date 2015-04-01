
var AppDispatcher = require('../dispatcher/AppDispatcher'),
  TrialBalanceConstants = require('../constants/TrialBalanceConstants');

module.exports = {

  loadTrialBalance: function(data) {
    AppDispatcher.handleViewAction({
      actionType: TrialBalanceConstants.LOAD_TRIAL_BALANCE,
      data: data
    });
  },
  loadedTrialBalance: function(data) {
    AppDispatcher.handleServiceAction({
      actionType: TrialBalanceConstants.LOADED_TRIAL_BALANCE,
      data: data
    });
  }

};