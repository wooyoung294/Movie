import { create } from 'zustand'
type useOrderStoreType={
    orderType:'Title'|'Date'|'Average' |'NONE',
    orderBy:'ASC' | 'DESC' | 'NONE',
    setOrder:(orderType:'Title'|'Date'|'Average' |'NONE',orderBy:'ASC' | 'DESC' | 'NONE') => void
}

const useOrderStore = create<useOrderStoreType>((set) => ({
    orderType:'NONE',
    orderBy:'NONE',
    setOrder:(orderType,orderBy)=>set(() =>(
        {orderType:orderType,orderBy:orderBy}
    ))
}))
export default useOrderStore;
