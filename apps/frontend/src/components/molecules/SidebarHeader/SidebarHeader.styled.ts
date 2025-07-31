import styled from "styled-components";

export const SideBarHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
    padding: 0 ${({ theme }) => theme.spacing[4]};
`;

export const ActionsWrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing[2]};
    margin-left: auto;
`;