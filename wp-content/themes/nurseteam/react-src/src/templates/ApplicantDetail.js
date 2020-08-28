import React from 'react';
import styled from 'styled-components';

const ApplicantDetailPageMain = styled.main`
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

const AirtableFrame = styled.iframe`
  background: transparent;
  border: 1px solid #ccc;
  width: 100%;
  min-height: 80vh;
  margin-top: 2rem;
`;

const ApplicantDetail = () => (
    <ApplicantDetailPageMain>
      <AirtableFrame
        titile="Applicant Detail Form"
        className="airtable-embed"
        src="https://airtable.com/embed/shrsiHBxhGuvLHTEz?backgroundColor=green"
        frameborder="0" />
    </ApplicantDetailPageMain>
  );

export default ApplicantDetail;
