import { ArrowUpRight, BedDouble, Maximize, UsersRound } from "lucide-react";
import { useHotel } from "../lib/context";
import { formatMoney } from "../lib/booking";
import type { Room } from "../lib/types";
import { Image } from "./ui";
export default function RoomCard({
  room,
  index = 0,
}: {
  room: Room;
  index?: number;
}) {
  const { currency, showRoom, book } = useHotel();
  return (
    <article className="room-card">
      <button
        className="room-image"
        onClick={() => showRoom(room)}
        aria-label={"Explore " + room.name}
      >
        <Image src={room.image} alt={room.name + " interior impression"} />
        <span className="room-number">
          0{index + 1} / {room.collection.toUpperCase()}
        </span>
        <span className="room-explore">
          Discover your space <ArrowUpRight size={18} />
        </span>
      </button>
      <div className="room-card-body">
        <span className="room-view">{room.view}</span>
        <button className="room-title" onClick={() => showRoom(room)}>
          <h3>{room.name}</h3>
          <ArrowUpRight size={21} />
        </button>
        <div className="room-facts">
          <span>
            <Maximize size={13} />
            {room.size} m²
          </span>
          <span>
            <UsersRound size={13} />
            Up to {room.capacity}
          </span>
          <span>
            <BedDouble size={14} />
            {room.bed}
          </span>
        </div>
        <div className="room-bottom">
          <span>
            From <b>{formatMoney(room.rate, currency)}</b>{" "}
            <small>/ night</small>
          </span>
          <button onClick={() => book(room)}>
            Reserve <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
