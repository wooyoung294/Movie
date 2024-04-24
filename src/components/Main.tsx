import React, {useRef} from 'react';
import './Main.css';
import SettingBar from "./SettingBar";
import useLanguageStore from "../store/languageStore";
import MovieCardContainer from "./MovieCardContainer";
function Main() {
    const mainRef = useRef<HTMLDivElement>(null)
    const {language, setLanguage} = useLanguageStore()
    const handledScroll = ()=>{
        mainRef.current?.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className={'main'} ref={mainRef}>
            <SettingBar language={language} setLanguage={setLanguage}/>
            <MovieCardContainer handledScroll={handledScroll}/>
        </div>
    );
}

export default Main;
