import { create } from 'zustand'
type useLanguageStoreType={
    language:'ko-KR'|'en-US',
    setLanguage:(language:'ko-KR'|'en-US')=>void
}

const useLanguageStore = create<useLanguageStoreType>((set) => ({
    language:'en-US',
    setLanguage:(language)=>set(() =>({language:language}))
}))
export default useLanguageStore;
