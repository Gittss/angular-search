import { createAction, props } from '@ngrx/store';

export const addToHistory = createAction(
  '[Search] Add to History',
  props<{ ids: number[] }>()
);
