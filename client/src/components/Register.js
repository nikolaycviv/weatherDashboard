import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../actions/user'
import classnames from 'classnames'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      givenName: '',
      familyName: '',
      email: '',
      password: '',
      password_confirm: '',
      errors: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    const user = {
      givenName: this.state.givenName,
      familyName: this.state.familyName,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    }
    this.props.registerUser(user, this.props.history)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  render () {
    const { errors } = this.state
    return (
      <div className="container">
        <h2>Registration</h2>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <input
              type="text"
              placeholder="Given Name"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.givenName
              })}
              name="givenName"
              onChange={ this.handleInputChange }
              value={ this.state.givenName }
            />
            {errors.givenName && (<div className="invalid-feedback">{errors.givenName}</div>)}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Family Name"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.familyName
              })}
              name="familyName"
              onChange={ this.handleInputChange }
              value={ this.state.familyName }
            />
            {errors.familyName && (<div className="invalid-feedback">{errors.familyName}</div>)}
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.email
              })}
              name="email"
              onChange={ this.handleInputChange }
              value={ this.state.email }
            />
            {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.password
              })}
              name="password"
              onChange={ this.handleInputChange }
              value={ this.state.password }
            />
            {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.password_confirm
              })}
              name="password_confirm"
              onChange={ this.handleInputChange }
              value={ this.state.password_confirm }
            />
            {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
                        Register User
            </button>
          </div>
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register))
