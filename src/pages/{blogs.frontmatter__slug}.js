import React from 'react';
import styled from 'styled-components';
import { Layout } from '@components';
import PropTypes from 'prop-types';

const StyledContainer = styled.div`
  color: red;
  font-size: var(--fz-heading);
`;

const TestPage = ({ location }) => (
  <Layout location={location}>
    <StyledContainer>Hi asdfasgag</StyledContainer>
  </Layout>
);

TestPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default TestPage;
