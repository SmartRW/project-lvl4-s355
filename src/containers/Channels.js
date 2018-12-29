import { connect } from 'react-redux';
import Component from '../components/Channels';

const mapStateToProps = ({ channels }) => ({ channels });

export default connect(mapStateToProps)(Component);
