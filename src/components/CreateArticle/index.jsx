import React from 'react';
import PropTypes from 'prop-types';

import CreateArticleForm from './CreateArticleForm';

class CreateArticle extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      image: null,
      content: '',
      category: null,
      errors: {},
      categories: [],
    }
  }

  async componentWillMount(){
    const categories = await this.props.getArticleCategories();

    this.setState({
      categories
    })
  }

  handleInputChange = (event) => {
    console.log(event.target.files)
    this.setState({
      [event.target.name]: event.target.type === 'file' ? event.target.files[0] : event.target.value,
    });
  }

   handleSubmit =async (event) => {
    event.preventDefault();
    await this.props.CreateArticle(this.state);
  }

  render() {
    return (
      <CreateArticleForm
        handleInputChange={this.handleInputChange}
        categories={this.state.categories}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

CreateArticle.propTypes = {
  getArticleCategories: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
};

export default CreateArticle;
