import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Listbox, ListboxOption } from "@reach/listbox";
import "@reach/listbox/styles.css";
import { AiOutlineRetweet } from "react-icons/ai";
import { IoShareOutline } from "react-icons/io5";
import { FaRegHeart, FaRegComment } from "react-icons/fa";

import styles from "./TweetCard.module.css";

function TweetCard({ tweet, user, fetchTweets }) {
  const [likeCount, setLikeCount] = useState(tweet.likeCount);
  // console.log(tweet.likecount);
  const handleDelete = () => {
    const deleteTweet = {
      tweetId: tweet.id,
      userId: user.id,
    };
    console.log(deleteTweet);
    try {
      const response = fetch(`${process.env.REACT_APP_API_URL}/tweet`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteTweet),
      });
      if (response.status === 200) {
        fetchTweets();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likeTweet = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      tweetId: tweet.id,
      userId: user.id,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (response.status === 201) {
        // console.log(likeCount);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(likeCount);
  return (
    <div>
      <div className={styles.card}>
        <Link className={styles.tweetCard} to={`/tweet/${tweet.id}`}>
          <div className={styles.userNameId}>
            <div className={styles.name}>{user.name}</div>
            <div className={styles.userName}>@{user.username} </div>
            <div className={styles.options}>
              <Listbox defaultValue="...">
                {" "}
                <ListboxOption value="...">...</ListboxOption>{" "}
                <ListboxOption onClick={handleDelete} value="delete">
                  delete
                </ListboxOption>{" "}
              </Listbox>
            </div>
          </div>
          <div className={styles.tweetText}>{tweet.text}</div>
          <div className={styles.buttons}>
            <button className={styles.tweetButtons}>
              <FaRegComment />
            </button>
            <button className={styles.tweetButtons}>
              <AiOutlineRetweet />
            </button>
            <button className={styles.tweetButtons} onClick={likeTweet}>
              <FaRegHeart />

              {likeCount}
            </button>
            <button className={styles.tweetButtons}>
              <IoShareOutline />
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TweetCard;
