import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface BreadcrumbState {
  path: string[];
}

const initialState: BreadcrumbState = { path: [] };

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    setBreadcrumb: (state, action: PayloadAction<string[]>) => {
      state.path = action.payload;
    },
  },
});

export const { setBreadcrumb } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;