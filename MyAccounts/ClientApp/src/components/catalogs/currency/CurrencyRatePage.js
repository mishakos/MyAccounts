import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as rateActions from '../../../actions/rateActions';
import CurrencyRateList from './CurrencyRateList';
import Modal from '@material-ui/core/Modal';
import LoadRates from './LoadRates';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class CurrencyRatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyId: props.currencyId,
            modalOpen: false,
            loadSettings: {
                loadFromDate: new Date(),
                loadToDate: new Date()
            }
        };

        this.handleOpenLoadModal = this.handleOpenLoadModal.bind(this);
        this.handleChangeToDate = this.handleChangeToDate.bind(this);
        this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
        this.loadRates = this.loadRates.bind(this);
    }

    componentDidMount() {
        this.props.actions.loadRates(this.props.currencyId);
    }

    handleOpenLoadModal() {
        this.toggleModal();
    }

    toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    handleChangeFromDate(event) {
        let loadSettings = this.state.loadSettings;
        
        loadSettings.loadFromDate = event;
        return this.setState({ loadSettings: loadSettings });
    }

    handleChangeToDate(date) {
        let settings = this.state.loadSettings;
        settings.loadToDate = date;
        return this.setState({ loadSettings: settings });
    }

    loadRates() {
        this.props.actions.importRates(this.state.currencyId,
            this.state.loadSettings.loadFromDate,
            this.state.loadSettings.loadToDate).then(data => {
                console.log(data);
                this.toggleModal();

            });

    }

    render() {

        return (
            <div>
                <Card>
                    <CardContent>
                        <h4>Rates</h4>
                        <Fab color="primary" size="small" aria-label="add" onClick={this.handleOpenLoadModal}>
                            <AddIcon />
                        </Fab>
                        <CurrencyRateList rates={this.props.rates} />
                    </CardContent>
                </Card>
                <Modal
                    aria-labelledby='modal-title'
                    aria-describedby="modal-description"
                    open={this.state.modalOpen}
                    onClose={this.handleOpenLoadModal}>
                    <div style={{backgroundColor: 'beige', width: '600px', height: "150px", margin: 20, padding: 10, textAlign: 'center', position: 'absolute', top: '30%', left: '30%'}} >
                        <h4 id="modal-title">Load rates</h4>
                        <div id="modal-description">
                            <LoadRates
                                fromDate={this.state.loadSettings.loadFromDate}
                                toDate={this.state.loadSettings.loadToDate}
                                onChangeFromDate={this.handleChangeFromDate}
                                onChangeToDate={this.handleChangeToDate}
                                onSubmit={this.loadRates}
                            />

                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

CurrencyRatePage.propTypes = {
    actions: PropTypes.object.isRequired,
    currencyId: PropTypes.number.isRequired,
    rates: PropTypes.array
}

function mapStateToProps(state, ownProps) {
    var currencyId = ownProps.match.params.id;
    return {
        currencyId: +currencyId,
        rates: state.rates.filter(p => p.currencyId === +currencyId)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(rateActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyRatePage);