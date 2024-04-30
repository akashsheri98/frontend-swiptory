// import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import{Routes,Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

//components and pages
import Navbar from './components/common/Navbar/Navbar';
import Modal from './components/common/Modal/Modal';
import Auth from './components/auth/Auth';
import AddStory from './components/story/StoryForm/StoryAdd';
import EditStory from './components/story/StoryForm/StoryEdit';
import ViewStory from './components/story/StoryDetail/StoryDetail';
import Bookmarks from './pages/Bookmarks';
import UserStories from './pages/UserStories';
import { REGISTER, LOGIN, ADD_STORY , EDIT_STORY} from './constants';

import NotFound from '../src/components/common/NotFound/NotFound';

import Home from './pages/Home';
function App() {
  const { modalContent } = useSelector((state) => state.modal);

  return (
    <>
      <Navbar/>

      {modalContent === REGISTER && (
        <Modal>
          <Auth/>
        </Modal>
      )}
      {modalContent === LOGIN && (
        <Modal>
          <Auth/>
        </Modal>
      )}
      {modalContent === ADD_STORY && (
        <Modal>
          <AddStory/>
        </Modal>
      )}
      {modalContent === EDIT_STORY && (
        <Modal>
          <EditStory/>
        </Modal>
      )}
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route
          path="/story/:id"
          element={
            <Modal>
              <ViewStory />
            </Modal>
          }
        />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/my/stories" element={<UserStories />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </>
  )
}

export default App
