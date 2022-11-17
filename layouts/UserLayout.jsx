import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const UserLayout = ({ children }) => {
	return (
		<div>
			<Navbar />
			{children}
			{/* <Footer /> */}
		</div>
	);
};

export default UserLayout;
