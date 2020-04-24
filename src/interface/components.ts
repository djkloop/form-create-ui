export interface ComponentsItem {
  type: string,
  label: string,
  sort: number
}

export interface ComponentsResult {
  list: ComponentsItem[]
}


export interface IFcComponentsListState {
  list: ComponentsItem[],
  loading: boolean
}
