import React from "react";

const ListUserItem = ({ name }: { name: string }) => {
  return (
    <li className=" text-blue-300 bg-yellow-300 rounded-lg text-center m-1 p-1">
      {name}
    </li>
  );
};

export default ListUserItem;
