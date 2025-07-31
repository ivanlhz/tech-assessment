import { Icon } from "../../atoms";
import { Logo } from "../../atoms/Logo";
import { ActionsWrapper, SideBarHeaderWrapper } from "./SidebarHeader.styled";

export const SideBarHeader: React.FC = () => {
    return (
        <SideBarHeaderWrapper>
            <Logo />
            <ActionsWrapper>
                <Icon name="bell" size={24} />
                <Icon name="circle-question" size={24} />
            </ActionsWrapper>
        </SideBarHeaderWrapper>
    )
}