const loginHandler = (req, res, bcrypt, database) => {
    const { email , password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form entries');
    }
    database.select('email', 'hash').from('login')
        .where('email', email)
        .then(data => {
            let isValid = bcrypt.compareSync(password, data[0].hash);
            if(isValid) {
                database.select('*').from('users')
                    .where('email', email)
                    .then(user => res.json(user[0]))
                    .catch(err => res.status(400).json('unable to respond'));
            } else {
                res.status(400).json('wrong inputs');
            }
        }).catch(err => res.status(400).json('wrong inputs'));
}

module.exports = {
    loginHandler: loginHandler
}