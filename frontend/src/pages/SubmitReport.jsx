import React, { useState } from "react";
import { capitalize, lgas } from "../utils/helper";
import Input from "../components/Input/InputOne";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "../utils/alert";
import { IArrowBack, IStreetWasteBg } from "../utils/icons";
import SelectTwo from "../components/Select/SelectTwo";
import Footer from "../components/Footer";
import WEBCAM from "../components/Camera";


const Button = styled.button``;

export default function SubmitReport() {
	
	const navigate = useNavigate(),
	{ state } = useLocation(),
	values = {
		address: "",
  longitude: '',
  latitude: '',
		image: "",
		typeOfWaste: "",
		area: "",
		phoneNumber: "",
		lga: "",
	},
	
 [showModal, setModal] = useState(false),
	[formData, setFormData] = React.useState(values);
	
	const addData = ({ target: { name, value } }) => {
		setFormData((state) => ({ ...state, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await getCoordinates()
		} catch (err) {
			console.error(err);
		}
	};

	async function getCoordinates() {
		await navigator.geolocation.getCurrentPosition(
			position => {
				
				if(position.coords){
					
					setFormData((state) => ({ ...state, latitude: position?.coords?.latitude, longitude: position?.coords?.longitude }));
					console.log(formData); 
					setModal(true)
					} else {
						console.log('Failed to retrieve location');
					}
		},
			err => {
				console.log(err);
				Alert({type: 'error', message: 'You must grant us permission to your location to proceed'})
	}
	);
	}

	async function checkPermission () {
		navigator.permissions.query({ name: 'geolocation' }).then(async function(result) {
			if (result.state === 'granted') {
					// Permission granted
					console.log("It's been granted");
						await getCoordinates()
			} else if (result.state === 'prompt') {
					// Prompt user for permission
					await getCoordinates()
			} else if (result.state === 'denied') {
					// Notify user that they need to grant permission
					Alert({type: 'error', message: 'Please grant permission to use location feature.'});
			}
	});
	}
 
	return (
		<div className="w-full">
			<Header />

			<div className="flex justify-center px mt- relative sm:h-ful h-[800px] overflow-y-hidden">
							<img
								src={IStreetWasteBg}
								className="w-full"
								alt=""
							/>
			<div className="absolute bg-[rgba(0,0,0,.5)] top-0 left-0 right-0 bottom-0 w-ful h-full z-10 flex justify-center items-center">
							
				<form
					className="modal__one rounded-2xl bg-[rgba(255,255,255,.7)] md:w-[600px] w-[80%]  border-0  my-10 p-5"
					onSubmit={handleSubmit}>
					<div className="mt-5">
						<div className="my- flex items-center mb-10 ">
							<img
								src={IArrowBack}
								alt="arrow back"
								className="cursor-pointer mr-2 sm:mr-5 mt-1 hover:bg-slate-500 p-2 rounded-full"
								onClick={(_) => navigate(-1)}
							/>{" "}
							<strong className="text-lg sm:text-2xl">{state ? "Edit Report" : "Submit Report"}</strong>
						</div>

						<div>

<Input
								value={formData.phoneNumber}
								name={"phoneNumber"}
								label={"Phone Number"}
								minLength={1}
								type={"tel"}
								placeholder={" "}
								wrapperClass={"mt-5 input__two"}
								inputClass={"shadow"}
								required={true}
								onChange={addData}
							/>
<Input
								value={formData.address}
								name={"address"}
								label={"Address"}
								placeholder={" "}
								wrapperClass={"mt-5 input__two"}
								inputClass={"shadow"}
								onChange={addData}
							/>
							<SelectTwo
								{...{
									value: formData.lga,
									name: "lga",
									placeholder: "",
									label: "Local Government Area (LGA)",
									options: lgas.map((name) => ({
										name,
										value: capitalize(name),
									})),
									required: true,
									wrapperClass: "mt-5 input__two",
									onChange: (_, { value }) =>
										setFormData((state) => ({ ...state, lga: value })),
								}}
							/>

							<Input
								value={formData.area}
								name={"area"}
								label={"Area"}
								minLength={2}
								type={"text"}
								placeholder={" E.g Ikosi"}
								wrapperClass={"mt-5 input__two z-0"}
								inputClass={"shadow"}
								required={true}
								onChange={addData}
							/>

<SelectTwo
								{...{
									value: formData.typeOfWaste,
									name: "typeOfWaste",
									placeholder: "",
									label: "Type Of Waste",
									options: ["Hazardous waste",
          "Construction waste",
          "Solid waste",
          "Sewage waste",
          "Street litter"].map((name) => ({
										name,
										value: capitalize(name),
									})),
									required: true,
									wrapperClass: "mt-5 input__two",
									onChange: (_, { value }) =>
										setFormData((state) => ({ ...state, typeOfWaste: value })),
								}}
							/>

						</div>

						<div className="flex mx-auto justify-center  my-10 w-full">
							<Button
								className="bg-slate-900 text-white shadow rounded-md w-full h-[40px]"
								type={"submit"}
        // onClick={async _=> }
								// disabled={isSubmitting}
        >
								{" "}
								{"Proceed to Capturing"}
							</Button>
						</div>
					</div>
				</form>
				</div>
			</div>

   <WEBCAM {...{ showModal, setModal, formData, fetchLocation:_=>{}, cb: checkPermission }} />
			<Footer />
		</div>
	);
}
