import AuthContextProvider from "./contexts/authContext";
import MainRoute from "./routes/route";

function App() {
	return (
		<AuthContextProvider>
			<div className=''>
				<header className='w-full  absolute'>
					<img
						className='w-full object-cover'
						src='https://playo-website.gumlet.io/playo-website-v2/static_pages/hero-images/Landing+Page.jpeg?q=70&h=1200&w=1200&flip=h'
						alt='sports'
					/>
					<div className='absolute inset-0 h-full w-full bg-gradient-to-r from-black to-black md:to-transparent via-black opacity-80'></div>
				</header>
				<MainRoute />
			</div>
		</AuthContextProvider>
	);
}
export default App;
