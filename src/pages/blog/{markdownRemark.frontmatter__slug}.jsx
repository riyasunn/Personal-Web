import React, { useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout } from '@components';
import { Helmet } from 'react-helmet';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import PropTypes from 'prop-types';

const StyledHeader = styled.header`
  text-align: center;
  h1 {
    font-size: var(--fz-heading);
  }
  h2 {
    margin: 30px auto 30px auto;
    color: var(--black);
    font-size: var(--fz-m);
    font-weight: normal;
  }
  
`;

const StyledBlogContainer = styled.div`
  line-height: 50px;
  margin: 0 20px;
  text-align: justify;
`;

const BlogPostTemplate = ({ location, data }) => {
  const { markdownRemark } = data; 
  const { frontmatter, html } = markdownRemark;

  const revealTitle = useRef(null);
  const revealBlog = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealBlog.current, srConfig(200, 0));
  }, []);

  return (
    <Layout location={location}>
      <Helmet title="Blogs" />
      
      <main>
        <StyledHeader ref={revealTitle}>
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
        </StyledHeader>

        <StyledBlogContainer ref={revealBlog}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </StyledBlogContainer>
      </main>
    </Layout>
  );
};
BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date
        slug
        title
      }
    }
  }
`;
