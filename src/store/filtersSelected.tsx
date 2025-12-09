import { create } from 'zustand'
import { filtersSelectedState } from '../interfaces/store'
import { type filtersSelected } from '../interfaces/filters'


const filtersSelectedStore = create<filtersSelectedState>((set) => ({

  filtersSelected : null,

  changeFilterSelected: (newFilterValue: filtersSelected) =>{ 
    set((state: filtersSelectedState) => ({
      filtersSelected : {...state.filtersSelected, ...newFilterValue}
    }))
  },

}))

export default filtersSelectedStore