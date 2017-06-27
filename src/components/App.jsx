import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder } from '../actions';





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: ''

    }
  }
  addReminder() {
    this.props.addReminder(this.state.text);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    console.log('reminders', reminders);
    return (
      <ul className = "list-group col-sm-4">
        {
          reminders.map(reminder=> {
            return (
              <li key = {reminder.id} className = "list-group-item">
                <div className = "list-item"> {reminder.text}</div>
                <div
                  className = "list-item delete-button"
                  onClick = {() => this.deleteReminder(reminder.id)}
                >
                  &#x2715;
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="title">
          RemidnerJS
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have to ..."
              onChange = {event => this.setState({text: event.target.value})}
            />
            <input
              className = "form-control"
              type = "datetime-local"
              onChange={event=> this.setState({dueDate: event.target.value})}
            ></input>
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick = {() =>this.addReminder()}
          >

            Add Reminder

          </button>
          { this.renderReminders() }

          <div>

          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    reminders: state
  }
}


export default connect(mapStateToProps, { addReminder, deleteReminder })(App);
