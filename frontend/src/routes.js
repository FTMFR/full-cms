import Index from "./Pages/Index/Index";
import CourseInfo from "./Pages/CourseInfo/CourseInfo";
import Category from "./Pages/Category/Category";
import Article from "./Pages/Article/Article";
import Courses from "./Pages/Courses/Courses";
import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/Register/Register";
import AllArticle from "./Pages/AllArticle/AllArticle";
import Popular from "./Pages/Popular/Popular";
import Presell from "./Pages/PreSell/PreSell";
import Contact from "./Pages/Contact/Contact";
import Search from "./Pages/Search/Search";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";
import Users from "./Pages/AdminPanel/Users/Users";
import AdminCourses from "./Pages/AdminPanel/AdminCourses/AdminCourses";
import AdminArticle from "./Pages/AdminPanel/AdminArticle/AdminArticle";
import Menus from "./Pages/AdminPanel/Menus/Menus";
import AdminCategory from "./Pages/AdminPanel/AdminCategory/AdminCategory";
import AdminContact from "./Pages/AdminPanel/AdminContact/AdminContact";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/course-info/:courseName", element: <CourseInfo /> },
  { path: "/category-info/:categoryName/:page", element: <Category /> },
  { path: "/article-info/:articleName", element: <Article /> },
  { path: "/articles/:page", element: <AllArticle /> },
  { path: "/courses/:page", element: <Courses /> },
  { path: "/popularCourses/:page", element: <Popular /> },
  { path: "/presellCourses/:page", element: <Presell /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/contact", element: <Contact /> },
  { path: "/search/:value", element: <Search /> },
  {
    path: "/p-admin",
    element: <AdminPanel />,
    children: [
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "articles", element: <AdminArticle /> },
      { path: "category", element: <AdminCategory /> },
      { path: "menus", element: <Menus /> },
      { path: "contact", element: <AdminContact /> },
    ],
  },
];

export default routes;
