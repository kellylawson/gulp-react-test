var React = require('react'),
    Griddle = require('griddle-react'),
    TrialBalanceStore = require('../stores/TrialBalanceStore'),
    TrialBalanceActions = require('../actions/TrialBalanceActions'),
    TrialBalanceService = require('../services/TrialBalanceService');

function getAppState() {
    return {
        trialBalance: TrialBalanceStore.getTrialBalance()
    };
}

var TrialBalanceView = React.createClass({

    getInitialState: function () {
        return getAppState();
    },

    componentWillMount: function () {
        TrialBalanceActions.loadTrialBalance({});
    },

    componentDidMount: function () {
        TrialBalanceStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        TrialBalanceStore.removeChangeListener(this._onChange);
    },

    render: function () {
        var columnMetadata = [
            {
                columnName: "appId",
                displayName: "Account No."
            },
            {
                columnName: "name",
                "displayName": "Account Name"
            },
            {
                columnName: "type",
                displayName: "Account Type"
            },
            {
                columnName: "balance",
                displayName: "Balance"
            }
        ];

        return (
            <div>
                <div className="tableHeader">Trial Balance</div>
                <Griddle results={this.state.trialBalance}
                         columnMetadata={columnMetadata}
                         showFilter={true}
                         showSettings={true}
                         useFixedHeader={true}
                         useGriddleStyles={true}
                    />
            </div>
        );

    },

    _onChange: function () {
        this.setState(getAppState());
    }

});
module.exports = TrialBalanceView;
