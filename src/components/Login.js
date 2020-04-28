import * as React from 'react';
import { connect } from 'react-redux';

import { login } from '../redux/actions/auth';

class Login extends React.Component {
    state = {
        email: "",
        password: ""
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/");
        }
    }

    onChange = e => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
    }

    handleLogin = async e => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        await this.props.dispatch(login(data));
        await this.props.history.push("/");
    }

    render() {
        const { auth } = this.props;
        return (
            <div className="container">
                <h1 className="text-center justify-content-center mt-5">OKANEMO LOGIN</h1>
                <div className="row text-center justify-content-center mt-2" style={{ color: "white" }}>
                    <div className="col-4 bg-info p-8">
                        <form>
                            <div className="form-group mt-3">
                                <p style={{ color: "yellow" }}>{auth.msg}</p>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="email" onChange={this.onChange} placeholder="Your email.." />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" onChange={this.onChange} placeholder="Your password.." />
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn btn-light w-100" onClick={this.handleLogin}>LOGIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Login);