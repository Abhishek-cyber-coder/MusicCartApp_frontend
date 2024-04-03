import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendUserFeedbackApi } from "../../apis/feedback";

export const sendFeedbackAsync = createAsyncThunk(
  "feedback/sendFeedback",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const response = await sendUserFeedbackApi(feedbackData);

      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const initialState = {
  isLoading: false,
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendFeedbackAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendFeedbackAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(sendFeedbackAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectIsLoading = (state) => state.feedback.isLoading;

export default feedbackSlice.reducer;
