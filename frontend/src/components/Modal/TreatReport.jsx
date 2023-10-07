import React from "react";
import Modal from "../../layout/Modal";
import "./ModalOne.css";
import Button from "../Button";
import Success from "./Success";

export default function TreatReport({
	setModal,
	showModal,
	action,
}) {

	const [modalData, setModalData] = React.useState({
		disabled: false,
		showSuccess: false
	});

	return (
		<>
		<Modal
			{...{
				showModal,
				setModal,
				width: "600px",
				height: "250px",
			}}>
			<form
				className="mt- mx-10"
				onSubmit={(e) => {
					e.preventDefault();
					setModalData(state=>({...state, disabled: true}))
     action(_=> {
						setModal(!showModal)
						setTimeout(setModalData(state=>({...state, disabled: false, showSuccess: true})),200)
					}, _=> setModalData(state=>({...state, disabled: false})));
				}}
				>
				<div className="my-5 w-full">
					<h1 className="py-0 font-thin text-center leading-7">
						Treat Report
					</h1>
				</div>
				<p className="leading-5 text-center">
					Is this report completely treated?
				</p>

				<div className="flex justify-center">
					<Button
						wrapperClass={"mt-10 mb-5  mr-5 sm:w-[160px] w-[120px]"}
						value={"No"}
						variant={"danger"}
						parentClass={"mr-2"}
						onClick={(_) => setModal(!showModal)}
					/>
					<Button
						wrapperClass={"mt-10 mb-5  mr-5 sm:w-[160px] w-[120px]"}
						value={modalData.disabled?"Processing...":"Yes"}
						disabled={modalData.disabled}
						// width={"160px"}
						type={"submit"}
						variant={"primary"}
					/>
				</div>
			</form>
		</Modal>	

		<Success
			{...{
				success: modalData.showSuccess,
				setModal:	value => setModalData(state=>({...state, showSuccess: value})),
				title: `Report treated successfully`,
				subtitle: "",
			}}
		/>
		
		</>
	);
}
