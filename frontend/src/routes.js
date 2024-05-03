import Index from "./Pages/Index/Index";
import CourseInfo from "./Pages/CourseInfo/CourseInfo";
import Category from "./Pages/Category/Category";
import Article from "./Pages/Article/Article";
import Courses from "./Pages/Courses/Courses";



const routes = [
    {path: '/', element: <Index />},
    {path: '/course-info/:courseName', element: <CourseInfo />},
    {path: '/cateogory-info/:categoryName', element: <Category />},
    {path: '/article-info/:articleName', element: <Article />},
    {path: '/courses', element: <Courses />},
];

export default routes;
