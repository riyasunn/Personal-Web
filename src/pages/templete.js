// import { graphql } from 'gatsby';
// import React, { useRef, useEffect } from 'react';
// import { Helmet } from 'react-helmet';
// import PropTypes from 'prop-types';
// import { Layout } from '@components';
// import styled from 'styled-components';
// import { srConfig } from '@config';
// import sr from '@utils/sr';
// import { usePrefersReducedMotion } from '@hooks';

// const StyledBlogContainer = styled.div``;

// const BlogPage = ({ data }) => {
//   const { frontmatter, html } = data.allMarkdownRemark.nodes;

//   const revealTitle = useRef(null);
//   const revealBlog = useRef([]);
//   const prefersReducedMotion = usePrefersReducedMotion();

//   useEffect(() => {
//     if (prefersReducedMotion) {
//       return;
//     }

//     sr.reveal(revealTitle.current, srConfig());
//     revealBlog.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 10)));
//   }, []);

//   return (
//     <Layout>
//       <Helmet title="Blogs" />

//       <main>
//         <header ref={revealTitle}>
//           <h1 className="big-heading">{frontmatter.title}</h1>
//           <p className="date">{frontmatter.date}</p>
//         </header>

//         <StyledBlogContainer ref={revealBlog}>
//           <div className="blog-detail" dangerouslySetInnerHTML={{ __html: html }} />
//         </StyledBlogContainer>
//       </main>
//     </Layout>
//   );
// };

// BlogPage.propTypes = {
//   data: PropTypes.object.isRequired,
// };
// export default BlogPage;

// export const pageQuery = graphql`
//   {
//    allMarkdownRemark(
//       filter: { fileAbsolutePath: { regex: "/content/blogs/" } }
//       sort: { order: ASC, fields: frontmatter___date }
//     ) {
//       edges {
//         node {
//           frontmatter {
//             date
//             slug
//             title
//           }
//           html
//         }
//       }
//     }
//   }
// `;
