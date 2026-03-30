import users from "../Models/User.js";
import packages from "../Models/Package.js";
import Bookings from "../Models/Bookings.js";

import Review from "../Models/Review.js";

import Contacts from "../Models/Contact.js";



const DashboardCount = async (req,res) => {
    try {
        const totalPackages = await packages.countDocuments();
        const allusers  =  await users.countDocuments();
        const bookings =  await Bookings.countDocuments();
        const contacts = await Contacts.countDocuments();
        const reviews =  await Review.countDocuments();

        return res.status(200).json({totalPackages:totalPackages ,  users: allusers , bookings:bookings,contacts:contacts , reviews:reviews});


    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({error:error?.message});
    }
}

export {DashboardCount}