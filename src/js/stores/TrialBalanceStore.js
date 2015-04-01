var AppDispatcher = require('../dispatcher/AppDispatcher');
var TrialBalanceConstants = require('../constants/TrialBalanceConstants');
var EventEmitter = require('events').EventEmitter;

var _trialBalance = [{"appId":"","name":"","type":"","balance":""}];

function loadTrialBalance(data) {
  // Perform any data massaging here
  _trialBalance = data.lines;

}

var TrialBalanceStore = Object.assign(EventEmitter.prototype, {

  getTrialBalance: function() {
    return _trialBalance;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

AppDispatcher.register(function(dispatch) {
  var action = dispatch.action;

  switch(action.actionType) {
    case TrialBalanceConstants.LOADED_TRIAL_BALANCE:
      loadTrialBalance(action.data);
      break;
    default:
      return true;
  }

  TrialBalanceStore.emitChange();

  return true;
});

module.exports = TrialBalanceStore;