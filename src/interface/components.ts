export interface ComponentsItem {
  type: string,
  label: string,
  sort: number,
  key: string
}

export interface ComponentsResult {
  list: ComponentsItem[],
  tags: string[]
}


export interface IFcComponentsListState extends ComponentsResult{
  loading: boolean,
  defaultActive: string,
  filterData: {
    [props: string]: ComponentsItem[]
  }
}
