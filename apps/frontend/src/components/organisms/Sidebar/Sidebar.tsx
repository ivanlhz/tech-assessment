import { SidebarElement } from "../../molecules/SidebarElement";
import { SideBarHeader } from "../../molecules/SidebarHeader";
import { SidebarWrapper } from "./Sidebar.styled";


export const Sidebar: React.FC = () => {
    return (
        <SidebarWrapper>
           <SideBarHeader />
           <SidebarElement isActive title="Alumnos" icon="graduation-cap" />
        </SidebarWrapper>
    )
}