export async function insertRoom(client, room) {
    room.bookedStatus=false
    const result=await client.db("HallBooking")
    .collection("rooms")
    .insertOne(room);
    return result;
}

export async function getRooms(client,filter){
    const result =await client.db("HallBooking")
    .collection("rooms")
    .find(filter)
    .toArray();
    return result;
}

export async function bookroom(client, room) {

    const result=await client.db("HallBooking")
    .collection("roombooked")
    .insertOne(room);
    return result;
}
export async function updateRoom_bookstatus(client,roomNo){
    const data={bookedStatus: true}
    const result =await client.db("HallBooking")
    .collection("rooms")
    .updateOne({ roomNo: roomNo },{$set: data});
}

export async function getCustomerList(client){
    const getcustomers=await client.db("HallBooking")
    .collection("roombooked")
    .find({})
    .toArray();
    return getcustomers
}


export async function getRoomList (client,filter){
    const result = await client.db("HallBooking").collection("roombooked").find(filter).toArray();

    return result;
}