import { lazy, Suspense } from "react";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import AuthGuard from "./utils/AuthGuard";
import { AnimatePresence, motion } from "framer-motion";
const Layout = lazy(() => import("./pages/Layout/Layout"));
const Login = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/Signup/Signup"));
const Landing = lazy(() => import("./pages/Landing/Landing"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Home = lazy(() => import("./pages/Home/Home"));
const MovieTitleDetails = lazy(
	() => import("./pages/MovieTitleDetails/MovieTitleDetails")
);
const TVShowTitleDetails = lazy(
	() => import("./pages/TVShowTitleDetails/TVShowTitleDetails")
);
const Movies = lazy(() => import("./pages/Movies/Movies"));
const TVShows = lazy(() => import("./pages/TVShows/TVShows"));
const Saved = lazy(() => import("./pages/Saved/Saved"));
const WatchList = lazy(() => import("./pages/WatchList/WatchList"));

export default function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Layout />}>
				<Route path='login' element={<Login />} />
				<Route path='signup' element={<SignUp />} />
				<Route index element={<Landing />} />
				<Route path='*' element={<NotFound />} />
				<Route path='movies' element={<AuthGuard component={<Movies />} />} />
				<Route path='saved' element={<AuthGuard component={<Saved />} />} />
				<Route
					path='watchlist'
					element={<AuthGuard component={<WatchList />} />}
				/>
				<Route path='tvshows' element={<AuthGuard component={<TVShows />} />} />
				<Route path='home' element={<AuthGuard component={<Home />} />} />
				<Route
					path='movies/:titleId'
					element={<AuthGuard component={<MovieTitleDetails />} />}
				/>
				<Route
					path='tvshows/:titleId'
					element={<AuthGuard component={<TVShowTitleDetails />} />}
				/>
			</Route>
		)
	);

	return (
		<AnimatePresence mode='wait'>
			<Suspense fallback={<p className='text-white'>Loading...</p>}>
				<motion.div
					key={location.pathname}
					initial={{ opacity: 0.5 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0.5 }}
					transition={{ duration: 0.25 }}>
					<RouterProvider router={router} />
				</motion.div>
			</Suspense>
		</AnimatePresence>
	);
}
