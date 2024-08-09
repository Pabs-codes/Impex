async function uploadMainImage(req, res) {
    console.log(req.files)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({message: "Nema otpremljenih fajlova"});
    }

    // Get file from a request
    const uploadedFile = req.files.uploadedFile;

    // Using mv method for moving file to the directory on the server
    uploadedFile.mv('../public/' + uploadedFile.name, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.status(200).json({message: "Fajl je uspešno otpremljen"});
    });
}

export {
    uploadMainImage
}