import ArticleListPage from './pages/ArticleListPage';
import HomePage from './pages/HomePage';

console.log('Routes is initialized');

export const routes = [
    {
        component: HomePage,
        path: '/films',
        exact: true,
    },
    {
        component: ArticleListPage,
        path: '/films/:id',
    },
];
