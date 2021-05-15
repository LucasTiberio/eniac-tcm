import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Inter', sans-serif;
    
    transition: all 0.1s linear;
  }

  body {
    background: ${({ theme }): string => theme.bodyBackground};
  }

  span, h1, h2, h3, h4, h5, h6, p {
    color: ${({ theme }): string => theme.fontColor};
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    color: ${({ theme }): string => theme.fontColor} !important;
    box-shadow: 0 0 0px 1000px ${({ theme }): string => theme.bodyBackground} inset !important;
    -webkit-box-shadow: 0 0 0px 1000px ${({ theme }): string =>
      theme.bodyBackground} inset !important;
  }

  //Material-UI colors overwrite. Important used to bypass material-ui default theme
  input {
    color: ${({ theme }): string => theme.fontColor} !important; 
  }
  svg {
    fill: ${({ theme }): string => theme.fontColor} !important; 
  }
  fieldset {
    border-color: ${({ theme }): string => theme.fontColor} !important;
  }
  .MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-outlined {
    color: ${({ theme }): string => theme.fontColor} !important;
  }
  .MuiButton-label {
    color: ${({ theme }): string => theme.mainColor} !important;
  }
`;
