const profileHandler = (req, res, database) => {
    const {id} = req.params;
    database.select('*').from('users').where('id', id)
        .then(users => {
            if (users.length >= 1) {
                res.json(users[0]);
            } else {
                res.status(400).json('user not found');
            }
        })
        .catch(err => res.status(400).json('something went wrong!'));
}

module.exports = {
    profileHandler: profileHandler
}