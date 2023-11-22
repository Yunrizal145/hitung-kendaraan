import { Logo1, Logo2, Logo3, Logo4 } from "../../assets";

const Header = () => {
	return (
		<div className="w-full px-6 py-4 flex gap-5 md:justify-between md:px-52">
			<div>
				<img src={Logo1} alt="Logo Bapenda" />
			</div>
			<div>
				<img src={Logo2} alt="Logo Bapenda" />
			</div>
			<div>
				<img src={Logo3} alt="Logo Bapenda" />
			</div>
			<div>
				<img src={Logo4} alt="Logo Bapenda" />
			</div>
		</div>
	);
};

export default Header;
