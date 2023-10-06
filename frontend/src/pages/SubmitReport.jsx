import React, { useEffect, useState } from "react";
import { capitalize, lgas } from "../utils/helper";
import Input from "../components/Input/InputOne";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "../utils/alert";
import { IArrowBack } from "../utils/icons";
import SelectTwo from "../components/Select/SelectTwo";
import Footer from "../components/Footer";
import Location from "../action/location";
import WEBCAM from "../components/Camera";


const Button = styled.button``;

export default function SubmitReport() {
	
	const navigate = useNavigate(),
	[isSubmitting, setSubmit] = React.useState(false),
	{ state } = useLocation(),
	values = {
		image: "",
		typeOfWaste: "",
		area: "",
		phoneNumber: "",
		lga: "",
	},
	{__v, _id, createdAt, updatedAt, image, ...rest} = state || {},
 [showModal, setModal] = useState(false),
	[formData, setFormData] = React.useState(values);
	
	const addData = ({ target: { name, value } }) => {
		setFormData((state) => ({ ...state, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// setSubmit(true);
		try {
			// const res = state ? await Location.edit(formData, _id) : await Location.add(formData)

			// if (res?.success) {
			// 	Alert({ type: "success", message: res?.message });
			// 	navigate("/dashboard");
			// 	setSubmit(false);
			// } else {
			// 	setSubmit(false);
			// }
		} catch (err) {
			// setSubmit(false);
			console.error(err);
		}
	};
 
	return (
		<div className="w-full h-screen">
			<Header />

			<div className=" flex justify-center px mt-16">
				<form
					className="modal__one rounded-2xl  md:w-[600px] w-[80%]  border-0  mb-10"
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
								// required={true}
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
								placeholder={" "}
								wrapperClass={"mt-5 input__two z-0"}
								inputClass={"shadow"}
								// required={true}
								onChange={addData}
							/>

<SelectTwo
								{...{
									value: formData.typeOfWaste,
									name: "typeOfWaste",
									placeholder: "",
									label: "Type Of Waste",
									options: ["Sewage", "Refuge", "Street Littering"].map((name) => ({
										name,
										value: capitalize(name),
									})),
									wrapperClass: "mt-5 input__two",
									onChange: (_, { value }) =>
										setFormData((state) => ({ ...state, typeOfWaste: value })),
								}}
							/>

						</div>

						<div className="flex mx-auto justify-center  my-10 w-full">
							<Button
								className="bg-slate-900 text-white shadow rounded-md w-full h-[40px]"
								// type={"submit"}
        onClick={_=> {
          setModal(true)
          
        }}
								// disabled={isSubmitting}
        >
								{" "}
								{"Proceed to Capturing"}
							</Button>
						</div>
					</div>
				</form>
			</div>

   <WEBCAM {...{ showModal, setModal, locationId:0, fetchLocation:_=>{} }} />
			<Footer />
		</div>
	);
}
