import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const BlogPageMain = styled.main`
  max-width: ${props => props.theme.contentWidth};
  padding: 0 2rem 2rem;
  margin: 0 auto;
`;

const BlogNav = styled.div`
  padding: 1rem;
  background: black;
  color: white;
`;

const BlogArchive = props => {
  const [posts, setPosts] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);

  async function getPosts() {
    await fetch(
      `${process.env.REACT_APP_HOME}/wp-json/wp/v2/posts?page=${page}`
    )
      .then(res => {
        // Use WP-provided header to indicate the number of pages of blog posts we have
        setNumPages(Number(res.headers.get('x-wp-totalpages')));
        return res.json();
      })
      .then(j => setPosts(j));
  }

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
    getPosts();
  }, [page]);

  return (
    <BlogPageMain>
      {posts &&
        posts.map(post => (
          <div key={`post${post.id}`}>{post.title.rendered}</div>
        ))}
      <BlogNav>
        <button onClick={prevPosts}>Prev</button>
        <button onClick={nextPosts}>Next</button>
      </BlogNav>
    </BlogPageMain>
  );
};

export default BlogArchive;
