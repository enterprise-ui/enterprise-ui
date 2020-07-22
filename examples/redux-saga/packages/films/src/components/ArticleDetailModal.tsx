import React from 'react';

import {IArticle} from '../models';

interface IOwnProps {
    article: IArticle;
    onClose: () => void;
}

const styleAttributes: React.CSSProperties = {
    zIndex: 1003,
    display: 'block',
    opacity: 1,
    top: 10,
    width: '95vw',
    height: '95vh',
    maxHeight: '95vh',
};

const ArticleDetailModal: React.FunctionComponent<IOwnProps> = ({article, onClose}) => (
    <React.Fragment>
        <div id="modal1" className="modal" style={styleAttributes}>
            <div className="modal-footer">
                <button type="button" onClick={onClose} className="modal-close waves-effect waves-green btn red">
                    Close
                </button>
            </div>
            <div className="modal-content">
                <h4>{article.title}</h4>
                <img className="responsive-img" src={article.urlToImage} alt={article.title} />
                <p>{article.description}</p>
                <p>{article.content}</p>
                <div className="divider" />
                <div className="section">
                    <a href={article.url} className="waves-effect waves-light btn" target="_blank" rel="noopener noreferrer">
                        Full Article
                    </a>
                </div>
            </div>
        </div>
        <div role="presentation" onClick={onClose} className="modal-overlay" style={{zIndex: 1002, display: 'block', opacity: 0.5}} />
    </React.Fragment>
);

export default ArticleDetailModal;
