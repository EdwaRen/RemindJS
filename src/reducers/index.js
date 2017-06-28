import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';
import {bake_cookie, read_cookie } from 'sfcookies';


const reminder = (action) => {
  let {text, dueDate} = action;
  return {
    id: Math.random(),
    text,
    dueDate
  }
}

const removeById = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id != id);
  console.log('new reduced reminders', reminders);
  return reminders;
}

const reminders = (state = [], action) => {
  let reminders = null;
  //Initializes what we have stored in read_cookie(reminders)
  state = read_cookie('reminders');
  switch(action.type) {
    case ADD_REMINDER:
      reminders = [...state, reminder(action)];
      //Saves cookie when we added a reminder
      bake_cookie('reminders', reminders);
      return reminders;
    case DELETE_REMINDER:
      reminders = removeById(state, action.id);
      //Overides the reminders with new state
      bake_cookie('reminders', reminders);
      return reminders;
    case CLEAR_REMINDERS:
      reminders = []
      bake_cookie('reminders', reminders);
      return reminders;
    default:
      return state;
  }
}

export default reminders
