import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import Loader from "./Loader/Loader";
import './Map.css'
import L from 'leaflet'
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const Map = ({ center, mapData, isLoading }) => {




	return (
    <div className="mt-10  relative flex justify-center w-full">
		<MapContainer
			className="z-0 border border-gray-700 map relative"
			center={center}
			zoom={11}
			scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://wredww.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{mapData?.map((report, key) => {
				const iconMarker = new L.icon({
					iconUrl: require('../assets/images/marker.png'),
					iconSize: [45, 50]
				})
        let prop = {}
								if(report?.isTreated === false) prop.icon = iconMarker
								else prop = {}


				return (
          <Marker   {...{ ...prop, key, position: { lat: report.latitude, lng: report.longitude } }} >
						{/* {pop === key &&  */}
						<Popup latitude={report?.latitude} longitude={report?.longitude}>
						{ <div className="flex flex-col">
                 
																	<img
							src={report?.image}
							style={{width: '100%', 	 maxHeight: "400px"}}
							alt=""
						/>
						{report?.address &&<>
						<span className='text-[12px]'>{report?.address}</span>
						<br />
						</>}
										<span className='text-sm capitalize mt-1'>{report?.area}</span>
										<span className='text-sm capitalize'>{report?.lga}</span>
										<div className="flex justify-between items-center mt-3">
												{report?.isTreated ? 
												<div className="flex items-center">
												<DeleteSweepIcon fontSize='small' color='success'/> <p className='ml-2 text-warning'>Treated</p>
												</div>
												: <div className="flex items-center">
												<AutoDeleteIcon fontSize='small' color='error'/> <p className='ml-2 text-warning'>Pending</p>
												</div>}
	
											<Link
												className="text-end ml-3"
												to={`/report/${report._id}`}
												state={report}>
												View Details{" "}
											</Link>
										</div>
																	</div>}
						</Popup>
						
					</Marker>
				);
			})}
		</MapContainer>
			{isLoading && <div
				className="overlays flex justify-center items-center mx-auto scroll p-2 px-[20%]"
				style={{ overflowY: "auto" }}>
          <div className="flex mb-20 items-center"  style={{zIndex: 1000}}>
				<div className="flex justify-center h-full   mx-auto w-full" style={{zIndex: 1000}}><Loader className='before:bg-white'/></div>
          </div>
			</div>}
    </div>
	);
};

export default Map;
