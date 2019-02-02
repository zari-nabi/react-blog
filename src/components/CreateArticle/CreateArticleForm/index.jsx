import React from 'react';
import PropTypes from 'prop-types';

import Banner from '../../Banner';

const CreateArticle = ({handleInputChange , categories}) => ((
    <div>
      {/* Header */}
      <Banner
        backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`}
        title="Write an article"
      />
      {/* END Header */}
      {/* Main container */}
      <main className="main-content">
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-12">
                <form className="p-30 bg-gray rounded" method="POST" data-form="mailer">
                  <div className="row">
                    <div className="form-group col-md-12 my-5">
                      <input type="file" className="form-control" onChange={handleInputChange} name ="image" />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange = {handleInputChange}
                      />
                    </div>
                    <div className="form-group col-12 col-md-6">
                      <select name="channel" id className="form-control form-control-lg" onChange={handleInputChange}>
                        <option value>Select category</option>
                        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows={4}
                      placeholder="Content"
                      name="content"
                      defaultValue=""
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="text-center">
                    <button className="btn btn-lg btn-primary" type="submit">Create Article</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* END Main container */}
    </div>
  ));

  CreateArticle.propTypes = {
    handleInputChange : PropTypes.func.isRequired,
  }

  export default CreateArticle;