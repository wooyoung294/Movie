import React, {useEffect, useRef, useState} from 'react';
import './MovieCard.css';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css'
import { Tooltip as ReactTooltip } from "react-tooltip";
import eye from '../assets/img/eye-fill.svg'
import useLanguageStore from "../store/languageStore";
import DetailModal from "./DetailModal";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";
type movieCardType={
    id:number,
    title:string,
    vote_average:number,
    poster_path:string,
    genres: string[]
}
function MovieCard({id,title,vote_average,poster_path,genres}:movieCardType) {
    const [modal,setModal] = useState<boolean>(false)
    const {language,} = useLanguageStore()
    const titleDiv = useRef<HTMLDivElement>(null);
    const [tooltip,setTooltip] = useState(false);
    useEffect(() => {
        if(titleDiv.current){
            if (titleDiv.current.scrollWidth > titleDiv.current.offsetWidth) {
                setTooltip(true);
            }
        }
    }, []);
    const body = document.querySelector('body') as HTMLElement;
    const onClickDetailBtn = ()=>{
        disableBodyScroll(body)
        setModal(true)
    }
    const handledModalClose = ()=>{
        enableBodyScroll(body);
        setModal(false)
    }
    return (
        <>
            <div className={'posterContainer'}>
                <img className={'posterImage'}
                     src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                     alt={title}
                />
                <div className={'posterTextArea'}>
                    <div data-tooltip-id={id.toString()} className={'posterTitle'} ref={titleDiv}>
                        {title}
                    </div>
                    {
                        tooltip &&
                        <ReactTooltip
                            className={'reactTooltip'}
                            id={id.toString()}
                            place="bottom"
                            content={title}
                        />
                    }

                    <div className={'posterRatingArea'}>
                        <Rate value={vote_average/2} allowHalf disabled/>({vote_average})
                    </div>
                    <div className={'genreBadgesContainer'}>
                        <span data-tooltip-id={'genre' + id.toString()}>
                            {language === 'en-US'? 'Genre' : '장르'}
                            <img src={eye} alt={'보기'} className={'genreBadgesContainerEye'}/>
                        </span>
                        <button onClick={onClickDetailBtn} className={'detailBtn'}>
                            {language === 'en-US'? 'VIEW DETAIL' : '상세보기'}
                        </button>
                    </div>
                    <ReactTooltip
                        className={'reactTooltip'}
                        id={'genre' +id.toString()}
                        place="top"
                        content={genres.toString()}
                    />
                </div>
            </div>
            <DetailModal id={id} open={modal} handledModalClose={handledModalClose}/>
    </>

    );
}

export default React.memo(MovieCard);
