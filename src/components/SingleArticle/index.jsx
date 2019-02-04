import React from 'react';
import Article from './Article';

class SingleArticleContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      article: null,
      loading: true,
    }
  }

  async componentWillMount() {
    const article = await this.props.getArticle(this.props.match.params.slug);

    this.setState({article , loading : false })
  }
  render() {
    return (
      <div>
        {
          !this.state.loading &&
          <Article article={this.state.article} />
        }
        {
          this.state.loading &&
          <p> LOADING </p>
        }
      </div>

    )
  }
}

export default SingleArticleContainer;
