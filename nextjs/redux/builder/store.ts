import examSlice from "@/redux/builder/exam-slice";
import singleChoiceSlice from "@/redux/builder/singleChoice-slice";
import trueFalseSlice from "@/redux/builder/trueFalse-slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    examInfo: examSlice.reducer,
    mcq: singleChoiceSlice.reducer,
    tof: trueFalseSlice.reducer,
  },
});

export default store;
