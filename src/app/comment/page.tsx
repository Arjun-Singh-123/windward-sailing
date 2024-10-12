"use client";
import React, { useState } from "react";

const CommentSection = () => {
  const [comments, setComments] = useState([
    {
      id: "1",
      text: "This is a great post!",
      replies: [],
    },
  ]);

  const addComment = (text, parentId) => {
    const newComment = {
      id: Math.random().toString(),
      text,
      replies: [],
    };

    if (parentId) {
      // Add to replies of the parent comment
      setComments((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === parentId) {
            return { ...comment, replies: [...comment.replies, newComment] };
          }
          return comment;
        });
      });
    } else {
      // Add to top-level comments
      setComments((prevComments) => [...prevComments, newComment]);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <CommentList comments={comments} addComment={addComment} />
    </div>
  );
};

export default CommentSection;
const CommentList = ({ comments, addComment }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.text}</p>
          <button onClick={() => addComment(prompt("Reply:"), comment.id)}>
            Reply
          </button>
          {comment.replies && comment.replies.length > 0 && (
            <CommentList comments={comment.replies} addComment={addComment} />
          )}
        </li>
      ))}
    </ul>
  );
};
