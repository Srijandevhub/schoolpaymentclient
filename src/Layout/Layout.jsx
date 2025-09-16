import Sidebar from "../components/Sidebar"

const Layout = ({ children, menuActive = "dashboard" }) => {
    return (
        <div className="d-flex p-3" style={{ minHeight: '100dvh' }}>
            <div className="main">
                <Sidebar menuActive={menuActive}/>
            </div>
            <main className="flex-grow-1" style={{ overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    )
}

export default Layout