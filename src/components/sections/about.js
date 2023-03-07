import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;
`;

const StyledText = styled.div`
  text-align: justify;
  line-height: 50px;
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(4, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 30px 0 0 0;
    overflow: hidden;
    list-style: none;
    @media (max-width: 858px) {
      grid-template-columns: repeat(2, minmax(140px, 200px));
    }

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--yellow);
        font-size: var(--fz-sm);
        line-height: 50px;
      }
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'JavaScript',
    'React',
    'Node.js',
    'GraphQL',
    'Firebase',
    'Stripe',
    'Styled-components',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Riya and I enjoy exploring the internet and learning about different
              technologies.
            </p>
            <p>
              Previously, I worked as an accounts assistant for around 4 years. However, I became
              curious about web development and I am keen to learn how to build websites with great
              user experiences. In 2020, my family and I had a fantastic year as our first baby was
              born and during the COVID lockdowns, I decided to stay at home and take care of my
              family. From 2022, I focused on systematically studying front-end technologies and
              completing projects.
            </p>
            <p>
              Currently, I am looking forward to joining a team and working on more exciting
              projects.
            </p>
            <p>Here are technology stacks I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default About;
