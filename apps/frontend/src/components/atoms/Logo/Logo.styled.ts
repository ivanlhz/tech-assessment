import styled from "styled-components";

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[2]};
`;

export const LogoText = styled.h1`
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: ${({ theme }) => theme.colors.text.primary};
`;
