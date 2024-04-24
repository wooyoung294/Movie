import AuthorizationAxios from "./AuthorizationAxios";

type Genre = {id: number, name: string}
type Genres = {genres:Genre[]}

export async function getMovieGenres(language:'ko-KR'|'en-US') {
    try {
        const {data} = await AuthorizationAxios.get<Genres>(`/3/genre/movie/list?language=${language}`);
        return data.genres;
    }
    catch (e:any) {
        throw new Error(`getMovieGenresError:${e}`)
    }
}
function sortFunction(key:'Title'|'Date'|'Average',a: any, b: any) {
    let orderKey:'title'|'release_date'|'vote_average'|'' ='';
    switch (key) {
        case 'Title':
            orderKey='title'
            break;
        case 'Date' :
            orderKey='release_date';
            break;
        case 'Average' : orderKey='vote_average';
            break;
    }
    return a[orderKey] < b[orderKey] ? -1 : a[orderKey] > b[orderKey] ? 1 : 0;
}
export async function getNowPlayingMovie(
    language:'ko-KR'|'en-US',
    genres:Genre[],
    activePage:number,
    orderType: "NONE" | "Title" | "Date" | "Average",
    orderBy:"NONE" | "ASC" | "DESC") {

    //장르이름 genre 키값으로 추가
    const res:any = await AuthorizationAxios.get(`/3/movie/now_playing?language=${language}&page=${activePage}`);
    res.data.results=res.data.results.map((result: any) => {
        const genresArray = result.genre_ids.map((genreId: number) =>
            genres.find(genre => genre.id === genreId)?.name
        );
        return { ...result, genres: genresArray };
    });

    //정렬
    if (orderBy === 'ASC') {
        res.data.results.sort((a: any, b: any) => sortFunction(orderType as 'Title'|'Date'|'Average',a, b));
    } else if (orderBy === 'DESC') {
        res.data.results.sort((a: any, b: any) => sortFunction(orderType as 'Title'|'Date'|'Average',b, a)); // Reverse sorting for DESC
    }

    return res.data
}
export async function getMovieDetailById(language:'ko-KR'|'en-US',id:number) {
    const res = await AuthorizationAxios.get(`/3/movie/${id}?language=${language}`);
    return res.data;
}
