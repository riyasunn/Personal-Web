import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledBlogsSection = styled.section`
  display: grid;
  align-items: center;
  flex-direction: row;

  .blogs-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    /* grid-template-columns: repeat(auto-fill, mixmax(300px, 1fr)); */
    grid-gap: 20px;
    margin-top: 50px;
  }
  .more-button {
    ${({ theme }) => theme.mixins.bigButton};
    margin: 80px auto 0;
  }
`;

const StyledBlog = styled.li`
  position: relative;
  cursor: pointer;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .blog-inner {
        transform: translateY(-7px);
        transition-duration: 300ms;
      }
    }
  }

  .blog-inner {
    /* ${({ theme }) => theme.mixins.flexBetween}; */
    &:hover,
    &:focus {
      box-shadow: 0 10px 30px -15px var(--navy-shadow);
    }
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    .blog-title {
      margin-bottom: 15px;
      font-size: var(--fz-xxl);
      font-weight: bold;
      &:hover,
      &:focus {
        color: var(--brown);
      }
    }
  }
`;

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      blogs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              date
              slug
            }
            excerpt
          }
        }
      }
    }
  `);

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealBlogs = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealBlogs.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const blogs = data.blogs.edges.filter(({ node }) => node);
  const firstSix = blogs.slice(0, GRID_LIMIT);
  const blogsToShow = showMore ? blogs : firstSix;

  const blogInner = node => {
    const { frontmatter, excerpt } = node;
    const { title, slug } = frontmatter;
    return (
      <div className="blog-inner">
        <div className="blog-img"></div>
        <div className="blog-right">
          <Link className="blog-title" to={`/blog/${slug}`}>
            {title}
          </Link>
          <div className="blog-excerpts">{excerpt}</div>
        </div>
      </div>
    );
  };
  return (
    <StyledBlogsSection id="blogs">
      <h2 className="numbered-heading" ref={revealTitle}>
        My Blogs
      </h2>

      <ul className="blogs-grid">
        {prefersReducedMotion ? (
          <>
            {blogsToShow &&
              blogsToShow.map(({ node }, i) => <StyledBlog key={i}>{blogInner(node)}</StyledBlog>)}
          </>
        ) : (
          <TransitionGroup component={null}>
            {blogsToShow &&
              blogsToShow.map(({ node }, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledBlog
                    key={i}
                    ref={el => (revealBlogs.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    {blogInner(node)}
                  </StyledBlog>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>

      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? 'Less' : 'More'}
      </button>
    </StyledBlogsSection>
  );
};

export default Blog;
