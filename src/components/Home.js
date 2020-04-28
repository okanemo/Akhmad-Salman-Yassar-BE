import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../redux/actions/auth';
import { createUser, readUser, updateUser, deleteUser, changePassword } from '../redux/actions/user';
import { readRole } from '../redux/actions/role';

class Home extends React.Component {
    state = {
        id: null,
        name: "",
        email: "",
        password: "",
        new_password: "",
        confirm_new_password: "",
        id_role: null,
        editData: []
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        this.props.dispatch(readUser())
        this.props.dispatch(readRole())
    }

    onClickEdit = item => {
        this.setState({
            id: item.id,
            name: item.name,
            email: item.email,
            // password: item.password,
            id_role: item.id_role
        })
    }

    onClickChangePassword = id => {
        this.setState({
            id: id
        })
    }

    onClickDelete = id => {
        this.props.dispatch(deleteUser(id))
    }

    handleLogout = () => {
        this.props.dispatch(logout())
        this.props.history.push("/login")
    }

    handleAdd = e => {
        e.preventDefault()
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            id_role: parseInt(this.state.id_role)
        }
        this.props.dispatch(createUser(data))
    }

    handleEdit = e => {
        e.preventDefault()
        const id = this.state.id
        const data = {
            name: this.state.name,
            email: this.state.email,
            id_role: this.state.id_role
        }
        this.props.dispatch(updateUser(data, id))
    }

    handleChangePassword = e => {
        e.preventDefault()
        const id = this.state.id
        const data = {
            current_password: this.state.password,
            new_password: this.state.new_password,
            confirm_new_password: this.state.confirm_new_password
        }
        this.props.dispatch(changePassword(data, id))
    }

    render() {
        const { users, msg, roles } = this.props;
        const listusers = users.map((item, index) => {
            return (
                <tbody key={index}>
                    <tr>
                        <th>{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td><button type="button" className={this.props.auth.profile[0].id_role === 3 ? "btn btn-info disabled" : "btn btn-info"} data-toggle="modal" data-target="#editModal" onClick={() => this.onClickEdit(item)}>EDIT</button> || <button type="button" className={this.props.auth.profile[0].id_role === 3 ? "btn btn-info disabled" : "btn btn-info"} data-toggle="modal" data-target="#changePasswordModal" onClick={() => this.onClickChangePassword(item.id)}>CHANGE PASSWORD</button> || <button type="button" className={this.props.auth.profile[0].id_role === 3 ? "btn btn-info disabled" : "btn btn-info"} onClick={() => this.onClickDelete(item.id)}>DELETE</button></td>
                    </tr>
                </tbody>
            )
        })
        return (
            <>
                <nav className="navbar navbar-light bg-light">
                    <Link className="navbar-brand" to="/">OKANEMO</Link>
                    <form className="form-inline">
                        <button className="btn btn-info my-2 my-sm-0" type="submit" onClick={this.handleLogout}>LOGOUT</button>
                    </form>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="container">
                            <div className="row mt-5 mb-5">
                                <div className="col-4">
                                    <div>HOME</div>
                                </div>
                                <div className="col-8">
                                    <button type="button" className={this.props.auth.profile[0].id_role === 3 ? "btn btn-info float-right disabled" : "btn btn-info float-right "} data-toggle="modal" data-target="#addModal">ADD DATA</button>
                                </div>
                            </div>
                        </div>
                        <table className="table text-center">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">ROLE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            {listusers}
                        </table>
                    </div>
                </div>
                <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">ADD</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label className="col-form-label">NAME:</label>
                                        <input type="text" className="form-control" name="name" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">EMAIL:</label>
                                        <input type="text" className="form-control" name="email" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">PASSWORD:</label>
                                        <input type="password" className="form-control" name="password" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">ROLE:</label>
                                        <select className="custom-select" name="id_role" onChange={this.onChange} >
                                            <option selected disabled>Choose..</option>
                                            {roles.map((item, index) =>
                                                <option key={index} value={item.id}>
                                                    {item.name}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">CLOSE</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleAdd}>SUBMIT</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">EDIT</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label className="col-form-label">NAME:</label>
                                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">EMAIL:</label>
                                        <input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">ROLE:</label>
                                        <select className="custom-select" name="id_role" value={this.state.id_role} onChange={this.onChange} >
                                            <option selected disabled>Choose..</option>
                                            {roles.map((item, index) =>
                                                <option key={index} value={item.id}>
                                                    {item.name}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">CLOSE</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleEdit}>SUBMIT</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="changePasswordModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title d-block" id="exampleModalLabel">CHANGE PASSWORD</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label className="col-form-label">CURRENT PASSWORD:</label>
                                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">NEW PASSWORD:</label>
                                        <input type="password" className="form-control" name="new_password" value={this.state.new_password} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">CONFIRM NEW PASSWORD:</label>
                                        <input type="password" className="form-control" name="confirm_new_password" value={this.state.confirm_new_password} onChange={this.onChange} />
                                    </div>
                                    <label className="col-form-label" style={{ color: "red" }}>{msg}</label>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">CLOSE</button>
                                <button type="button" className="btn btn-primary" onClick={this.handleChangePassword}>SUBMIT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        users: state.users.users,
        msg: state.users.msg,
        roles: state.roles.roles
    }
}

export default connect(mapStateToProps)(Home);