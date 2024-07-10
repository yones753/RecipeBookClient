import { Button } from "primereact/button";

const FooterDialog = (props) => {

    const handleSave = async () => {
        let res = await props.saveAction();
        if (res)
            props.hideDialog()
    }
    
    return (<div>
        <Button
            label="Save"
            icon="pi pi-check"
            className="p-button-text"
            onClick={handleSave}
            tooltipOptions={{ showOnDisabled: true, position: "top" }}
        />
        <Button
            label="Cancel"
            icon="pi pi-times"
            className="p-button-text"
            onClick={props.hideDialog}
        />
    </div>)
};

export default FooterDialog;