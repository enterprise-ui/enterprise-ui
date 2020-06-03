import React from 'react';

import { InitialPropsDecorator } from '@enterprise-ui/appcore';
import {RouteComponentProps} from 'react-router-dom';

import {fetchArticles} from '../actions';
import ArticleDetailModal from '../components/ArticleDetailModal';
import Articles from '../components/Articles';
import {IArticle} from '../models';

interface IRouteProps {
    id: string;
}

interface IOwnProps {}

interface IState {
    articles: IArticle[];
    currentArticle: IArticle | null;
    showModal: boolean;
}

type TProps = IOwnProps & RouteComponentProps<IRouteProps>;

@InitialPropsDecorator
class ArticleListPage extends React.Component<TProps, IState> {
  static async getInitialProps({ store, props }: any) {
    fetchArticles(props.match.params.id)(store.dispatch);

    return {};
  }

  state: IState = {
    articles: [],
    currentArticle: null,
    showModal: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleReadArticle = (currentArticle: IArticle) => {
    this.setState({ currentArticle, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { articles, currentArticle, showModal } = this.state;
    const category = articles?.[0]?.source.name;

    return (
      <div>
        {showModal && currentArticle && (
          <ArticleDetailModal article={currentArticle} onClose={this.handleCloseModal} />
        )}
        <div className="row">
          <div className="section">
            <h3>{category}</h3>
          </div>
          <div className="divider" />
          <div className="section">
            <div className="row">
              <Articles onReadArticle={this.handleReadArticle} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleListPage;
