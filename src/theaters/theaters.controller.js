const res = require('express/lib/response')
const theatersService = require('./theaters.service')

const list = async (req, res, next) => {
    const theaters = await theatersService.list()

    for(let theater of theaters) {
		const foundMovies = await theatersService.foundMovies(theater.theater_id)
		theater["movies"] = foundMovies;
	}
	
	res.json({ data: theaters })
}

const foundTheaters = async (req, res, next) => {
    if(res.locals.movie) {
		return res.json({ data: await theatersService.foundTheaters(res.locals.movie.movie_id) });
	}
	next();
}

module.exports = {
    list: [foundTheaters, list],
}