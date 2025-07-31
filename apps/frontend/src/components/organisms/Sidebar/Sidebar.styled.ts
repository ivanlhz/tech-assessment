import styled from "styled-components";

export const SidebarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    min-height: 100vh;
    padding: ${({ theme }) => theme.spacing[10]} 0};
    border-right: 1px solid ${({ theme }) => theme.colors.border.sideBar};
    width: 250px;
`;