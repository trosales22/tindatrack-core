import Wrapper from "./Wrapper";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
}

export default Layout;