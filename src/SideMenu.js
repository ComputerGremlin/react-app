import SideMenuItem from "./SideMenuItem";

const SideMenu = (props) => {
	const createSideMenuItem = (list) => {
        console.log("createSideMenuItem -> "+JSON.stringify(list));
		return(
            <SideMenuItem
                number={list.id} 
                key={list.id}
                selectList={selectList}
            />
		);
	};

    const selectList = props.selectList;

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5">F5</span>
            </a>
            <ul className="nav nav-pills flex-column mb-auto">
                {props.myLists.map((list) => createSideMenuItem(list))}
            </ul>
            <hr/>
        </div>
    );
};

export default SideMenu;
