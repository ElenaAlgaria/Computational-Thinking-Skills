/**
 * - this file downloads the answers of all the questions in a file
 */

const downloadBtn = document.getElementById("download");
const text = document.getElementById("name");

function downloadAnswers() {
    /**
     * - get saved answers from local storage
     */
    const savedAnswers = JSON.parse(localStorage.getItem('savedAnswers')) || [];
    savedAnswers.push({NameAlterKlasse: text.value});
    localStorage.setItem('savedAnswers', JSON.stringify(savedAnswers));

    /**
     * - create a json-object and convert json into a file
     */
    const dataToDownload = {AngabenBenutzer: savedAnswers};
    const jsonData = JSON.stringify(dataToDownload);
    const blob = new Blob([jsonData], {type: 'application/json'});

    /**
     * - download file
     */
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Antworten.json';
    link.click();

    localStorage.clear();
}

downloadBtn.addEventListener("click", downloadAnswers);


