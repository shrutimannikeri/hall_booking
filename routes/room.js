import express from "express"
import { createConnection } from "../index.js"
import { bookroom, getCustomerList, getRoomList, getRooms, insertRoom, updateRoom_bookstatus } from "./dbquery.js";



const router = express.Router();

//create new room details
router.route("/create-rooms").post(async function(req,res){
    const client= await createConnection();
    const room=req.body;
    room.numberOfSeatsAvailable ? "":res.status(400).send({ message: 'Please specify No of seats for Room'});
    room.amenitiesInRoom ? "":res.status(400).send({ message: 'Please specify all Amenities for Room in Array format'});
    room.pricePerHour?"": res.status(400).send({ message: 'Please specify price per hour for Room'});
    room.roomNo? "": res.status(400).send({ message: 'Please enter roomnumber'});
    const hallroom=await insertRoom(client,room)
    res.send({message: "Rooms Created Successfully",hallroom})
})

//getall rooms

router.route("/getAllRooms").get(async function(req,res){
    const client= await createConnection();
    const filter=req.query;
    const roomslist=await getRooms(client,filter)
  res.send(roomslist);
})

//room booking

router.route("/room-book").post(async function(req,res){
    const bookingdata=req.body;
    const client=await createConnection();


    
    //check room number
    const isRoom =await getRooms(client, {roomNo : bookingdata.roomNo})
    
    if(!isRoom){
        res.send({message: "Invalid RoomId, please enter room_id"})
    }
    else{
        console.log(isRoom[0].bookedStatus)
        const bookinglist=await getCustomerList(client);
        const customer_res=bookinglist.filter((cust,ind)=>((cust.date===bookingdata.date) && (cust.booked==="booked")))
      
       if( isRoom[0].bookedStatus===false && customer_res===false){
        bookingdata.booked="booked";
        const roombooked=await bookroom(client,bookingdata);
        //to update room booking status
        const updateRoomStatus=await updateRoom_bookstatus(client,bookingdata.roomNo);

        res.send({message:"Successfully booked room",roombooked,bookingdata})
       }
       else{
        res.send({message: "Room already booked"})
       }
    }

})

//getall customer list
router.route("/customerlist").get(async function(req,res){
    const client =await createConnection();
    const getcustomer=await getCustomerList(client);
    res.send({message: "List of customer",getcustomer})
})


//Listing all Room along with Booking status

router.route("/roomlist").get(async(request,response)=>{
    const client =await createConnection();
    const rooms = await getRoomList(client,{});
    response.send({message:"List of Rooms", rooms});
    
  });

export const roomRouter = router;
