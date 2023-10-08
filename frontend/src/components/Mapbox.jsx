/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
import ReactMapGl, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import config from '../utils/config';
import { Link } from 'react-router-dom';
import BACKEND from '../utils/backend';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const Mapbox = ({reports}) => {
 const [pop, setPop] = useState(false)
 // mapboxgl.accessToken = config.mapbox_token;
 
// const map = new mapboxgl.Map({
// container: 'map', // container ID
// style: 'mapbox://styles/mapbox/streets-v12', // style URL
// center: [-74.5, 40], // starting position [lng, lat]
// zoom: 9, // starting zoom
// });

const [place, setPlace] = useState(null),
[coords, setCoords] = useState([]),
[loading, setLoading] = useState(false);

const [ viewState, setViewState ] = useState({longitude: 	8.675277, latitude: 9.081999, zoom: 6}),
// 8.064964, 8.772062
popRef = useRef(null)

useEffect(()=> {
 setLoading(true)
 if(coords.length){

  new BACKEND({}).send({
   type: 'get',
   to: `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords?.[0]},${coords?.[1]}.json?access_token=${config.mapbox_token}`,
   useAlert: false
  })
  .then(res=> {
   res && setPlace(res?.features?.[0]?.place_name)
   setLoading(false)
   setCoords([])
  })
 .catch(console.error)
 }
}, [coords.length])

 return ( 
  <div className='mt-10 shadow-xl' style={{width: '80%', height: "600px"}}>
   <ReactMapGl  {...viewState }
   onMove={evt => setViewState(evt.viewState)}
   mapStyle="mapbox://styles/remilekun-elijah/clng8acku03um01pj1ifb4796"
   mapboxAccessToken={config.mapbox_token}
   style={{width: '100%', height: "100%"}}
   >
    <GeolocateControl />
    <FullscreenControl />
    <NavigationControl />
    {reports?.map((report, idx) => <Marker style={{cursor: "pointer"}} color={!report.isTreated && 'red'} onClick={_=>{
     if(coords?.[0] !== report?.longitude&& coords?.[1] !== report?.latitude){

      setCoords([report?.longitude, report?.latitude])
     }
     setPop(idx)
    }} latitude={report?.latitude} longitude={report?.longitude}>
   
     {pop === idx && <Popup ref={popRef} latitude={report?.latitude} closeOnClick={false} anchor='top-right' closeButton={true} onClose={_=>setPop(null)} longitude={report?.longitude}>
							
               {loading ? <div className="flex flex-col">
                 
                <img
						src={report?.image}
      style={{maxHeight: "400px"}}
						alt=""
					/>
									<span className='text-[12px]'>{place}</span>
     <br />
									<span className='text-sm capitalize'>{report?.area}</span>
									<span className='text-sm capitalize'>{report?.lga}</span>
									<div className="flex justify-between flex-wrap mt-3">
											{report?.isTreated ? 
           <div className="flex">
           <DeleteSweepIcon fontSize='small' color='success'/> <p className='ml-1 text-warning'>Treated</p>
           </div>
           : <div className="flex">
           <AutoDeleteIcon fontSize='small' color='error'/> <p className='ml-1 text-warning'>Pending</p>
           </div>}

										<Link
											className="text-end ml-3"
											to={`/report/${report._id}`}
											state={report}>
											View Details{" "}
										</Link>
									</div>
								        </div> : <p>Loading...</p>}
							
						</Popup>}

      {/* <RoomIcon  onClick={_=> setPop(idx)}  style={{cursor: 'pointer', color: 'red', width: '40px', height: '40px', zIndex: 9999999999999999999}}/> */}
     </Marker>)}
</ReactMapGl>

  </div>
 );
}

export default Mapbox;
