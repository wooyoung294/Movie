import React, {useEffect} from 'react';
import Modal from 'react-modal';
import {getMovieDetailById} from "../api/Movie";
import {useQuery} from "@tanstack/react-query";
import useLanguageStore from "../store/languageStore";
import x from '../assets/img/x-lg.svg'
import './DetailModal.css'
const detailModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width:'80%',
        height:'85%'
    },
};
type detailModalType={
    id:number,
    open:boolean,
    handledModalClose:()=>void
}
function DetailModal({id,open,handledModalClose}:detailModalType) {
    const {language} = useLanguageStore()
    const { data,refetch} =
        useQuery(
            { queryKey: ["movie", "detail"],
                queryFn: () => getMovieDetailById(language,id),
                enabled:false
            }
        );

    // react-modal에서 afterOpenModal 지원하지만 해당기능 사용시 화면 깜빡임
    useEffect(() => {
        open && refetch();
    }, [open,refetch]);
    return (
        <Modal
            isOpen={open}
            onRequestClose={handledModalClose}
            style={detailModalStyles}
            contentLabel="Example Modal"
        >
            <div className={'closeBtnContainer'}>
                <img src={x} onClick={handledModalClose} alt={'Close'}/>
            </div>

            <div className={'modalMainContainer'}>
                <div className={'modalPosterContainer'}>
                    <img className={'modalPoster'} src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt={data?.title}/>
                </div>
                <div className={'modalDescContainer'}>
                    <h2 className={'modalTitle'}> {data?.title}</h2>
                    {data?.homepage &&
                        <div>
                            <span>
                                {language === 'en-US' ? 'Homepage' : '홈페이지'} :
                            </span>
                            <a href={data?.homepage}
                               target='_blank'
                               rel={'noopener noreferrer'}
                            >
                                {data?.homepage}
                            </a>
                        </div>
                    }
                    <div>
                        <span>
                            {language === 'en-US' ? 'Genres' : '장르'} :
                        </span>
                        {data?.genres.map((value: { id: number, name: string }) => value.name + " ")}
                    </div>
                    <div>
                        <span>
                            {language === 'en-US' ? 'Release Date' : '개봉일'} :
                        </span>
                        {data?.release_date}

                    </div>
                    <div>
                        <span>
                            {language === 'en-US' ? 'Runtime' : '상영시간'} :
                        </span>
                        {data?.runtime} {language === 'en-US' ? 'Min' : '분'}
                    </div>
                    <div>
                         <span>
                            {language === 'en-US' ? 'Overview' : '줄거리'} :
                        </span>
                        {data?.overview}
                    </div>
                    <div>
                          <span>
                            {language === 'en-US' ? 'production Companies' : '배급사'}
                        </span>
                        <div className={'productionCompaniesImgContainer'}>
                            {data?.production_companies.map(
                                (value: { id: number, logo_path: string, name: string, origin_country: string }) =>
                                    <img
                                        className={"productionCompaniesImg"}
                                        src={`https://image.tmdb.org/t/p/w500${value.logo_path}`}
                                        alt={value.name}
                                        key={value.name}
                                    />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default DetailModal;
