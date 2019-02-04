import React from 'react';

import Banner from '../../Banner';
import Article from '../../Article';

const Articles = ({ articles, handlePagination, nextUrl, prevUrl  }) => ((
    <div>

        <Banner
            backgroundImage="url(assets/img/bg-gift.jpg)"
            title="Latest Blog Posts"
            subTitle="Read and get updated on how we progress."
        />

        <main className="main-content bg-gray">
            <div className="row">
                <div className="col-12 col-lg-6 offset-lg-3">
                    {articles && articles.map(article => <div key={article.id}>
                        <Article article={article} />
                        <hr />
                    </div>)}

                    <nav className="flexbox mt-50 mb-50">
                        <a className={`btn btn-white ${prevUrl ? '' : 'disabled'}`} href="#"
                         onClick={() => handlePagination(prevUrl)}>Prev
                            <i className="ti-arrow-left fs-9 ml-4" />
                        </a>
                        <a className={`btn btn-white ${nextUrl ? '' : 'disabled'}`}
                         onClick={() => handlePagination(nextUrl)}>
                            <i className="ti-arrow-right fs-9 mr-4" /> Next
                        </a>

                    </nav>
                </div>
            </div>
        </main>
    </div>
));

export default Articles;