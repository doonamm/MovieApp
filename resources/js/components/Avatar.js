function Avatar() {



    function FileValidation(e) {
        var image = document.getElementById('output');
        image.src = URL.createObjectURL(e.target.files[0]);

    }

    return (
        <div className="avatar-wrapper" >

            <input type="file" id="file" onChange={FileValidation} accept="image/*" />
            Uploaded Image
            <img id="output" width={300} height={300} src="https://banner2.cleanpng.com/20180904/vji/kisspng-avatar-image-computer-icons-likengo-usertesting-index-5b8ec1242fdcf5.6000571015360822121961.jpg" />
        </div >
    );
}

export default Avatar;