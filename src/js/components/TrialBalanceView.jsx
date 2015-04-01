var React = require('react'),
  Reactable = require('reactable'),
  TrialBalanceStore = require('../stores/TrialBalanceStore'),
  TrialBalanceActions = require('../actions/TrialBalanceActions'),
  TrialBalanceService = require('../services/TrialBalanceService');

function getAppState() {
  return {
    trialBalance: TrialBalanceStore.getTrialBalance()
  };
}

var Table = Reactable.Table;
var TrialBalanceView = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

  componentWillMount: function() {
    TrialBalanceActions.loadTrialBalance({});
  },

  componentDidMount: function() {
    TrialBalanceStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TrialBalanceStore.removeChangeListener(this._onChange);
  },

  render: function(){
    return (
      <div>
        <div className="tableHeader">Trial Balance</div>
        <Table className="table"
          data={this.state.trialBalance}
          sortable={true}
          filterable={['name', 'type']}
          columns={[{key:"appId",label:"Account No."},{key:"name",label:"Account Name"},{key:"type",label:"Account Type"},{key:"balance",label:"Balance"}]}
        />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getAppState());
  }

});
module.exports = TrialBalanceView;
