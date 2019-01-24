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

            <nav className="flexbox mt-50 mb-80">
                <a className="btn btn-white disabled">
                    <i className="ti-arrow-left fs-9 mr-4" /> Newer</a>
                <a className="btn btn-white" href="#">Older
                    <i className="ti-arrow-right fs-9 ml-4" />
                </a>
            </nav>
        </div>

    )
}

export default Welcome;