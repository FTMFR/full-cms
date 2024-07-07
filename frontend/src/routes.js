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
import Session from "./Pages/AdminPanel/Session/Session";
import Sessions from "./Components/Session/Sessions";
import Comments from "./Pages/AdminPanel/Comments/Comments";
import Offs from "./Pages/AdminPanel/Offs/Offs";
import PAdminIndex from "./Pages/AdminPanel/Index/Index";

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
  { path: "/:courseName/:sessionID", element: <Sessions /> },

  {
    path: "/p-admin",
    element: <AdminPanel />,
    children: [
      { path: "", element: <PAdminIndex /> },
      { path: "users", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "articles", element: <AdminArticle /> },
      { path: "category", element: <AdminCategory /> },
      { path: "menus", element: <Menus /> },
      { path: "comments", element: <Comments /> },
      { path: "offs", element: <Offs /> },
      { path: "contact", element: <AdminContact /> },
      { path: "session", element: <Session /> },
    ],
  },
];

export default routes;
