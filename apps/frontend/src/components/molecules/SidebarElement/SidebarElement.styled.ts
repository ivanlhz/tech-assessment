import styled from "styled-components";

export const SidebarElementWrapper = styled.div<{ isActive: boolean }>`
    display: flex;
    gap: ${({ theme }) => theme.spacing[2]};
    padding: ${({ theme }) => theme.spacing[4]};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: ${({ isActive, theme }) => isActive ? theme.colors.primary.main : theme.colors.background.card};
    color: ${({ isActive, theme }) => isActive ? theme.colors.primary.contrastText : theme.colors.text.primary};
    &:hover {
        background-color: ${({ theme }) => theme.colors.primary.main};
        color: ${({ theme }) => theme.colors.primary.contrastText};
    }
`;
