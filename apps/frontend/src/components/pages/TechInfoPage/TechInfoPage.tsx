import { TechInfoPageWrapper } from "./TechInfoPage.styled";


export const TechInfoPage: React.FC = () => {
  return (
    <TechInfoPageWrapper>
      <h1>Technical Assessment Information</h1>
      <p>This section explains the technical assessment.</p>
      <p>Here are the steps that were taken to implement the requested features:</p>
      <ul>
        <li>Setup of the project structure with Nx.</li>
        <li>Creation of a frontend application with React, TypeScript, and Vite.</li>
        <li>Creation of a backend application with NestJS.</li>
        <li>Implementation of user management features (CRUD).</li>
        <li>Styling with styled-components.</li>
        <li>Unit and integration testing.</li>
      </ul>
    </TechInfoPageWrapper>
  );
};
