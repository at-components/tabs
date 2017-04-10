// @flow
export const INIT: string = 'TABS/INIT'
export const SELECT: string = 'TABS/SELECT'

export type InitParams = { kind: string, name: string, index: number }
export type SelectParams = { kind: string, name: string, index: number }

export type InitAction = { type: 'TABS/INIT' } & InitParams
export type SelectAction = { type: 'TABS/SELECT' } & SelectParams
export type Actions = InitAction | SelectAction

export type ReduxAction<LocalActions> = LocalActions | Object
export type Reducer = {} | { [tabName: string]: { name: string, index: number } }
export type Store = { components: { tabs: Reducer } }

export default function reducer(state: Reducer = {}, action: ReduxAction<Actions>) {
  switch (action.type) {
    case INIT:
    case SELECT:
      return {
        ...state,
        [action.kind]: {
          name: action.name,
          index: action.index,
        },
      }
    default: return state
  }
}

export const actions = {
  init: ({ kind, name, index }: InitParams) => ({ type: 'TABS/INIT', kind, name, index }: InitAction),
  select: ({ kind, name, index }: SelectParams) => ({ type: 'TABS/SELECT', kind, name, index }: SelectAction),
}

export const selectors = {
  getActiveByKind: (state: Store, kind: string) => state.components.tabs[kind] || {},
  getActiveIndexByKind: (state: Store, kind: string): number =>
    selectors.getActiveByKind(state, kind).index,
}
