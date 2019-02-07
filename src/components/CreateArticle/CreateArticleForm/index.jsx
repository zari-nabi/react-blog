import React from 'react';
import PropTypes from 'prop-types';

import Banner from '../../Banner';

const CreateArticle = ({ handleInputChange, categories, handleSubmit, errors,editing,article,title,content,category }) => ((
  <div>
    {/* Header */}
    <Banner
      backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`}
      title= {editing ? `Edit Article ${article.title}` :  'Write an article'}
    />
    {/* END Header */}
    {/* Main container */}
    <main className="main-content">
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12">
              <ul className="list-group">
                {
                  errors.map(error => <li className="list-group-item text-danger" key={error.message}>{error.message}</li>)
                }
              </ul>

              <form className="p-30 bg-gray rounded" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-12 my-5">
                    <input type="file" className="form-control" onChange={handleInputChange} name="image" />
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      name="title"
                      placeholder="Title"
                      onChange={handleInputChange}
                      value = {title}
                    />
                  </div>
                  <div className="form-group col-12 col-md-6">
                    <select name="category" value={category} id className="form-control form-control-lg" onChange={handleInputChange}>
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
                    value={content}
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
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired,
  })).isRequired,
}

export default CreateArticle;