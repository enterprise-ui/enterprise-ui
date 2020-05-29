import ArticleListPage from './pages/ArticleListPage';
import HomePage from './pages/HomePage';

export const routes = [
    {
        component: HomePage,
        path: '/news',
        exact: true,
    },
    {
        component: ArticleListPage,
        path: '/news/:id',
    },
];
