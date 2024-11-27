import { supabase } from "../Client/supabaseClient";

export const createRoom = async (ownerId, roomName, userLimit, userName) => {
  const { data, error } = await supabase
    .from("rooms")
    .insert([
      {
        owner: ownerId,
        name: roomName,
        user_limit: userLimit,
        count: 1,
        deleted: false,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  await supabase.from("room_members").insert([
    {
      room_id: data[0].id,
      user_id: ownerId,
      user_name: userName,
      is_admin: true,
    },
  ]);

  return data;
};

export const roomData = async (roomId) => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId);

  if (error) throw new Error(error.message);

  return data;
};

export const joinRoom = async (userId, roomId, userName) => {
  // Fetch room data
  const room = await roomData(roomId);
  if (!room || room.length === 0) {
    throw new Error("Room not found");
  }

  const limit = room[0].user_limit;
  const count = room[0].count;

  if (count + 1 > limit) {
    throw new Error("Maximum number of users has joined the room");
  }

  const { error: insertError } = await supabase
    .from("room_members")
    .insert([{ room_id: roomId, user_id: userId, user_name: userName }]);
  if (insertError) throw new Error(insertError.message);

  const { error: updateError } = await supabase
    .from("rooms")
    .update({ count: count + 1 })
    .eq("id", roomId);
  if (updateError) throw new Error(updateError.message);

  const { data: updatedRoom, error: fetchError } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .single();

  if (fetchError) throw new Error(fetchError.message);

  console.log("User added successfully, updated room:", updatedRoom);
  return updatedRoom;
};

export const deleteRoom = async (userId, roomId) => {
  const { data, error } = await supabase
    .from("rooms")
    .update({ deleted: true })
    .eq("id", roomId)
    .eq("owner", userId);

  if (error) throw new Error(error.message);

  return data;
};

export const renameRoom = async (userId, roomId, newName) => {
  const { data, error } = await supabase
    .from("rooms")
    .update({ name: newName })
    .eq("id", roomId)
    .eq("owner", userId);

  if (error) throw new Error(error.message);
  return data;
};

// Messaging Functions

export const sendMessage = async (roomId, sender, message) => {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ room_id: roomId, sender, message }])
    .select("*");
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  // console.log(data);
  return data;
};

// Getting all the messages from the room

export const getAllMessages = async (roomId, userId) => {
  const { data: userData, error: userError } = await supabase
    .from("room_members")
    .select("*")
    .eq("user_id", userId);

  if (userError) throw new Error(userError.message);

  // console.log(userData[0]);
  const joinedDate = userData[0].created_at;

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("room_id", roomId)
    .gt("created_at", joinedDate);

  if (error) throw new Error(error.message);

  return data;
};

// realtime subscription

export const subscribeToMessage = async (roomId, handleMessages) => {
  const channel = supabase
    .channel(`messages:room_id=eq:${roomId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `room_id=eq.${roomId}`,
      },
      (payload) => handleMessages(payload.new)
    )
    .subscribe();

  return channel;
};

export const subscribeToJoin = async (roomId, handleMessages) => {
  const channel = supabase
    .channel(`room:${roomId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "rooms",
        filter: `id=eq.${roomId}`,
      },
      (payload) => handleMessages(payload.new.count)
    )
    .subscribe();

  return channel;
};
