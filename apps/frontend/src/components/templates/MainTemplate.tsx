import { Sidebar } from "../organisms/Sidebar";
import { MainTemplateWrapper } from "./MainTemplate.styled";

export const MainTemplate = ({ children }: { children: React.ReactNode }) => {
    return (
        <MainTemplateWrapper>
            <Sidebar/>
            {children}
        </MainTemplateWrapper>
    );
};