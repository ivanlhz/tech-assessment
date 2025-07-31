import { IconProps } from "../../atoms";

export interface SidebarElementProps {
    title: string;
    icon: IconProps['name'];
    isActive?: boolean;
}
    