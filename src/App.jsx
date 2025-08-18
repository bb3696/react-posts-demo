import React from "react";
import{ Routes, Route } from "react-router-dom";
import PostDetails from "./pages/PostDetails";
import Home from "./pages/Home";


function App(){
  return(
    <>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
      </Routes>
    </div>
    </>
  )
}

export default App;