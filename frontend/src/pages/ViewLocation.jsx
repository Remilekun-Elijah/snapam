/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import Header from "../components/Header";
import Delete from "../components/Modal/Delete";
import Table from "../components/table/Table";
import Alert from "../utils/alert";
import BACKEND from "../utils/backend";
import Menu from "../utils/data.dropdown";
import { IArrowBack, IEmpty } from "../utils/icons";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Report from "../action/location";
import { capitalize } from "../utils/helper";
import Select from "../components/Select/Select";
import TreatReport from "../components/Modal/TreatReport";
import dayjs from "dayjs";

const Api = new BACKEND();

const ViewLocation = () => {
	const [modals, setModals] = React.useState({
		delete: false,
		treat: false,
		isLoading: false,
		userId: [],
		name: "",
		type: "Report",
		cb: () => {},
		action: () => {},
	});

	const navigate = useNavigate();
	const [locations, setLocations] = React.useState([{}]);

	const deleteBulk = useCallback(
		(payload, cb) => {
			const deleteAction = (onSuccess, onError) =>
				Report.bulkDelete(payload)
					.then((res) => {
						if (res.success) {
							getLocations();
							if (onSuccess) {
								onSuccess();
								if (modals.cb) modals.cb();
							}
							setModals((state) => ({
								...state,
								userId: "",
								name: "",
								type: "Report",
							}));
						} else {
							Alert({
								type: "error",
								message: res.message,
							});
							if (onError) onError();
						}
					})
					.catch((err) => {
						onError();
						console.error(err);
					});

			setModals((state) => ({
				...state,
				type: "Locations",
				name: `the ${payload.length} selected locations`,
				userId: payload,
				delete: true,
				cb,
				action: deleteAction,
			}));
		},
		[],
	);

	const [pagination, setPagination] = React.useState({
		page: 1,
		pageSize: 10,
		total: 0,
		length: 0,
		status: "",
	});

	const getLocations = () => {
		Api.send({
			type: "get",
			to: `/location/?page=${pagination.page}&pageSize=${pagination.pageSize}&status=${pagination.status}`,
			useAlert: false,
		})
			.then((res) => {
				if (res?.success) {
					const { pageSize, total, reports } = res?.data;
					setLocations(
						reports?.map((data, idx) => {
							const {
								longitude,
								latitude,
								image, 
								phoneNumber,
								updatedAt,
								area,
								typeOfWaste,
								lga,
								isTreated,
								treatedBy,
							} = data;
							return data
								? {
									"S/N": pagination.pageSize * (pagination.page - 1) + idx + 1,
										image,
										Coordinates: `${latitude}, ${longitude}`,
										"Type of Waste": typeOfWaste || "N/A",
										LGA: lga || "N/A",
										"Area.": area || "N/A",
										"Phone No.": phoneNumber || "N/A",
										"Treated By": treatedBy ? treatedBy?.name : "None",
										"Date Treated": treatedBy ? dayjs(updatedAt).format("MMM DD, YYYY") : "N/A",
										"Status": isTreated ? "Treated" : "Pending",
										_data: data,
								  }
								: {};
						}),
					);
					// console.log(locations);
					setPagination((state) => ({
						...state,
						locations,
						total,
						pageSize,
						length: pagination.pageSize * pagination.page,
					}));
					setModals((state) => ({ ...state, isLoading: false }));
				}
			})
			.catch(console.error);
	};

	const menu = new Menu({
		action: Report,
		refresh: getLocations,
		type: "Report",
		setModal: setModals,
		setFormData: (val) =>
			setModals((state) => ({ ...state, disabledInfo: val })),
	});
	const dropdownMenu = [
		menu.viewLocation({ navigate }),
		menu.editLocation({ navigate }),
		menu.deleteLocation({
			actionName: "delete",
			cb: ({ name, action }) => {
				setModals((state) => ({ ...state, type: name, delete: true, action }));
			},
		}),
		menu.treatLocation({
			actionName: "treatLocation",
			cb: ({ action }) => {
				setModals((state) => ({ ...state, treat: true, action }));
			},
		}),
	];

	React.useEffect(() => {
		setModals((state) => ({ ...state, isLoading: true }));
		getLocations();
	}, [pagination.page, pagination.status]);

	// React.useEffect(() => {
	// 	fetchReports();
	// }, [pagination.lga, pagination.search]);

	return (
		<div>
			<Header />
			<div className="px-[10%]">
				<div className="flex  items-center justify-between flex-wrap  mt-16 mb-5 ">
					<div className="flex items-center">
						<img
							src={IArrowBack}
							alt="arrow back"
							className="cursor-pointer mr-2 sm:mr-5 hover:bg-slate-500 p-2 rounded-full"
							onClick={(_) => navigate(-1)}
						/>{" "}
						<strong className="text-md sm:text-2xl">View Reports</strong>
					</div>
					{/* <div> */}
						<div className="flex sm:mt-0 mt-10">
					{/* <button
						className="px-5 mt- sm:mt-0 py-1 bg-slate-500 hover:bg-slate-900 rounded text-white"
						onClick={(_) => navigate("/report/submit")}>
						Add New
					</button> */}

					<p className="mr-2">Filter by</p>
					<Select
						{...{
							wrapperClass: 'mx-5',
							options: ["Status", "Treated", "Pending"].map((name) => ({
								name,
								value: name === "Status" ? "" : capitalize(name),
							})),
							value: pagination.lga,
							selectClass: "bg-[#eee] shadow-md py-1",
							name: "lga",
							onChange: e => setPagination({...pagination, status: e.target.value}),
						}}
					/>
					</div>
				</div>

				<div className="pb-5">
				{locations.length ? (
					<Table
						{...{
							data: locations,
							isLoading: modals.isLoading,
							pagination,
							setPagination,
							dropdownMenu,
							checkbox: { text: "Bulk Delete", action: deleteBulk },
						}}
					/>
				) : (
					<div className="flex flex-col items-center mt-20">
						<img
							src={IEmpty}
							alt="Not found"
							style={{ width: "100px", height: "100px" }}
						/>
						<h1 className="text-xl mt-10">No report at the moment</h1>
					</div>
				)}
				</div>

				<Delete
					{...{
						type: modals.type,
						setModal: (val) =>
							setModals((state) => ({ ...state, delete: val })),
						showModal: modals.delete,
						action: modals.action,
						name: modals.name,
					}}
				/>
				<TreatReport
					{...{
						setModal: (val) =>
							setModals((state) => ({ ...state, treat: val })),
						showModal: modals.treat,
						action: modals.action,
					}}
				/>
			</div>

			<Footer />
		</div>
	);
};

export default ViewLocation;
