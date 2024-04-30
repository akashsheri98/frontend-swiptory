import React from "react";
import styles from "./Bookmarks.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBookmarks } from "../../../api/storyApi";
import { useSelector } from "react-redux";
import  Story  from "../../story/StoryCard/StoryCard";
import Button from "../../common/Button/Button";
import Loader from "../../common/Loader/Loader";

const Bookmarks = () => {
    const navigate = useNavigate();
  const { bookmarks ,bookmarksLoading} = useSelector((state) => state.story);
  const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarks(userId));
  }, []);

  if (!isAuthenticated) {
    return (
      <h1
      
        className={styles.heading}
      >
        Please Login to see your Bookmarks
      </h1>
    );
  }

  if(bookmarksLoading){
    return <Loader></Loader>
  }

  return (
    <div>
      <button
        style={{ marginTop: "1rem" , marginLeft: "1rem" , width : "5rem" , height : "2rem" , color : "white" , backgroundColor : "#73abff" , borderRadius : "0.5rem" , border : "none" }}
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h1 
      className={styles.heading}
      >Your Bookmarks</h1>
      <div 
      className={styles.bookmarks}
      
      >
        {bookmarks &&
          bookmarks.map((bookmark, index) => (
            <Story story={bookmark} key={bookmark._id} />
          ))}

        {bookmarks.length === 0 && (
          <div className={styles.no_bookmarks}>
          
          <h1 className={styles.no_bookmark_heading}>You have no bookmarks!</h1>
          <Button text={"Go to Home"}  myFunction={() => navigate("/")} />
          </div>
            )}
      </div>
    </div>
  );
};

export default Bookmarks;
