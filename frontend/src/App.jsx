import React from 'react'
import { Routes, Route } from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import BookMark from './pages/BookMark';
import BookMarkList from './pages/BookMarkList';
import ProtectedLayout from './components/ProtectedLayout';
import PublicRoute from './components/PublicRoute';

import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/bookmark" element={<BookMark />}></Route>
          <Route path="/edit-bookmark/:id" element={<BookMark />}></Route>
          <Route path='/bookmarklist' element={<BookMarkList />}></Route>
        </Route>
      </Routes>

    </div >
  )
}

export default App;
