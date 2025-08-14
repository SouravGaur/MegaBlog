import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPost() {
  const [posts, setPosts] = useState();
  useEffect(() => {}, []);
  appwriteService
    .getPost([])
    .then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className="w-ful py-8">
      <Container>
        <div className="flex flex-wrap">
          {" "}
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post}></PostCard>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
