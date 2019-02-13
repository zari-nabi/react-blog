import React from 'react';
import PropTypes from 'prop-types';
import {EditorState,convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import CreateArticleForm from './CreateArticleForm';

class CreateArticle extends React.Component {
  constructor() {
    super();

    this.state = {
      title: '',
      image: null,
      content: EditorState.createEmpty(),
      category: null,
      errors: [],
      categories: [],
      editing:false,
      article:null,
    }
  }

  async componentWillMount(){
    const categories = await this.props.getArticleCategories();
    
    if(this.props.match.params.slug){
      const article = this.props.articles.find(articleInArray =>
         articleInArray.slug === this.props.match.params.slug)
    if(!article){
      this.props.history.push('/user/articles');
      return;
    }
      this.setState({
         editing:true ,
          article ,
           categories,
           title:article.title,
           content:article.content,
           category:article.category_id,
          })
    }else{
          this.setState({
      categories
    })
    }


  }

  handleEditorState = (editorState) =>{
    this.setState({content : editorState});
  }

  handleInputChange = (event) => {
//    console.log(event.target.files)
    this.setState({
      [event.target.name]: event.target.type === 'file' ? event.target.files[0] : event.target.value,
    });
  }

   handleSubmit =async (event) => {
    event.preventDefault();

    try{
      const article= await this.props.createArticle({
        title:this.state.title,
        content:draftToHtml(convertToRaw(this.state.content.getCurrentContent())),
        image:this.state.image,
        category:this.state.category,
      } , this.props.token);
      this.props.history.push('/');
      this.props.notyService.success('Successfully Create Article !');
    }catch(errors){
      this.setState({errors});
    }
  }

  updateArticle = async (event) =>{
    event.preventDefault();
    try{
      await this.props.updateArticle({
        title:this.state.title,
        content:draftToHtml(convertToRaw(this.state.content.getCurrentContent())),
        image:this.state.image,
        category:this.state.category,
      },this.state.article,this.props.token);

      this.props.history.push("/user/articles");
      this.props.notyService.success('Successfully Update Article !');
    }catch(errors){
      this.props.notyService.error('Somthing is wrong !');
      this.setState({errors})
    }
  }

  render() {
    return (
      <CreateArticleForm
        handleInputChange={this.handleInputChange}
        categories={this.state.categories}
        handleSubmit={this.handleSubmit}
        errors = {this.state.errors}
        editing = {this.state.editing}
        article={this.state.article}
        title={this.state.title}
        content={this.state.content}
        category={this.state.category}
        updateArticle={this.updateArticle}
        handleEditorState={this.handleEditorState}
      />
    )
  }
}

CreateArticle.propTypes = {
  getArticleCategories: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default CreateArticle;
