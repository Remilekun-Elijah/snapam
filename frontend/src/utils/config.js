const environment = {}; 
environment.development = {
 backendUrl: "http://localhost:9000",
cloudinary_cloudName:"remilekunelijah",
 cloudinary_preset: "ixp9w0hy",
 cloudinary_folder: "Mapify"
}

environment.staging = {
 backendUrl: process.env.REACT_APP_API_URL ?? "https://api-staging-mapify.onrender.com",
cloudinary_cloudName:"remilekunelijah",
 cloudinary_preset: "ixp9w0hy",
 cloudinary_folder: "Mapify"
}

environment.production = {
 backendUrl: process.env.REACT_APP_API_URL ?? "https://api-mapify.onrender.com",
 cloudinary_cloudName:"remilekunelijah",
 cloudinary_preset: "ixp9w0hy",
 cloudinary_folder: "Mapify"
}

export default environment[process.env.REACT_APP_NODE_ENV || "development"]