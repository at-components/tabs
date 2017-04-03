// @flow
export const INIT: string = 'TABS/INIT'
export const SELECT: string = 'TABS/SELECT'

export type Init = { id: string, index: number }
export type Select = { id: string, index: number }

export type InitAction = { type: 'TABS/INIT' } & Init
export type SelectAction = { type: 'TABS/SELECT' } & Select
export type Actions = InitAction | SelectAction

export type Reducer = {} | { [tabName: string]: number }

export default function reducer(state: Reducer = {}, action: Actions) {
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
  init: ({ id, index }: Init) => ({ type: 'TABS/INIT', id, index }: InitAction),
  select: ({ id, index }: Select) => ({ type: 'TABS/SELECT', id, index }: SelectAction),
}

export type Store = { components: { tabs: Reducer } }

export const selectors = {
  getActiveIndexById: (state: Store, { id }: { id: string }) => state.components.tabs[id],
}
