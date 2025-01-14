import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Blog } from '@components';

const StyledMainContainer = styled.main`
  /* counter-reset: section; */
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <Blog />
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
