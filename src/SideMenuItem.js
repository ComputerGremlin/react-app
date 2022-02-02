const SideMenuItem = (props) => {
    return (
        <li className="nav-item">
            <button
               className="nav-link text-white" 
               onClick={() => props.selectList(props.number)}
            >
                Item {props.number}
            </button>
        </li>
    );
};

export default SideMenuItem;
