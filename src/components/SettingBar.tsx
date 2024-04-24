import React from 'react';
import './SettingBar.css';
import SortBtn from "./SortBtn";

type settingBarType = {
    language:"en-US"|"ko-KR"
    setLanguage:Function
}
function SettingBar({language,setLanguage}:settingBarType) {
    const onChangedLanguage = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setLanguage(e.currentTarget.value);
    }
    return (
        <div className={'settingBarContainer'}>
            <div className={'setting'}>
                <span>Language&nbsp;</span>
                <select value={language} onChange={(e) => onChangedLanguage(e)}>
                    <option value="en-US">EN</option>
                    <option value="ko-KR">KO</option>
                </select>
            </div>
            <div className={'sortBtnContainer'}>
                <SortBtn type={"Title"} label={language === 'en-US' ? "Title":"제목순"} />
                <SortBtn type={"Date"} label={language === 'en-US' ? "Release":"개봉순"} />
                <SortBtn type={"Average"} label={language === 'en-US' ? "Rating":"평점순"} />
            </div>
        </div>
    );
}

export default SettingBar;
