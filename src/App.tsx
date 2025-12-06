import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Post from "./pages/Post/Post"
import PostForm from "./pages/PostForm/PostForm"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post-form" element={<PostForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
