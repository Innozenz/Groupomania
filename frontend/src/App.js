import Header from './components/partials/Header'
import Footer from './components/partials/Footer'
import SignIn from './components/pages/SignIn'
import BoardHeader from "./components/partials/BoardHeader";
import PostForm from "./components/posts/PostForm"
import PostMain from "./components/posts/PostMain";
import Main from "./components/Main";

function App() {
    return (
        <div>
            <Header/>
            <Main />
            {/*<BoardHeader />*/}
            {/*<PostForm />*/}
            {/*<PostMain />*/}
            {/*<Footer/>*/}
        </div>
    )
        ;
}

export default App;
