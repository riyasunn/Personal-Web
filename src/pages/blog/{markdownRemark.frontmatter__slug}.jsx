import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout } from '@components';

export default function BlogPostTemplate({
  location,
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    // <div>
    //   <div>
    //     <h1>{frontmatter.title}</h1>
    //     <h2>{frontmatter.date}</h2>
    //     <div dangerouslySetInnerHTML={{ __html: html }} />
    //   </div>
    // </div>
    <Layout location={location}>
      <div>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        # date(formatString: "MMMM DD, YYYY")
        date
        slug
        title
      }
    }
  }
`;
