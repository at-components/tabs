// @flow
export const INIT: string = 'TABS/INIT'
export const SELECT: string = 'TABS/SELECT'

export type InitParams = { kind: string, index: number }
export type SelectParams = { kind: string, index: number }

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
        [action.kind]: action.index,
      }
    default: return state
  }
}

export const actions = {
  init: ({ kind, index }: InitParams) => ({ type: 'TABS/INIT', kind, index }: InitAction),
  select: ({ kind, index }: SelectParams) => ({ type: 'TABS/SELECT', kind, index }: SelectAction),
}

export const selectors = {
  getActiveIndexById: (state: Store, kind: string) => state.components.tabs[kind],
}
