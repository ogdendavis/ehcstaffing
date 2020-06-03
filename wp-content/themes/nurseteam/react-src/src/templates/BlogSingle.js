import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

const PostPageMain = styled.main`
  max-width: ${props => props.theme.contentWidth};
  margin: 0 auto 2rem;
  overflow: hidden;

  img {
    max-width: 100%;
  }

  @media only screen and (max-width: calc(${props =>
    props.theme.contentWidth} + 10vw)) {
    max-width: 90vw;
  }
`;

const GoBack = styled(Link)`
  display: block;
  margin-top: 1.5rem;
  padding-top: 0.5rem;
  font-size: 0.8rem;
  font-style: italic;
  border-top: 1px solid ${props => props.theme.textColor};
`;

const BlogSingle = props => {
  const postID = useLocation().pathname.replace('/articles/', '');
  const [post, setPost] = useState(false);

  useEffect(() => {
    async function getPost() {
      await fetch(`${process.env.REACT_APP_HOME}/wp-json/wp/v2/posts/${postID}`)
        .then(res => res.json())
        .then(j => setPost(j));
    }
    getPost();
  }, [postID]);

  return (
    <PostPageMain>
      {post && (
        <>
          <h1>{post.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </>
      )}
      <GoBack to="/articles">&lt;&lt; Back to blog</GoBack>
    </PostPageMain>
  );
};

export default BlogSingle;
