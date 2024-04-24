import React from 'react';
import Rate from "rc-rate";
import './SkeletonMovieCard.css'
import 'rc-rate/assets/index.css'
function SkeletonMovieCard() {
    return (
        <div className={'posterContainer'}>
            <div className={'posterImage SkeletonItem'}
            />
            <div className={'posterTextArea'}>
                <div className={'posterTitle'} >
                    <span className={'SkeletonItem'}>SkeletonItem</span>
                </div>


                <div className={'posterRatingArea'}>
                    <Rate value={5} allowHalf disabled/><span className={'SkeletonItem'}>SkeletonItem</span>
                </div>
                <div className={'genreBadgesContainer'}>
                    <span className={'SkeletonItem'}>SkeletonItem</span>
                    <button className={'detailBtn SkeletonItem'}>
                        VIEW DETAIL
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SkeletonMovieCard;
