import Index from "./Pages/Index/Index";
import CourseInfo from "./Pages/CourseInfo/CourseInfo";
import Category from "./Pages/Category/Category";
import Article from "./Pages/Article/Article";



const routes = [
    {path: '/', element: <Index />},
    {path: '/course-info/:courseName', element: <CourseInfo />},
    {path: '/cateogory-info/:categoryName', element: <Category />},
    {path: '/article-info/:articleName', element: <Article />},
];

export default routes;
