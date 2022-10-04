const Sidebar = () => {
    return (
        <div className="md:hidden">
            <ul className="grid justify-center items-center text-center">
                <li className="p-4"><a href="">Tracker</a></li>
                <li className="p-4"><a href="">Log in</a></li>
                <li className="p-4"><a href="">Create Your Account</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;