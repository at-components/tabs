// @flow
export const INIT: string = 'TABS/INIT'
export const SELECT: string = 'TABS/SELECT'

export type Init = { type: 'TABS/INIT', name: string, index: number }
export type Select = { type: 'TABS/SELECT', name: string, index: number }
export type Actions = Init | Select

export type Reducer = {} | { [tabName: string]: number }

export default function reducer(state: Reducer = {}, action: Actions) {
  switch (action.type) {
    case INIT:
    case SELECT:
      return {
        ...state,
        [action.name]: action.index,
      }
    default: return state
  }
}

export const actions = {
  mount: ({ name, index }: Init) => ({ type: 'TABS/INIT', name, index }: Init),
  select: ({ name, index }: Select) => ({ type: 'TABS/SELECT', name, index }: Select),
}

export type Store = { components: { tabs: Reducer } }

export const selectors = {
  getActiveIndexByName: (state: Store, { name }: { name: string }) => state.components.tabs[name],
}
