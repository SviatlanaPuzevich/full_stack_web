import {hideNotification, showNotification} from "../reducers/notificationReducer.js";

const useNotify = (dispatch, message)=>{
  dispatch(showNotification(message))
  setTimeout(() => {dispatch(hideNotification(message))}, 5000)
}

export default useNotify