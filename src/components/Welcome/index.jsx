import React from "react";
import Article from "./../Article";
import Banner from "./../Banner";

const Welcome = () => {
    return (
        <div>
            <Banner
                backgroundImage="url(assets/img/bg-gift.jpg)"
                title="Latest Blog Posts"
                subTitle="Read and get updated on how we progress."
            />
            <Article />
            <Article />
            <Article />
        </div>

    )
}

export default Welcome;