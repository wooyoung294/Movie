import React, {useState} from 'react';
import MovieCard from "./MovieCard";
import './MovieCardContainer.css'
import Pagination from "react-js-pagination";
import useLanguageStore from "../store/languageStore";
import useOrderStore from "../store/orderStore";
import {useQuery} from "@tanstack/react-query";
import {getMovieGenres, getNowPlayingMovie} from "../api/Movie";
import SkeletonMovieCard from "./SkeletonMovieCard";
import DetailModal from "./DetailModal";
import {enableBodyScroll} from "body-scroll-lock";
type movieCardContainerType ={
    handledScroll:()=>void;
}
function MovieCardContainer({handledScroll}:movieCardContainerType) {
    const {language} = useLanguageStore()
    const {orderType,orderBy} = useOrderStore()
    const [activePage, setActivePage] = useState<number>(1)
    const [modal,setModal] = useState<{ open:boolean,id:null|number }>
    ({open:false,id:null})
    const body = document.querySelector('body') as HTMLElement;
    const handledModalClose = ()=>{
        enableBodyScroll(body);
        setModal({open: false,id:null})
    }
    const onChangeActivePage = (pageNum:number)=>{
        if(pageNum>total_pages){
            alert('마지막 페이지입니다.')
        }
        else {
            handledScroll();
            setActivePage(pageNum)
        }
    }
    const { data, isLoading, isError} =
        useQuery(
            { queryKey: ["movie", "now",language,activePage,{orderType:orderType,orderBy:orderBy}],
                queryFn: () => getMovieGenres(language)
                    .then( genre =>getNowPlayingMovie(language,genre,activePage,orderType,orderBy))
            }
        );

    if (isError) {
        return (
                <h2>Load Fail Retry Plz...</h2>
        );
    }
    if (isLoading) {
        return (
            <div className={'movieCardContainer'}>
                <SkeletonMovieCard/>
                <SkeletonMovieCard/>
                <SkeletonMovieCard/>
                <SkeletonMovieCard/>
                <SkeletonMovieCard/>
                <SkeletonMovieCard/>
                <SkeletonMovieCard/>
                <SkeletonMovieCard/>
                <SkeletonMovieCard/>
                <SkeletonMovieCard/>
            </div>
        );
    }
    const {page, results, total_pages, total_results} = data;
    return (
        <>
            <div className={'movieCardContainer'}>
                {
                    results.map((result: any) =>
                        <MovieCard id={result.id}
                                   title={result.title}
                                   vote_average={result.vote_average}
                                   poster_path={result.poster_path}
                                   genres={result.genres}
                                   setModal={setModal}
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
            <DetailModal id={modal.id} open={modal.open} handledModalClose={handledModalClose}/>
        </>
    );
}

export default MovieCardContainer;
