export type Cast = {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
};

export type CastTotal = {
	id: number;
	cast: Cast[] | null;
};

export type Comment = {
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
};

export type ReviewType = {
	author: string;
	name: string;
	username: string;
	avatar_path: string;
	rating: number | null;
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
};

export type ReviewsTotal = {
	id: number;
	page: number;
	results: Comment[] | null;
	total_pages: number;
	total_results: number;
};

export type Genres = {
	id: number;
	name: string;
};

export type ProductionCompany = {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
};

export type ProductionCountry = {
	iso_3166_1: string;
	name: string;
};

export type Languages = {
	english_name: string;
	iso_639_1: string;
	name: string;
};

export type Video = {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	published_at: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	id: string;
};

export type MovieTitleInfo = {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: string | boolean | null;
	budget: number;
	genres: Genres[] | null;
	homepage: string;
	id: number;
	imdb_id: string;
	genre: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[] | null;
	production_countries: ProductionCountry[] | null;
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: Languages[] | null;
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	videos: {
		results: Video[] | undefined;
	};
};

export type Creator = {
	id: number;
	credit_id: string;
	name: string;
	gender: number;
	profile_path: string | null;
};

export type Episode = {
	id: number;
	name: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	air_date: string;
	episode_number: number;
	production_code: string;
	runtime: null;
	season_number: number;
	show_id: number;
	still_path: null;
};

export type Season = {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
};

export type TVTitleInfo = {
	adult: boolean;
	backdrop_path: string;
	created_by: Creator[];
	episode_run_time: [];
	first_air_date: string;
	genres: Genres[] | null;
	homepage: string;
	id: number;
	in_production: boolean;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: Episode;
	name: string;
	next_episode_to_air: Episode;
	networks: ProductionCompany[];
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	seasons: Season[];
	spoken_languages: Languages[];
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
	videos: {
		results: Video[] | undefined;
	};
};
