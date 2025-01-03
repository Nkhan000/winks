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
        updated_at: new Date(),
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

export const getAllRoomData = async (userId) => {
  const { data, error } = supabase
    .from("rooms")
    .eq("user_id", userId)
    .select("*");

  if (error) throw new Error(error);
  return data;
};

export const roomData = async (roomId) => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId);

  if (error) throw new Error(error.message);

  const { data: userData, error: userError } = await supabase
    .from("room_members")
    .select("user_name")
    .eq("room_id", roomId);

  const updatedData = data[0];
  updatedData.users = userData.map((data) => data.user_name);

  return updatedData;
};

export const joinRoom = async (userId, roomId, userName) => {
  // Fetch room data
  const room = await roomData(roomId);
  if (!room || room.length === 0) {
    throw new Error("Room not found");
  }

  const limit = room.user_limit;
  const count = room.count;

  if (count + 1 > limit) {
    throw new Error("Maximum number of users has joined the room");
  }

  // stop users to join again after joine once
  const { data: roomMemberData, error: roomMemberError } = await supabase
    .from("room_members")
    .select("*")
    .eq("room_id", roomId)
    .select("user_id");

  if (roomMemberError) throw new Error(roomMemberError.message);

  const membersId = roomMemberData.map((item) => item.user_id);
  if (membersId.includes(userId)) {
    throw new Error("User has already joined the room");
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

export const sendMessage = async (roomId, sender, userName, message) => {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ room_id: roomId, sender, user_name: userName, message }])
    .select("*");
  if (error) {
    throw new Error(error.message);
  }

  await supabase
    .from("rooms")
    .update({ updated_at: new Date() })
    .eq("id", roomId);

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
  // console.log(joinedDate);

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
        table: "room_members",
        filter: `id=eq.${roomId}`,
      },
      (payload) => handleMessages(payload.new)
    )
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "rooms",
        filter: `id=eq.${roomId}`,
      },
      (payload) => handleMessages(payload.new)
    )
    .subscribe();

  return channel;
};

export const subscribeToUpdates = async (handleFn, handleFnDelete) => {
  const channel = supabase
    .channel("room_updates")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "rooms",
      },
      (payload) => handleFn(payload.new)
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "rooms",
      },
      (payload) => handleFn(payload.new)
    )
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "rooms",
      },
      (payload) => handleFnDelete(payload.old)
    )
    .subscribe();

  return channel;
};
