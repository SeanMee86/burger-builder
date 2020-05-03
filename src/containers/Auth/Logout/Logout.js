import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logOut } from "../../../store/actions";


const Logout = props => {

    const { onLogout } = props;

    useEffect(() => {
        onLogout();
    }, [onLogout])

    return(
        <Redirect to={'/'}/>
    )
}

const mapDispatchToProps = dispatch => ({
    onLogout: () => (dispatch(logOut()))
});

export default connect(null, mapDispatchToProps)(Logout);