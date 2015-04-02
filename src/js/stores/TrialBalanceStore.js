var AppDispatcher = require('../dispatcher/AppDispatcher');
var assign = require('react/lib/Object.assign');
var TrialBalanceConstants = require('../constants/TrialBalanceConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var _trialBalance = [{"appId": "", "name": "", "type": "", "balance": ""}];

function loadTrialBalance(data) {
    // Perform any data massaging here
    _trialBalance = [];

    // Group Rows with the same Type
    var types = _.uniq(_.map(_.pluck(data.lines, "type"), function(type) {
        return type.substring(0, type.indexOf(":"));
    }));

    _.each(types, function(type) {
        var item = {
            appId: type,
            name: "",
            type: "",
            balance: "",
            children: []
        };

        _.each(_.filter(data.lines, function(line) {
            return line.type.substring(0, line.type.indexOf(":")) === type;
        }), function(child) {
            item.children.push(child);
        });

        _trialBalance.push(item);
    });

}

var TrialBalanceStore = assign(EventEmitter.prototype, {

    getTrialBalance: function () {
        return _trialBalance;
    },

    emitChange: function () {
        this.emit('change');
    },

    addChangeListener: function (callback) {
        this.on('change', callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }

});

AppDispatcher.register(function (dispatch) {
    var action = dispatch.action;

    switch (action.actionType) {
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