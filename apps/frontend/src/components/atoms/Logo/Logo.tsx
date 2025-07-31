import { Icon } from "../Icon";
import { LogoText, LogoWrapper } from "./Logo.styled";

export const Logo: React.FC = () => {
    return (
        <LogoWrapper>
            <Icon name="logo" size={24} />
            <LogoText>Ucademy</LogoText>
        </LogoWrapper>
    )
}