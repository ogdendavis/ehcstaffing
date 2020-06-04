import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/Button';

const BlogPageMain = styled.main`
  max-width: ${props => props.theme.contentWidth};
  margin: 0 auto 2rem;

  @media only screen and (max-width: calc(${props =>
    props.theme.contentWidth} + 10vw)) {
    max-width: 90vw;
  }
`;

const PostTease = styled(Link)`
  display: block;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  text-decoration: none;
  color: ${props => props.theme.textColor};
  transition: background-color 0.5s ease;

  &:hover {
    background-color: ${props => props.theme.primaryColor + `55`};
  }

  h2 {
    margin-top: 0;
  }

  p {
    font-size: 0.8rem;
    font-style: italic;
  }
`;

const BlogNav = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;

  .inactive {
    background: gray;
    color: black;
    cursor: default;
  }
`;

const BlogArchive = props => {
  const [posts, setPosts] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);

  const prevPosts = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPosts = () => {
    if (page < numPages) {
      setPage(page + 1);
    }
  };

  // Get the posts on load, and when the page changes
  useEffect(() => {
    async function getPosts() {
      await fetch(
        `${process.env.REACT_APP_HOME}/wp-json/wp/v2/posts?page=${page}&_fields=id,title,excerpt`
      )
        .then(res => {
          // Use WP-provided header to indicate the number of pages of blog posts we have
          setNumPages(Number(res.headers.get('x-wp-totalpages')));
          return res.json();
        })
        .then(j => setPosts(j));
    }
    getPosts();
  }, [page]);

  return (
    <BlogPageMain>
      {posts &&
        posts.map(post => (
          <PostTease to={`/articles/${post.id}`} key={`post${post.id}`}>
            <h2>{post.title.rendered}</h2>
            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </PostTease>
        ))}
      <BlogNav>
        <Button
          inactive={page === 1}
          handleClick={prevPosts}
          text="&lt; Prev"
        />
        <Button
          inactive={page === numPages}
          handleClick={nextPosts}
          text="Next &gt;"
        />
      </BlogNav>
    </BlogPageMain>
  );
};

export default BlogArchive;
