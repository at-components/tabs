// @flow
export const INIT: string = 'TABS/INIT'
export const SELECT: string = 'TABS/SELECT'

export type InitParams = { id: string, index: number }
export type SelectParams = { id: string, index: number }

export type InitAction = { type: 'TABS/INIT' } & InitParams
export type SelectAction = { type: 'TABS/SELECT' } & SelectParams
export type Actions = InitAction | SelectAction

export type ReduxAction<LocalActions> = LocalActions | Object
export type Reducer = {} | { [tabName: string]: number }
export type Store = { components: { tabs: Reducer } }

export default function reducer(state: Reducer = {}, action: ReduxAction<Actions>) {
  switch (action.type) {
    case INIT:
    case SELECT:
      return {
        ...state,
        [action.id]: action.index,
      }
    default: return state
  }
}

export const actions = {
  init: ({ id, index }: InitParams) => ({ type: 'TABS/INIT', id, index }: InitAction),
  select: ({ id, index }: SelectParams) => ({ type: 'TABS/SELECT', id, index }: SelectAction),
}

export const selectors = {
  getActiveIndexById: (state: Store, { id }: { id: string }) => state.components.tabs[id],
}
