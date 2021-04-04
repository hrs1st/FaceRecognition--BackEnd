const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'afc123743447454d8021a3328f32c3b8'
});

const apiCallHandler =  async (req, res) => {
    try {
        const response = await app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input);
        await res.json(response);
    } catch (err) {
        res.status(400).json('error connecting to Clarifai');
    }
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    //     .then(data => res.json(data))

}

const imageHandler = (req, res, database) => {
    const {id} = req.body;
    database('users').where('id', '=', id).increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json('something went wrong!'));
}

module.exports = {
    imageHandler: imageHandler,
    apiCallHandler: apiCallHandler
}