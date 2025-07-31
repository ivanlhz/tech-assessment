import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SidebarElementWrapper = styled(NavLink)`
    text-decoration: none;
    display: flex;
    gap: ${({ theme }) => theme.spacing[2]};
    padding: ${({ theme }) => theme.spacing[4]};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: ${({ theme }) => theme.colors.background.card};
    color: ${({ theme }) => theme.colors.text.primary};

    &.active {
        background-color: ${({ theme }) => theme.colors.primary.main};
        color: ${({ theme }) => theme.colors.primary.contrastText};
    }
    &:hover {
        background-color: ${({ theme }) => theme.colors.primary.main};
        color: ${({ theme }) => theme.colors.primary.contrastText};
    }
`;
