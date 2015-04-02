var TrialBalanceActions = require('../actions/TrialBalanceActions'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    TrialBalanceConstants = require('../constants/TrialBalanceConstants'),
//Breeze = require('breeze-client'),
    $ = require('jquery');

function queryTrialBalance() {
    //var manager = new Breeze.EntityManager('data/trial-balance.json');
    //var query = new Breeze.EntityQuery().from("TrialBalanceLines");
    //
    //manager.executeQuery(query).then(function(data) {
    //  TrialBalanceActions.loadedTrialBalance(data);
    //}).fail(function(e) {
    //  alert(e);
    //});

    $.get('https://b2t-qal.ems.intuit.com/b2t/v1/firms/c1fb10b7-2e59-4598-a0ec-881c4fb4969e/clients/b8a0301b-da70-4dd4-acaf-b99bd6ca3adf/scenarios/a4aed1b3-388f-48f8-90e1-df2dfb73f108/trial-balance', function (data) {
        TrialBalanceActions.loadedTrialBalance(data);
    });

}

AppDispatcher.register(function (dispatch) {
    var action = dispatch.action;

    switch (action.actionType) {
        case TrialBalanceConstants.LOAD_TRIAL_BALANCE:
            queryTrialBalance();
            break;
        default:
            return true;
    }

    return true;
});
