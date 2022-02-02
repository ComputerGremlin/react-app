import Button from 'react-bootstrap/Button';

const SideMenuItem = (props) => {
    return (
        <li className="nav-item">
            <button
               className="nav-link text-white" 
               onClick={() => props.selectList(props.number)}
            >
                {props.name}
            </button>
            <Button 
                variant="dark" 
                onClick={() => props.renameList(props.number)}
            >
				Renombrar Lista
			</Button>
        </li>
    );
};

export default SideMenuItem;
