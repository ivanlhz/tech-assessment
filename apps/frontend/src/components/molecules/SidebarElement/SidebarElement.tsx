import { Icon } from "../../atoms";
import {SidebarElementWrapper} from "./SidebarElement.styled";
import {SidebarElementProps} from "./SidebarElement.types";

export const SidebarElement: React.FC<SidebarElementProps> = ({ title, icon, to }) => {
    return (
        <SidebarElementWrapper to={to}>
            <Icon name={icon} size={24} />
            <span>{title}</span>
        </SidebarElementWrapper>
    )
}
