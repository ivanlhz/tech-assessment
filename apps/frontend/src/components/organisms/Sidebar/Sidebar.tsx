import { SidebarElement } from "../../molecules/SidebarElement";
import { SideBarHeader } from "../../molecules/SidebarHeader";
import { SidebarWrapper } from "./Sidebar.styled";


export const Sidebar: React.FC = () => {
    return (
        <SidebarWrapper>
           <SideBarHeader />
           <SidebarElement to="/" title="Users" icon="graduation-cap" />
           <SidebarElement to="/tech-info" title="Tech Info" icon="circle-question" />
        </SidebarWrapper>
    )
}