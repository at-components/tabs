// @flow
export const SELECT: string = 'TABS/SELECT'

export type SelectParams = { kind: string, name: string }
export type SelectAction = { type: 'TABS/SELECT' } & SelectParams

export type Actions = SelectAction

export type Reducer = {} | { [kind: string]: { name: string, kind: string } }
export type Store = { components: { tabs: Reducer } }

export default function reducer(state: Reducer = {}, action: Actions) {
  switch (action.type) {
    case SELECT:
      return {
        ...state,
        [action.kind]: {
          kind: action.kind,
          name: action.name,
        },
      }
    default: return state
  }
}

export const actions = {
  select: ({ kind, name }: SelectParams) => ({ type: 'TABS/SELECT', kind, name }: SelectAction),
}

export const selectors = {
  getSelectedTabByKind: (state: Store, kind: string) => state.components.tabs[kind] || {},
}
