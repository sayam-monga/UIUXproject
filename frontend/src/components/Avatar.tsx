
interface AvatarProps{
    size:string;
    username:string;
}
const Avatar = ({size, username}:AvatarProps) => {
  const initial = username? username[0]:""
  return (
    <div className={`bg-black cursor-pointer text-white rounded-full ${size == "small"? "w-[30px] h-[30px]":"w-[50px] h-[50px] text-xl" } flex justify-center items-center flex-shrink-0`}>{initial.toUpperCase()}</div>
  )
}

export default Avatar