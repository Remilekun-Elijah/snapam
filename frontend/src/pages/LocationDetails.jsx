import React from "react";
import { MdLocationOn, MdOutlineLocationCity } from "react-icons/md";
import { FaUserAlt, FaMobile } from "react-icons/fa";
import { RiGovernmentFill } from "react-icons/ri";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { IArrowBack } from "../utils/icons";
import { Button } from "@mui/material";
import RoomIcon from '@mui/icons-material/Room'
import RecyclingIcon from '@mui/icons-material/Recycling';

export default function LocationDetails() {
	const navigate = useNavigate();
	const { state } = useLocation();
	return (
		<div className="">
			<Header />

			<div className="px-[10%] md:mb-20 mb-10">
				<div className="mt-20 flex items-center justify-between mb-10 ">
					<div>
					<div className="flex">
					<img
						src={IArrowBack}
						alt="arrow back"
						className="cursor-pointer mr-2 sm:mr-5 mt- hover:bg-slate-500 p-2 rounded-full"
						onClick={(_) => navigate(-1)}
					/>{" "}
					<strong className="text-md sm:text-2xl mt-1">Report Details</strong>
					</div>
					</div>

					{/* <button
						className="px-5 py-1 bg-slate-500 hover:bg-slate-900 rounded text-white"
						onClick={(_) => navigate("/report/submit", {state})}>
						Edit
					</button> */}
				</div>
				<div>
					{state?.image &&
      <div className="flex flex-col justify-center">
     <img
						src={state?.image}
      style={{maxHeight: "400px"}}
						alt=""
					/>
     <div className="text-center text-lg mt-2">Report Image</div>
     </div>
     }


					<div className="md:mt-8 mt-2 ">
						<table>
							<thead>
								<tr className="invisible">
									<th> Row</th> <th> Row</th>
								</tr>
							</thead>
							<tbody>
							<tr className="mt-20 ">
									<td className="flex mr-5">
										<RiGovernmentFill size="24" color="green" />{" "}
										<p className="ml-2 text-gray-600">Address</p>
									</td>
									<td>{state?.address || "N/A"}</td>
								</tr>

								<tr className="invisible">
									<td>place</td>
								</tr>


								<tr>
									<td className="flex mr-5">
										<MdOutlineLocationCity title="Address" size="24" color="green" />{" "}
										<p className="ml-2 text-gray-600">Area</p>
									</td>
									<td>{state?.area || "N/A"}</td>
								</tr>

								<tr className="invisible">
									<td>place</td>
								</tr>

								<tr className="mt-20 pt-20">
									<td className="flex mr-5">
										<RiGovernmentFill size="24" color="green" />{" "}
										<p className="ml-2 text-gray-600">LGA</p>
									</td>
									<td>{state?.lga || "N/A"}</td>
								</tr>

								<tr className="invisible">
									<td>place</td>
								</tr>

								<tr className="mt-20 pt-20">
									<td className="flex mr-5">
										<MdLocationOn size="24" color="green" />{" "}
										<p className="ml-2 text-gray-600">Location</p>
									</td>
									<td>
										<Button startIcon={_=><RoomIcon/>} target="_blank" rel={"noreferrer"} variant="text" className="capitalize" href={`https://www.google.com/maps?q=${state?.latitude},${state?.longitude}`} sx={{textTransform: 'capitalize'}}> Open On Google Map</Button>
									</td>
								</tr>
<br/>
								{/* <tr className="invisible">
									<td>place</td>
								</tr> */}

								<tr className="m-10 pt-0">
									<td className="flex mr-5">
										<RecyclingIcon size="24" color="green" />{" "}
										<p className="ml-2 text-gray-600">Type of Waste</p>
									</td>

									<td>{state?.typeOfWaste || "N/A"}</td>
								</tr>
								{state?.treatedBy && 
								<>
								<tr className="invisible">
									<td>place</td>
								</tr>

								<tr className="mt-20 pt-20">
									<td className="flex mr-5">
										<FaUserAlt size="24" color="green" />{" "}
										<p className="ml-2 text-gray-600"> Treated By</p>
									</td>
									<td>{state?.treatedBy?.name || "N/A"}</td>
								</tr>
								</>}

								<tr className="invisible">
									<td>place</td>
								</tr>

								<tr className="mt-20 pt-20">
									<td className="flex mr-5">
										<FaMobile size="24" color="green" />{" "}
										<p className="ml-2 text-gray-600">Reporters Tel.</p>
									</td>
									<td>{state?.phoneNumber || "N/A"}</td>
								</tr>

								<tr className="invisible">
									<td>place</td>
								</tr>

								<tr className="mt-20 pt-20">
										<td className="flex ml-1 mr-5">
										{state?.isTreated ?
										<DeleteSweepIcon size='26' color='success'/>
										:
											<AutoDeleteIcon size='26' color='success'/>
											}
										 <p className='ml-2 text-gray-600'>Status</p>
											</td>
									<td className="">{state?.isTreated ? "Treated" : "Pending"}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			
			<Footer />
		</div>
	);
}
