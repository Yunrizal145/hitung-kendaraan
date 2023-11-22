import { useState, useEffect } from "react";
import imgMotor from "../../assets/images/motor.png";
import imgMobil from "../../assets/images/mobil.png";

const HomePage = () => {
	const [motor, setMotor] = useState(0);
	const [mobil, setMobil] = useState(0);
	const [savedData, setSavedData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showModalTable, setShowModalTable] = useState(false);
	const [deleteIndex, setDeleteIndex] = useState(null);

	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
		setSavedData(savedData);
	}, []);

	const confirmDelete = () => {
		const updatedSavedData = savedData.filter((_, i) => i !== deleteIndex);
		setSavedData(updatedSavedData);
		localStorage.setItem("savedData", JSON.stringify(updatedSavedData));
		setShowModalTable(false);
	};

	const cancelDelete = () => {
		setDeleteIndex(null);
		setShowModalTable(false);
	};

	const decreaseCountMotor = () => {
		if (motor > 0) {
			setMotor((prevCount) => prevCount - 1);
		}
	};

	const increaseCountMotor = () => {
		setMotor((prevCount) => prevCount + 1);
	};

	const decreaseCountMobil = () => {
		if (mobil > 0) {
			setMobil((prevCount) => prevCount - 1);
		}
	};

	const increaseCountMobil = () => {
		setMobil((prevCount) => prevCount + 1);
	};

	const deleteData = (index) => {
		setDeleteIndex(index);
		setShowModalTable(true);
	};

	const saveDataMobil = () => {
		const currentDate = new Date().toLocaleString();
		const data = {
			vehicle: "Mobil",
			count: mobil,
			date: currentDate,
		};
		const updatedSavedData = [...savedData, data]; // Use a different variable name to avoid conflict
		setSavedData(updatedSavedData);
		localStorage.setItem("savedData", JSON.stringify(updatedSavedData));
		setMobil(0);
		setShowModal(true);
	};

	const saveDataMotor = () => {
		const currentDate = new Date().toLocaleString();
		const data = {
			vehicle: "Motor",
			count: motor,
			date: currentDate,
		};
		const updatedSavedData = [...savedData, data]; // Use a different variable name to avoid conflict
		setSavedData(updatedSavedData);
		localStorage.setItem("savedData", JSON.stringify(updatedSavedData));
		setMotor(0);
		setShowModal(true);
	};

	const totalMobilCount = savedData.reduce((total, data) => {
		return data.vehicle === "Mobil" ? total + data.count : total;
	}, 0);

	const totalMotorCount = savedData.reduce((total, data) => {
		return data.vehicle === "Motor" ? total + data.count : total;
	}, 0);

	// eslint-disable-next-line react/prop-types
	const Button = ({ type, onClick }) => {
		return (
			<button
				onClick={onClick}
				className={`mt-6 py-2 px-6 rounded-xl bg-green-100 text-green-600 ${
					type === "TAMBAH"
						? "bg-green-500 text-white font-semibold"
						: type === "KURANG"
						? "bg-red-500 text-white font-semibold"
						: "bg-blue-400 text-blue-700"
				}`}
			>
				{type}
			</button>
		);
	};

	return (
		<>
			<div className="w-full text-center px-6">
				<div className="mt-12 font-extrabold text-xl underline">
					Penghitungan Kendaraan yang Diberhentikan
				</div>

				<div className="md:flex md:gap-8 md:px-12">
					{/* Card Mobil */}
					<div className="w-full border-2 rounded-3xl mt-12 bg-slate-300">
						<div className="px-4">
							<div className="bg-white rounded-2xl mt-4 mb-8 flex justify-center">
								<img src={imgMobil} alt="Mobil" />
							</div>
							<h3 className="text-lg font-bold mb-2">
								Jumlah Mobil:
							</h3>
							<div className="w-full rounded-lg h-8 bg-white">
								{mobil}
							</div>
							<div className="flex justify-center gap-10">
								<Button
									type="KURANG"
									onClick={decreaseCountMobil}
								/>
								<Button
									type="TAMBAH"
									onClick={increaseCountMobil}
								/>
							</div>
							<button
								onClick={saveDataMobil}
								disabled={mobil === 0}
								className="w-full py-2 font-bold my-6 text-white bg-sky-500 rounded-xl cursor-pointer"
							>
								SAVE
							</button>
						</div>
					</div>

					{/* Card Motor */}
					<div className="w-full border-2 rounded-3xl mt-8 bg-slate-300 ">
						<div className="px-4">
							<div className="bg-white rounded-2xl mt-4 mb-8 flex justify-center">
								<img src={imgMotor} alt="Motor" />
							</div>
							<h3 className="text-lg font-bold mb-2">
								Jumlah Motor:
							</h3>
							<div className="w-full rounded-lg h-8 bg-white">
								{motor}
							</div>
							<div className="flex justify-center gap-10">
								<Button
									type="KURANG"
									onClick={decreaseCountMotor}
								/>
								<Button
									type="TAMBAH"
									onClick={increaseCountMotor}
								/>
							</div>
							<button
								onClick={saveDataMotor}
								disabled={motor === 0}
								className="w-full py-2 font-bold my-6 text-white bg-sky-500 rounded-xl"
							>
								SAVE
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="text-center px-6 mt-16 font-bold underline">
				<h1>History Jumlah Kendaraan</h1>
			</div>

			{/* Table Data */}
			<div className="mt-4 overflow-hidden px-6 md:px-12">
				{/* Render the saved data in a table */}
				<table className="min-w-full divide-y divide-gray-200">
					<thead>
						<tr>
							<th className="px-4 py-2 text-start text-sm font-medium text-gray-500 uppercase">
								Vehicle
							</th>
							<th className="py-2 text-start text-sm font-medium text-gray-500 uppercase">
								Count
							</th>
							<th className="px-4 py-2 text-start text-sm font-medium text-gray-500 uppercase">
								Date
							</th>
							<th className="px-4 py-2 text-start text-sm font-medium text-gray-500 uppercase">
								Action
							</th>
						</tr>
					</thead>
					<tbody className="text-xs">
						{savedData.map((data, index) => (
							<tr
								key={index}
								className="odd:bg-white even:bg-gray-100"
							>
								<td className="px-4 py-2 whitespace-nowrap text-xs font-medium ">
									{data.vehicle}
								</td>
								<td>{data.count}</td>
								<td>{data.date}</td>
								<td className="flex justify-center items-center my-4">
									<button
										onClick={() => deleteData(index)}
										className="px-2 py-1 rounded-lg font-semibold bg-red-200 text-red-600"
									>
										DELETE
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="mt-14">
					<h3>Total Kendaraan yang diberhentikan:</h3>
					<div className="flex flex-col">
						<span>Mobil: {totalMobilCount}</span>
						<span>Motor: {totalMotorCount}</span>
					</div>
				</div>
			</div>

			{showModal && (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div
							className="fixed inset-0 transition-opacity"
							aria-hidden="true"
						>
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>
						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
										<svg
											className="h-6 w-6 text-green-600"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M5 13l4 4L19 7"
											></path>
										</svg>
									</div>
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<h3 className="text-lg font-medium text-gray-900">
											Data Saved!
										</h3>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												Your data has been saved
												successfully.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									onClick={() => setShowModal(false)}
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
								>
									OK
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{showModalTable && (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div
							className="fixed inset-0 transition-opacity"
							aria-hidden="true"
						>
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>
						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
										<svg
											className="h-6 w-6 text-red-600"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M6 18L18 6M6 6l12 12"
											></path>
										</svg>
									</div>
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<h3 className="text-lg font-medium text-gray-900">
											Delete Data?
										</h3>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												Are you sure you want to delete
												this data?
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									onClick={confirmDelete}
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
								>
									Delete
								</button>
								<button
									onClick={cancelDelete}
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default HomePage;
