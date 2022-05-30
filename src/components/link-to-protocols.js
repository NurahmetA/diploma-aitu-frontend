import CommissionService from "../services/commission.service";

function LinkToProtocols(props) {

    const openProtocols = () => {
        CommissionService.getDocument(props.defenceId).then(response => {
            const pdf = response.data;
            const linkSource = `data:application/pdf;base64,${pdf}`;
            const downloadLink = document.createElement("a");
            downloadLink.href = linkSource;
            downloadLink.click();
        })
    }

    return (
        <button onClick={openProtocols}>Link</button>
    );
}

export default LinkToProtocols;
