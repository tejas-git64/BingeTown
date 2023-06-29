// For Popular, Trending and Top rated movies
export type Movie = {
	adult: boolean;
	backdrop_path: string;
	first_air_date: string;
	genre_ids: number[];
	id: number;
	genre: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: number;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export type Movies = {
	movies: Movie[] | null;
	heading: string;
	genre: number;
};

// for discovering, Airing today, OTA, Popular and Top Rated
export type TVDiscover = {
	adult: boolean;
	isShow: boolean;
	backdrop_path: string;
	first_air_date: string;
	genre_ids: number[];
	id: number;
	name: string;
	title: string;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	vote_average: number;
	show_vote_average: string;
	vote_count: number;
};

export type TVList = {
	shows: TVDiscover[] | null;
	heading: string;
};

export type TrendingTV = {
	page: number;
	results: {
		adult: boolean;
		backdrop_path: string;
		first_air_date: string;
		genre_ids: number[];
		id: number;
		name: string;
		origin_country: string[];
		original_language: string;
		original_name: string;
		overview: string;
		media_type: string;
		popularity: number;
		poster_path: string;
		vote_average: number;
		vote_count: number;
	}[];
	total_pages: number;
	total_results: number;
};

export type MovieListGenres = {
	genres: {
		id: number;
		name: string;
	}[];
};

export type TVListGenres = {
	genres: {
		id: number;
		name: string;
	}[];
};

// For now playing and Upcoming movies
export type CFMovie = {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: {
		adult: boolean;
		backdrop_path: string;
		genre_ids: number[];
		id: number;
		original_language: string;
		original_title: string;
		overview: string;
		popularity: number;
		poster_path: string;
		release_date: number;
		title: string;
		video: boolean;
		vote_average: number;
		vote_count: number;
	}[];
};

// Get movie/ latest movie details
export type MovieDetails = {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: null;
	budget: number;
	genres: {
		id: number;
		name: string;
	}[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: {
		id: number;
		logo_path: string;
		name: string;
		origin_country: string;
	}[];
	production_countries: {
		iso_3166_1: string;
		name: string;
	}[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: {
		english_name: string;
		iso_639_1: string;
		name: string;
	}[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export type TVShowDetails = {
	adult: boolean;
	backdrop_path: string;
	created_by: {
		id: number;
		crediit_id: string;
		name: string;
		gender: number;
		profile_path: string;
	}[];
	episode_run_time: number[];
	first_air_date: string;
	genres: {
		id: number;
		name: string;
	}[];
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: {
		id: number;
		name: string;
		overview: string;
		vote_average: number;
		vote_count: number;
		air_date: string;
		episode_number: number;
		production_code: string;
		runtime: number;
		season_number: number;
		show_id: number;
		still_path: string;
	};
	name: string;
	next_episode_to_air: null;
	networks: {
		id: number;
		logo_path: string;
		name: string;
		origin_country: string;
	}[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: {
		id: number;
		logo_path: string;
		name: string;
		origin_country: string;
	}[];
	production_countries: {
		iso_3166_1: string;
		name: string;
	}[];
	seasons: {
		air_date: string;
		episode_count: number;
		id: number;
		name: string;
		overview: string;
		poster_path: string;
		season_number: number;
	}[];
	spoken_languages: [
		{
			english_name: string;
			iso_639_1: string;
			name: string;
		}
	];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
};

export type AlternateTitle = {
	id: number;
	titles: {
		iso_3166_1: string;
		title: string;
		type: string;
	}[];
};

export type TVShowImages = {
	backdrops: {
		aspect_ratio: number;
		height: number;
		iso_639_1: string | null;
		file_path: string;
		vote_average: number;
		vote_count: number;
		width: number;
	}[];
};

export type TVShowReviews = {
	id: number;
	page: number;
	results: {
		author: string;
		author_details: {
			name: string;
			username: string;
			avatar_path: string;
			rating: number | null;
		};
		content: string;
		created_at: string;
		id: string;
		updated_at: string;
		url: string;
	}[];
	total_pages: number;
	total_results: number;
};

export type MovieImages = {
	backdrops: {
		aspect_ratio: number;
		height: number;
		iso_639_1: string | null;
		file_path: string;
		vote_average: number;
		vote_count: number;
		width: number;
	}[];
};

export type MovieKeywords = {
	id: number;
	keywords: {
		id: number;
		name: string;
	}[];
};

export type Recommendation = {
	page: number;
	results: {
		adult: boolean;
		backdrop_path: string;
		id: number;
		title: string;
		original_language: string;
		original_title: string;
		overview: string;
		poster_path: string;
		media_type: string;
		genre_ids: number[];
		popularity: number;
		release_date: string;
		video: boolean;
		vote_average: number;
		vote_count: number;
	}[];
};

export type UserReviews = {
	id: number;
	page: number;
	results: {
		author: string;
		author_details: {
			name: string;
			username: string;
			avatar_path: string;
			rating: number | null;
		};
		content: string;
		created_at: string;
		id: string;
		updated_at: string;
		url: string;
	}[];
};

//Also similar to multisearch
export type SimilarMovies = {
	page: number;
	results: {
		adult: boolean;
		backdrop_path: string;
		genre_ids: number[];
		id: number;
		original_language: string;
		original_title: string;
		overview: string;
		popularity: number;
		poster_path: string;
		release_date: string;
		title: string;
		video: boolean;
		vote_average: number;
		vote_count: number;
	}[];
	total_pages: number;
	total_results: number;
};

// For movie/tv videos, trailers
export type MovieTVvideo = {
	id: number;
	results: {
		iso_639_1: string;
		iso_3166_1: string;
		name: string;
		key: string;
		site: string;
		size: number;
		type: string;
		official: boolean;
		published_at: string;
		id: string;
	}[];
};

export type PersonDetails = {
	adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string;
	deathday: null;
	gender: number;
	homepage: null;
	id: number;
	imdb_id: string;
	known_for_department: string;
	name: string;
	place_of_birth: string;
	popularity: number;
	profile_path: string;
};

export type PersonImage = {
	id: number;
	profiles: {
		aspect_ratio: number;
		height: number;
		iso_639_1: null;
		file_path: string;
		vote_average: number;
		vote_count: number;
		width: number;
	}[];
};

export type TVSeasonDetails = {
	_id: string;
	air_date: string;
	episodes: {
		air_date: string;
		episode_number: number;
		id: number;
		name: string;
		overview: string;
		production_code: string;
		runtime: number;
		season_number: number;
		show_id: number;
		still_path: string;
		vote_average: number;
		vote_count: number;
		crew: {
			department: string;
			job: string;
			credit_id: string;
			adult: boolean;
			gender: number;
			id: number;
			known_for_department: string;
			name: string;
			original_name: string;
			popularity: number;
			profile_path: string;
		}[];
		guest_stars: {
			character: string;
			credit_id: string;
			order: number;
			adult: boolean;
			gender: number;
			id: number;
			known_for_department: string;
			name: string;
			original_name: string;
			popularity: number;
			profile_path: string;
		}[];
	}[];
	name: string;
	overview: string;
	id: number;
	poster_path: string;
	season_number: number;
};

export type TVSeason = {
	id: number;
	poster_path: string;
	name: string;
	episode_count: number;
};

export type TVSeasonImages = {
	id: number;
	posters: {
		aspect_ratio: number;
		height: number;
		iso_639_1: null;
		file_path: string;
		vote_average: number;
		vote_count: number;
		width: number;
	}[];
};

export type TVSeasonVideos = {
	id: number;
	results: {
		iso_639_1: string;
		iso_3166_1: string;
		name: string;
		key: string;
		site: string;
		size: number;
		type: string;
		official: boolean;
		published_at: string;
		id: string;
	}[];
};

export type TVEpisode = {
	air_date: string;
	crew: {
		department: string;
		job: string;
		credit_id: string;
		adult: boolean;
		gender: number;
		id: number;
		known_for_department: string;
		name: string;
		original_name: string;
		popularity: number;
		profile_path: string;
	}[];
	episode_number: number;
	guest_stars: {
		character: string;
		credit_id: string;
		order: number;
		adult: boolean;
		gender: number;
		id: number;
		known_for_department: string;
		name: string;
		original_name: string;
		popularity: number;
		profile_path: string;
	}[];
	name: string;
	overview: string;
	id: number;
	production_code: string;
	runtime: number;
	season_number: number;
	still_path: string;
	vote_average: number;
	vote_count: number;
};

export type TVEpisodeImage = {
	id: number;
	stills: {
		aspect_ratio: number;
		height: number;
		iso_639_1: null;
		file_path: string;
		vote_average: number;
		vote_count: number;
		width: number;
	}[];
};

export type TVEpisodeVideos = {
	id: number;
	results: {
		iso_639_1: string;
		iso_3166_1: string;
		name: string;
		key: string;
		site: string;
		size: number;
		type: string;
		official: boolean;
		published_at: string;
		id: string;
	}[];
};
