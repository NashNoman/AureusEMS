import examSlice from "@/redux/builder/exam-slice";
import mcqSlice from "@/redux/builder/mcq-slice";
import trueFalseSlice from "@/redux/builder/trueFalse-slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    examInfo: examSlice.reducer,
    mcq: mcqSlice.reducer,
    tof: trueFalseSlice.reducer,
  },
});

export default store;
