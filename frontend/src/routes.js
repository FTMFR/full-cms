import Index from "./Pages/Index/Index";
import CourseInfo from "./Pages/CourseInfo/CourseInfo";
import Category from "./Pages/Category/Category";
import Article from "./Pages/Article/Article";
import Courses from "./Pages/Courses/Courses";
import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/Register/Register";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/category-info/:categoryName/:page", element: <Category /> },
  { path: "/article-info/:articleName", element: <Article /> },
  { path: "/courses/:page", element: <Courses /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export default routes;
