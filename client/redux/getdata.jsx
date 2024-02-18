import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const usersdata = createAsyncThunk("get/data", async () => {
  axios.defaults.withCredentials=true
  try {
    const response = await axios.get("http://localhost:5000/users/getuser");
    return response
  } catch (error) {
    document.write("<h3>Please try again later</h3>")
    document.close()
  }
});
const userdataslice = createSlice({
  name: "userdata",
  initialState: {
    loading: false,
    data: [],
    message: null,
  },
  extraReducers: (builders) => {
    builders
      .addCase(usersdata.pending, (state) => {
        state.loading = true;
      })
      .addCase(usersdata.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload.data);
      })
      .addCase(usersdata.rejected, (state, action) => {
        (state.loading = false),
          (state.data = []),
          (state.message = action.error.message);
      });
  },
});

export default userdataslice.reducer;