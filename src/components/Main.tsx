import React, {useRef, useState} from 'react';
import './Main.css';
import SettingBar from "./SettingBar";
import MovieCard from "./MovieCard";
import {useQuery} from "@tanstack/react-query";
import {getMovieGenres, getNowPlayingMovie} from "../api/Movie";
import Pagination from "react-js-pagination";
import useLanguageStore from "../store/languageStore";
import useOrderStore from "../store/orderStore";
function Main() {
    const mainRef = useRef<HTMLDivElement>(null)
    const {language, setLanguage} = useLanguageStore()
    const {orderType,orderBy} = useOrderStore()
    const [activePage, setActivePage] = useState<number>(1)

    const { data, isLoading, isError} =
        useQuery(
            { queryKey: ["movie", "now",language,activePage,{orderType:orderType,orderBy:orderBy}],
                queryFn: () => getMovieGenres(language)
                    .then( genre =>getNowPlayingMovie(language,genre,activePage,orderType,orderBy))
            }
        );

    if (isError) {
        return <h2>실패</h2>;
    }
    if (isLoading) {
        return <h2>로딩중</h2>;
    }
    const {page, results, total_pages, total_results} = data;
    const onChangeActivePage = (pageNum:number)=>{
        if(pageNum>total_pages){
            alert('마지막 페이지입니다.')
        }
        else {
            mainRef.current?.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            setActivePage(pageNum)
        }
    }

    return (
        <div className={'main'} ref={mainRef}>
            <SettingBar language={language} setLanguage={setLanguage}/>
            <div className={'movieCardContainer'}>
                {
                    results.map((result:any)=>
                        <MovieCard id={result.id}
                                   title={result.title}
                                   vote_average={result.vote_average}
                                   poster_path={result.poster_path}
                                   genres={result.genres}
                                   key={result.id}
                        />
                    )
                }
            </div>
            <Pagination
                totalItemsCount={total_results}
                onChange={onChangeActivePage}
                activePage={page}
                itemsCountPerPage={results.length}
                linkClass={'unActivePage'}
                activeLinkClass={'activePage'}
                disabledClass={'disabledPage'}
            />
        </div>
    );
}

export default Main;
