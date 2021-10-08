const getImage = (req, res, next) => {
    const image_id = req.params.img_id
    res.sendFile(`${image_id}`, { root: "src/assets/images" }, (err) => {
        if (err) {
            next({
              status: 405,
              message: err
            });
        } else {
            console.log('Sent:', `${image_id}`);
        }
    });
}

module.exports = {
    getImage,
}
    