import SidebarMenu from './sidebar-menu'
import MainContent from './main-content'

export default function MainLayout() {

    return (
        <div className='flex mt-5 sm:space-x-4 justify-between'  >
            <SidebarMenu />

            <MainContent />
        </div>
    )
}
