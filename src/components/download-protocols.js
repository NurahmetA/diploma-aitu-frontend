import CommissionService from "../services/commission.service";

function DownloadProtocols(props) {

    const downloadFile = () => {
        CommissionService.getDocument(props.defenceId).then(response => {
            const pdf = response.data;
            const linkSource = `data:application/pdf;base64,${pdf}`;
            const downloadLink = document.createElement("a");
            const fileName = "abc.pdf";
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
        })
    }

    return (
        <button onClick={downloadFile}>Download</button>
    );
}

export default DownloadProtocols;
