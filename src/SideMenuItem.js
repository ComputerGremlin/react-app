import Button from 'react-bootstrap/Button';

const SideMenuItem = (props) => {

    const getNumberOfCheckedItems = () => {
        let numberOfCheckedItems = 0;
        props.list.forEach((item) => {
            if (item.checked) {
                numberOfCheckedItems++;
            }
        });
        return numberOfCheckedItems;
    };

    return (
        <li className="nav-item">
            <div className={'nav-link d-flex ' + (props.selectedList === props.number ? 'active' : '')}>
                <span
                    className="me-auto"
                    variant="light" 
                    onClick={() => props.selectList(props.number)}
                >
                    {props.name} {getNumberOfCheckedItems()}/{props.list.length}
                </span>
                <Button 
                    className="ms-5"
                    variant="secondary" 
                    onClick={() => props.renameList(props.number)}
                    size="sm"
                >
                    <i className="bi-pencil-square"></i>
                </Button>
                <Button 
                    className="ms-1"
                    variant="danger" 
                    onClick={() => props.deleteList(props.number)}
                    size="sm"
                >
                    <i className="bi-trash3"></i>
                </Button>
            </div>
        </li>
    );
};

export default SideMenuItem;
