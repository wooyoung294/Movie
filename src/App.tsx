import React from 'react';
import './App.css';
import Header from "./components/Header";
import Main from "./components/Main";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Joyride from "react-joyride";

function App() {
    const queryClient = new QueryClient()
    const steps:any = [
        {
            content: <h4>환영합니다.<br/>처음 방문하셨나요?</h4>,
            locale: { skip: <strong aria-label="skip">SKIP</strong> },
            disableOverlay:true,
            placement: 'center',
            target: '#root > div',
        },
        {
            content: <h5>사용하시는 언어를 선택해주세요.</h5>,
            placement: 'top' as const,
            target: '.setting',


        },
        {
            content: <h5>여기에 마우스를 올리면 장르를 보실 수 있어요.</h5>,
            placement: 'top' as const,
            target: '.genreBadgesContainerEye',
            // target: '.posterContainer',
        },
        {
            content: <h5>버튼을 누르시면 해당영화의 줄거리 및 자세한 정보를 볼 수 있어요.</h5>,
            placement: 'top' as const,
            target: '.detailBtn',
        },
        {
            content: <h4>취향에 맞는 영화를 찾아보세요~</h4>,
            placement: 'center',
            target: 'body',
        },

    ];
    return (
        <>
            <Joyride
                run={true}
                showProgress
                showSkipButton
                disableOverlayClose
                disableCloseOnEsc
                disableScrolling
                continuous
                steps={steps}
            />
            <Header/>
            <QueryClientProvider client={queryClient}>
                <Main/>
                <ReactQueryDevtools initialIsOpen={false} position={'bottom'} />
            </QueryClientProvider>
        </>
    );
}

export default App;
