import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import React from "react";
import { ILogo, IStreetWaste, IWaste } from "../utils/icons";
import Header from "../components/Header";
import { Button, Card, CardActionArea, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<Header />
			<section className="bg py px-">
				<Carousel
					infiniteLoop
					// autoPlay
					showStatus
					showThumbs={false}
					showIndicators={false}
					swipeAble={true}
					showArrows={true}>

						<div className="relative">
							<img
								src={IStreetWaste}
								className="lg:w-[70%] w-[80%] md:h-[500px] sm:h-[400px] h-[300px]"
								alt=""
							/>

							<div className="absolute bg-[rgba(255,255,255,.5)] top-0 left-0 right-0 bottom-0 w-full h-full z-10 flex justify-start items-center px-20">
								<div className="caption z-50 text-black">
        <p className="text-left text-[12px] sm:text-lg uppercase aharoni sm:font-bold"><span className="sm:border-b-4 border-b-2 border-[red]">Hazardous</span> waste</p>
									<p className="lg:text-5xl md:text-4xl text-sm font-bold sm:font-thin mb-10">LET’S CLEAN LAGOS TOGETHER</p>
         <Button variant="contained" component={Link} to="/report/submit" color="secondary" size="large" sx={{ background: 'black', color: 'white', px: { sm: "40px" }}}> Report Waste</Button>
								</div>
							</div>
						</div>

					<div className="relative">
							<img
								src={IWaste}
								className="lg:w-[70%] w-[80%] md:h-[500px] sm:h-[400px] h-[300px]"
								alt=""
							/>

<div className="absolute bg-[rgba(255,255,255,.5)] top-0 left-0 right-0 bottom-0 w-full h-full z-10 flex justify-start items-center px-20">
								<div className="caption z-50 text-black">
        <p className="text-left text-[12px] sm:text-lg uppercase aharoni sm:font-bold"><span className="sm:border-b-4 border-b-2 border-[red]">Street</span> Littering</p>
									<p className="lg:text-5xl md:text-4xl text-sm font-bold sm:font-thin mb-10">LET’S CLEAN LAGOS TOGETHER</p>
         <Button variant="contained" component={Link} to="/report/submit" color="secondary" size="large" sx={{ background: 'black', color: 'white', px: { sm: "40px" }}}> Report Waste</Button>
								</div>
							</div>
						</div>

      <div className="relative">
							<img
								src={IStreetWaste}
								className="lg:w-[70%] w-[80%] md:h-[500px] sm:h-[400px] h-[300px]"
								alt=""
							/>

							<div className="absolute bg-[rgba(255,255,255,.5)] top-0 left-0 right-0 bottom-0 w-full h-full z-10 flex justify-start items-center px-20">
								<div className="caption z-50 text-black">
        <p className="text-left text-[12px] sm:text-lg uppercase aharoni sm:font-bold"><span className="sm:border-b-4 border-b-2 border-[red]">Construction</span> waste</p>
									<p className="lg:text-5xl md:text-4xl text-sm font-bold sm:font-thin mb-10">LET’S CLEAN LAGOS TOGETHER</p>
         <Button variant="contained" component={Link} to="/report/submit" color="secondary" size="large" sx={{ background: 'black', color: 'white', px: { sm: "40px" }}}> Report Waste</Button>
								</div>
							</div>
						</div>

      <div className="relative">
							<img
								src={IWaste}
								className="lg:w-[70%] w-[80%] md:h-[500px] sm:h-[400px] h-[300px]"
								alt=""
							/>

<div className="absolute bg-[rgba(255,255,255,.5)] top-0 left-0 right-0 bottom-0 w-full h-full z-10 flex justify-start items-center px-20">
								<div className="caption z-50 text-black">
        <p className="text-left text-[12px] sm:text-lg uppercase aharoni sm:font-bold"><span className="sm:border-b-4 border-b-2 border-[red]">Sewage</span> Waste</p>
									<p className="lg:text-5xl md:text-4xl text-sm font-bold sm:font-thin mb-10">LET’S CLEAN LAGOS TOGETHER</p>
         <Button variant="contained" component={Link} to="/report/submit" color="secondary" size="large" sx={{ background: 'black', color: 'white', px: { sm: "40px" }}}> Report Waste</Button>
								</div>
							</div>
						</div>

      <div className="relative">
							<img
								src={IStreetWaste}
								className="lg:w-[70%] w-[80%] md:h-[500px] sm:h-[400px] h-[300px]"
								alt=""
							/>

<div className="absolute bg-[rgba(255,255,255,.5)] top-0 left-0 right-0 bottom-0 w-full h-full z-10 flex justify-start items-center px-20">
								<div className="caption z-50 text-black">
        <p className="text-left text-[12px] sm:text-lg uppercase aharoni sm:font-bold"><span className="sm:border-b-4 border-b-2 border-[red]">Solid</span> Waste</p>
									<p className="lg:text-5xl md:text-4xl text-sm font-bold sm:font-thin mb-10">LET’S CLEAN LAGOS TOGETHER</p>
         <Button variant="contained" component={Link} to="/report/submit" color="secondary" size="large" sx={{ background: 'black', color: 'white', px: { sm: "40px" }}}> Report Waste</Button>
								</div>
							</div>
						</div>
				</Carousel>
			</section>

   <section className="my-16 md:px-20 sm:px-10 px-8">

  <div className="my-10">
   
    <h2 className="text-center md:text-4xl sm:text-2xl text-lg font-bold uppercase mb-5">Report all kinds of Waste</h2>

    <Divider>
    <WorkspacesIcon style={{color: 'grey'}} />
  </Divider>
  </div>


   <div className="flex justify-around  gap-x-5 gap-y-10 flex-wrap">
   {["Hazardous waste",
          "Construction waste",
          "Solid waste",
          "Sewage waste",
          "Street litter"].map(name=> {
    return <>
     <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={IStreetWaste}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </>
   })}
   </div>
   </section>

{/* <hr /> */}
<div className="mb-10">
<Divider>
    <Chip label="Seen any waste?" />
  </Divider>

  <div className="flex justify-center mt-5">
  <Button variant="contained" component={Link} to="/report/submit" color="secondary" size="large" sx={{ background: 'black', color: 'white', px: { sm: "40px" }}}> Report Now</Button>
  </div>
</div>

   <section className="py-20 bg-slate-100">
						<h1 className="sm:text-4xl text-2xl text-center">
							{" "}
							<span className="pb-0 border-b-2 border-b-[red]">
								Our
							</span>{" "}
							Sponsors
						</h1>
						<div className="flex items-center justify-center flex-wrap w-full sm:mt-10 mt-5">
							<img
								src={ILogo}
								alt=""
								className="sm:mr-10 mr-7 block sm:w-[160px]  w-[120px]"
							/>
							<img
								src={ILogo}
								alt=""
								className="block sm:w-[160px] w-[120px]"
							/>
						</div>
					</section>

     <Footer />
		</div>
	);
};

export default Home;
