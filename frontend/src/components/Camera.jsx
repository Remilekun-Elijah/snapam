import React, { useEffect } from "react";
import Webcam from "react-webcam";
import ModalOne from "../layout/Modal";
import Button from "./Button";
import BACKEND from "../utils/backend";
import { TbCameraRotate } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Api = new BACKEND();

const WEBCAM = ({ showModal, setModal, formData, fetchLocation, cb }) => {
	const navigate = useNavigate();

	const uploadImage = (base64) => {
		setLoading(true);
		console.log(formData);
		if(base64){

		Api.send({
			type: "post",
			to: `/location`,
			useAlert: true,
			payload: { ...formData, image: base64?.split?.("data:image/jpeg;base64,")[1] },
		})
			.then((res) => {
				setUrl("");
				setLoading(false);
				if (res.success) {
					fetchLocation?.();
					setModal(false);
					navigate(-1)
				}
				return res;
			})
			.catch(console.error);
		}
	};

	const [url, setUrl] = React.useState("");
	const [camData, setCamData] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [view, toggleView] = React.useState(true);

	useEffect(_=> {
		setUrl("")
	}, [showModal])

	const videoConstraints = {
		width: 700,
		height: 720,
		facingMode: view ? { exact: "environment" } : "user",
	};

	const handleCapture = async (getScreenshot) => {
		setUrl(getScreenshot());
		cb?.()
	};

	return (
		<ModalOne
			{...{
				width: window.innerWidth > 992 ? "50%" : "95%",
				height: "70vh",
				showModal,
				setModal: !loading ? setModal : _=>{},
			}}>
			<div className="mb-5 flex justify-center items-center">
				<h2 className="text-2xl mr-10">Capture A Report</h2>

				<TbCameraRotate
					className="cursor-pointer"
					size="24"
					onClick={(_) => toggleView((state) => !state)}
				/>
			</div>
			{!camData && (
				<div className="flex justify-center flex-wrap">
					<p className="text-center flex mt-20">
						Click <TbCameraRotate className="mx-1" size="24" /> or grant site
						permission to use your camera
					</p>
				</div>
			)}
			{!url ? (
				<Webcam
					audio={false}
					width={videoConstraints.width}
					height={videoConstraints.height}
					screenshotFormat="image/jpeg"
					style={{ height: "60%", width: "100vw" }}
					mirrored={window.innerWidth > 992 ? true : false}
					videoConstraints={videoConstraints}
					forceScreenshotSourceSize={true}
					onUserMedia={(e) => setCamData(e)}>
					{({ getScreenshot }) => (
						<>
							{camData && (
								<div className="flex justify-center flex-wrap mt-5">
									<Button
										{...{
											value: "Cancel",
											disabled: loading,
											width: "200px",
											variant: "danger",
											wrapperClass: "md:mr-5",
											onClick: (_) => setModal(false),
										}}
									/>

									<Button
										{...{
											value: loading ? "Capturing..." : "Capture Photo",
											disabled: loading,
											width: "200px",
											wrapperClass: "mt-3 md:mt-0",
											onClick: (_) => handleCapture(getScreenshot),
										}}
									/>
								</div>
							)}
						</>
					)}
				</Webcam>
			) : (
				<div className="flex justify-center">
					<div className="">
						<img src={url} alt="" />
						<div className="flex justify-center flex-wrap mt-5">
									<Button
										{...{
											value: "Retake image",
											width: "200px",
											variant: "danger",
											wrapperClass: "md:mr-5",
											onClick: (_) => {
												setLoading(false)
												setUrl("")
											},
										}}
									/>

									<Button
										{...{
											value: loading ? "Submitting..." : "Submit Report",
											disabled: loading,
											width: "200px",
											wrapperClass: "mt-3 md:mt-0",
											onClick: (_) => uploadImage(url),
										}}
									/>
								</div>
					</div>
				</div>
			)}
		</ModalOne>
	);
};
export default WEBCAM;
