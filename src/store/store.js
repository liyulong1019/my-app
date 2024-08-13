import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../common/components/counterReducer";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
