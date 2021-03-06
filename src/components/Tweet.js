import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TweetCard from "./TweetCard";

async function getTweet(id) {
  return fetch(`${process.env.REACT_APP_API_URL}/tweets?id=${id}`).then((res) =>
    res.json()
  );
}

export default function Tweet({ user }) {
  const [tweet, setTweet] = useState(null);

  let { id } = useParams();

  // console.log(id);
  // useEffect(() => {
  //   getTweet(id).then((tweet) => {
  //     setTweet(tweet);
  //   });
  // }, []);

  const fetchTweets = (id) => {
    getTweet(id).then((tweet) => {
      setTweet(tweet);
    });
  };

  useEffect(() => {
    fetchTweets(id);
  }, [id]);

  console.log(tweet);
  if (!tweet) {
    return <div>Loading..</div>;
  }
  // console.log(user);
  return (
    <div>
      {tweet.map((tweet) => (
        <TweetCard tweet={tweet} user={user} key={tweet.id} />
      ))}
    </div>
  );
}
