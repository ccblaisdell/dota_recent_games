import React from "react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: between;
  font-family: monospace;
  min-width: 100%;
  flex-direction: column;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

export const Col = styled.div`
  margin: 0 1rem;
`;

export const Title = styled.h1`
  font-family: monospace;
  font-size: 16px;
`;

export const Desc = styled.p`
  font-family: monospace;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  max-width: 60em;
`;

export const Styles = () => (
  <style jsx global>{`
    body {
      background-color: hsl(200, 15%, 10%);
      color: #fff;
      font-family: monospace;
    }
    a {
      color: hsl(200, 70%, 65%);
    }
    a:visited {
      color: hsl(200, 40%, 50%);
    }
    a:hover {
      color: hsl(200, 100%, 50%);
    }
    a:active {
      color: hsl(200, 100%, 40%);
    }
    }
  `}</style>
);
