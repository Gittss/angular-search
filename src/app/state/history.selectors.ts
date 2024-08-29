import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectHistoryState = createFeatureSelector<{ history: number[] }>(
  'history'
);

export const selectHistory = createSelector(
  selectHistoryState,
  (state) => state.history
);
