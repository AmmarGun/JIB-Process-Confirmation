// Array to store uploaded PDFs
let uploadedPDFs = [];

// Function to upload the PDF
document.getElementById('uploadBtn').addEventListener('click', () => {
    const pdfUpload = document.getElementById('pdfUpload');
    const file = pdfUpload.files[0];

    if (file && file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Store the file details in an array
            uploadedPDFs.push({ name: file.name, url: e.target.result });
            displayPDFList();
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid PDF file.");
    }
});

// Function to display the list of PDFs
function displayPDFList() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Clear the existing list

    uploadedPDFs.forEach((pdf, index) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = pdf.url;
        link.target = "_blank";
        link.textContent = pdf.name;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.style.marginLeft = "10px";
        removeButton.addEventListener('click', () => removePDF(index));

        li.appendChild(link);
        li.appendChild(removeButton);
        fileList.appendChild(li);
    });
}

// Function to remove a PDF from the list
function removePDF(index) {
    uploadedPDFs.splice(index, 1); // Remove the PDF from the array
    displayPDFList(); // Refresh the list
}
// Function to display the list of PDFs with search functionality
function displayPDFList() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = ''; // Clear the existing list

    // Get the search query
    const searchQuery = document.getElementById('searchBox').value.toLowerCase();

    // Filter uploaded PDFs based on the search query
    const filteredPDFs = uploadedPDFs.filter(pdf => 
        pdf.name.toLowerCase().includes(searchQuery)
    );

    // Create the list of filtered PDFs
    filteredPDFs.forEach((pdf, index) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = pdf.url;
        link.target = "_blank";
        link.textContent = pdf.name;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.style.marginLeft = "10px";
        removeButton.addEventListener('click', () => removePDF(index));

        li.appendChild(link);
        li.appendChild(removeButton);
        fileList.appendChild(li);
    });
}

// Event listener for the search box
document.getElementById('searchBox').addEventListener('input', displayPDFList);
