import examSlice from "@/redux/builder/exam-slice";
import singleChoiceSlice from "@/redux/builder/singleChoice-slice";
import trueFalseSlice from "@/redux/builder/trueFalse-slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    exam: examSlice.reducer,
    singleChoice: singleChoiceSlice.reducer,
    trueFalse: trueFalseSlice.reducer,
  },
});

export default store;
