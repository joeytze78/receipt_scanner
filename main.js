document.getElementById('scanButton').addEventListener('click', () => {
    document.getElementById('uploadInput').click();
});

document.getElementById('uploadInput').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
        // Placeholder: Show loading message
        document.getElementById('result').innerHTML = 'Scanning...';

        // Call the Asprise OCR API (replace with your API logic)
        const formData = new FormData();
        formData.append('file', file);
        formData.append('recognize', 'text');

        try {
            const response = await fetch('https://asprise.com/ocr/api/docs/html/receipt-ocr.html', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            // Display scanned text result
            document.getElementById('result').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        } catch (error) {
            document.getElementById('result').innerHTML = 'Error scanning receipt.';
        }
    }
});
