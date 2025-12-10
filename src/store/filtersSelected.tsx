import { create } from 'zustand'
import { filtersSelectedState } from '../interfaces/store'
import { type filtersSelected } from '../interfaces/filters'


const filtersSelectedStore = create<filtersSelectedState>((set) => ({

  filtersSelected : null,

  changeFilterSelected: (newFilterValue: filtersSelected) => { 
    console.log("Updating filtersSelected with:", newFilterValue);
    set((state: filtersSelectedState) => ({
      filtersSelected : {...state.filtersSelected, ...newFilterValue}
    }))
  },

}))

export default filtersSelectedStore