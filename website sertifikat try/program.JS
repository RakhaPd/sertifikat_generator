document.getElementById('generateBtn').addEventListener('click', function() {
    const imageUpload = document.getElementById('imageUpload');
    const participantName = document.getElementById('participantName').value;
    const certificateNumber = document.getElementById('certificateNumber').value;
    const canvas = document.getElementById('certificateCanvas');
    const ctx = canvas.getContext('2d');
    const downloadLink = document.getElementById('downloadLink');

    // Variables for text positions
    const textVerticalOffset = -50; // Offset for participant name
    const certNumberVerticalOffset = 320; // Offset for certificate number

    if (imageUpload.files && imageUpload.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                // Set font size relative to canvas size
                const fontSize = canvas.width / 10;
                ctx.font = `${fontSize}px Brittany`;
                ctx.textAlign = 'center'; // Center text horizontally
                ctx.textBaseline = 'middle'; // Center text vertically

                // Calculate position for the participant name
                const x = canvas.width / 2; // Center text horizontally
                const y = canvas.height / 2 + textVerticalOffset; // Center text vertically plus offset
                ctx.fillStyle = 'green';

                // Add the participant name to the canvas
                ctx.fillText(participantName, x, y);

                // Set font size for the certificate number
                const certNumberFontSize = canvas.width / 40;
                ctx.font = `${certNumberFontSize}px Arial`;
                ctx.fillStyle = 'Black';

                // Calculate position for the certificate number
                const certNumberX = canvas.width / 2; // Center text horizontally
                const certNumberY = y + certNumberVerticalOffset; // Below the participant name

                // Add the certificate number to the canvas
                ctx.fillText(certificateNumber, certNumberX, certNumberY);

                // Set up the download link
                canvas.style.display = 'block';  // Ensure canvas is displayed
                downloadLink.href = canvas.toDataURL('image/png');
                downloadLink.download = 'certificate.png';
                downloadLink.style.display = 'block';
                downloadLink.textContent = 'Download Certificate';
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(imageUpload.files[0]);
    }
});
